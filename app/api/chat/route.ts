import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SPREADSHEET_ID = '194zQSVqMnUEA9futs2MNPKg2r0g1CLoWdhkDhePOKvI';
const PUBLISHED_SPREADSHEET_ID = '2PACX-1vSdWinzOWg7eHoMBw4QZcykfJzhN3NvWdqKTf77uq916_6JHxu6Vs_zq5Os5VtD9ywdryxEL_n9wZLi';

// Sheet GIDs from the actual Google Sheets tabs
const SHEET_GIDS: Record<string, string> = {
  'proforma': '2100723234',
  'data': '497530682',
  'groundlease': '0',
  'commercialcomp': '1203643977',
  'housingcomp': '1784234613',
};

async function fetchSheetData(sheetName: string): Promise<string> {
  try {
    const gid = SHEET_GIDS[sheetName.toLowerCase()] || '0';
    // Use CSV export for published spreadsheets
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${gid}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${sheetName}: ${response.statusText}`);
    }

    const csv = await response.text();
    return csv;
  } catch (error) {
    console.error(`Error fetching ${sheetName}:`, error);
    return `Error fetching ${sheetName} data: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

async function getSpreadsheetContext(): Promise<string> {
  try {
    // Fetch key tabs - Pro Forma and Data are most important for financial questions
    const [proformaData, dataTab] = await Promise.all([
      fetchSheetData('proforma'),
      fetchSheetData('data'),
    ]);

    // Parse CSV to get meaningful rows (skip empty rows)
    const proformaRows = proformaData.split('\n').filter(row => row.trim()).slice(0, 80);
    const dataRows = dataTab.split('\n').filter(row => row.trim()).slice(0, 50);

    return `Current spreadsheet data from the Ashby BART financial model:

PRO FORMA TAB (rows 1-80):
${proformaRows.join('\n')}

DATA TAB (rows 1-50):
${dataRows.join('\n')}

Use this ACTUAL DATA from the spreadsheet to answer questions. Reference specific numbers, formulas, and calculations from the spreadsheet. If asked about specific metrics (NPV, NOI, debt service, etc.), use the exact values from the Pro Forma tab above.`;
  } catch (error) {
    console.error('Error fetching spreadsheet context:', error);
    return 'Unable to fetch spreadsheet data. Please refer to the embedded spreadsheet for current values.';
  }
}

// Base system prompt
const baseSystemPrompt = `You are a helpful financial analyst assistant for the Ashby BART Station mixed-use development project in Berkeley, California. 

Key Project Details:
- 144 housing units (50% market rate, 50% affordable)
- 58,000 SF of retail space
- 76,000 SF of office space
- 4.4 acres at Ashby BART Station
- R-BMU zoning

Financial Model Structure:
The spreadsheet contains multiple tabs:
1. Pro Forma: 10-year financial projections including revenue, expenses, NOI, debt service, and cash flow
2. Ground Lease: Ground lease terms and calculations
3. Data: Base assumptions including unit mix, rent schedules, vacancy rates, operating expenses
4. Commercial Comp: Comparable commercial/retail properties
5. Housing Comp: Comparable residential properties

Answer questions about the financial model using the ACTUAL DATA from the spreadsheet provided below. Always reference specific numbers from the spreadsheet data when answering.`;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Fetch current spreadsheet data
    const spreadsheetContext = await getSpreadsheetContext();
    const systemPrompt = `${baseSystemPrompt}\n\n${spreadsheetContext}`;

    // Format messages for OpenAI API
    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: formattedMessages as any,
      temperature: 0.7,
      max_tokens: 2000, // Increased to handle spreadsheet data
    });

    const assistantMessage = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

    return NextResponse.json({ message: assistantMessage });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

