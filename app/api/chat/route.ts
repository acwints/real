import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt with context about the financial model
const systemPrompt = `You are a helpful financial analyst assistant for the Ashby BART Station mixed-use development project in Berkeley, California. 

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

Key Financial Metrics:
- Market 1BR: 42 units at $2,750/month
- Market 2BR: 21 units at $3,500/month  
- Market 3BR: 9 units at $5,000/month
- Affordable 1BR: 42 units at $900/month
- Affordable 2BR: 21 units at $1,100/month
- Affordable 3BR: 9 units at $1,500/month
- Retail: 58,000 SF at $20/SF/year (with 10% vacancy)
- Office: 76,000 SF at $20/SF/year (with 12% vacancy)
- Operating Expense Ratio: 35%
- Ground Lease: $50k/year during development, $1.05M/year post-completion
- Rent Growth: 2% annually

Answer questions about the financial model accurately and helpfully. If asked about specific numbers, refer to the model structure and provide context. If you don't have exact numbers, explain what information would be needed or where to find it in the model.`;

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
      max_tokens: 1000,
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

