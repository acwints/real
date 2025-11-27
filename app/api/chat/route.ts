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
    // Use CSV export for published spreadsheets - follow redirects
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${gid}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      redirect: 'follow', // Follow redirects
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${sheetName}: ${response.status} ${response.statusText}`);
    }

    const csv = await response.text();
    
    // Check if we got HTML instead of CSV (indicates an error)
    if (csv.trim().startsWith('<')) {
      throw new Error(`Got HTML response instead of CSV for ${sheetName}`);
    }
    
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

    // Debug logging
    console.log('Pro Forma data length:', proformaData.length);
    console.log('Data tab length:', dataTab.length);
    console.log('Pro Forma first 200 chars:', proformaData.substring(0, 200));
    console.log('Data tab first 200 chars:', dataTab.substring(0, 200));

    // Parse CSV to get meaningful rows (skip empty rows)
    const proformaRows = proformaData.split('\n').filter(row => row.trim()).slice(0, 80);
    const dataRows = dataTab.split('\n').filter(row => row.trim()).slice(0, 50);

    console.log('Pro Forma rows:', proformaRows.length);
    console.log('Data tab rows:', dataRows.length);

    // Check if we actually got data or just errors
    const hasProformaData = !proformaData.includes('Error fetching') && proformaRows.length > 5;
    const hasDataTab = !dataTab.includes('Error fetching') && dataRows.length > 5;

    console.log('Has Pro Forma data:', hasProformaData);
    console.log('Has Data tab:', hasDataTab);

    if (!hasProformaData && !hasDataTab) {
      console.error('Failed to fetch spreadsheet data');
      return 'CRITICAL: Unable to fetch spreadsheet data. Please check the spreadsheet is published and accessible.';
    }

    return `CRITICAL INSTRUCTION: You MUST use the ACTUAL DATA below from the spreadsheet. Do NOT give generic answers. Reference specific numbers, cells, and values from the data.

CURRENT SPREADSHEET DATA FROM ASHBY BART FINANCIAL MODEL:

${hasProformaData ? `PRO FORMA TAB (first 80 rows):
${proformaRows.join('\n')}

` : ''}${hasDataTab ? `DATA TAB (first 50 rows):
${dataRows.join('\n')}

` : ''}IMPORTANT: 
- When asked about NPV, NOI, debt service, revenue, expenses, or any financial metric, you MUST use the exact values from the Pro Forma tab above
- Reference specific row numbers and values (e.g., "Row 78 shows NPV of -$26,400,882")
- Do NOT say "typically" or "would include" - use the ACTUAL numbers from the spreadsheet
- If the data shows a specific value, use that value, not a generic description`;
  } catch (error) {
    console.error('Error fetching spreadsheet context:', error);
    return 'Unable to fetch spreadsheet data. Please refer to the embedded spreadsheet for current values.';
  }
}

// Base system prompt
const baseSystemPrompt = `You are a financial analyst assistant for the Ashby BART Station mixed-use development project. 

CRITICAL: You have access to the ACTUAL spreadsheet data below. You MUST use the exact numbers from the spreadsheet, not generic descriptions. When asked about any financial metric, quote the specific value from the Pro Forma tab.

Project Details:
- 144 housing units (50% market rate, 50% affordable)
- 58,000 SF retail, 76,000 SF office
- Located at Ashby BART Station, Berkeley

The spreadsheet data is provided below. Use it to answer all questions with specific numbers and values.`;

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
    console.log('Spreadsheet context length:', spreadsheetContext.length);
    console.log('Spreadsheet context preview:', spreadsheetContext.substring(0, 500));
    
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

