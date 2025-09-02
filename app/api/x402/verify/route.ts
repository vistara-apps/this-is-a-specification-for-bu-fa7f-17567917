import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// X402 API endpoint for verifying transactions
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const hash = searchParams.get('hash');
    const chainId = searchParams.get('chainId');

    // Validate required parameters
    if (!hash || !chainId) {
      return NextResponse.json(
        { error: 'Missing transaction hash or chainId' },
        { status: 400 }
      );
    }

    // Call the x402 API to verify the transaction
    // Note: In a production environment, you would use the actual x402 API endpoint
    // This is a simplified example
    const x402Response = await axios.get(
      `https://api.x402.xyz/v1/verify?hash=${hash}&chainId=${chainId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.X402_API_KEY}`,
        },
      }
    );

    // Return the verification result
    return NextResponse.json({
      verified: x402Response.data.verified,
      details: x402Response.data.details,
    });
  } catch (error) {
    console.error('Error verifying x402 transaction:', error);
    return NextResponse.json(
      { error: 'Failed to verify transaction' },
      { status: 500 }
    );
  }
}

