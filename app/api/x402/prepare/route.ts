import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// X402 API endpoint for preparing transactions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, recipient, tokenAddress, chainId, metadata } = body;

    // Validate required parameters
    if (!amount || !recipient || !tokenAddress || !chainId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Call the x402 API to prepare the transaction
    // Note: In a production environment, you would use the actual x402 API endpoint
    // This is a simplified example
    const x402Response = await axios.post(
      'https://api.x402.xyz/v1/prepare',
      {
        amount,
        recipient,
        tokenAddress,
        chainId,
        metadata: metadata || {},
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.X402_API_KEY}`,
        },
      }
    );

    // Return the transaction data
    return NextResponse.json({
      txData: x402Response.data.txData,
    });
  } catch (error) {
    console.error('Error preparing x402 transaction:', error);
    return NextResponse.json(
      { error: 'Failed to prepare transaction' },
      { status: 500 }
    );
  }
}

