import { NextResponse } from 'next/server';

// Mock market data - in production, this would fetch from real APIs
const mockMarketData = [
  {
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: 67234.56,
    change: 1523.12,
    changePercent: 2.31,
    volume: 12400000000,
    high24h: 68500,
    low24h: 65200,
    trend: "positive"
  },
  {
    symbol: "ETH/USD", 
    name: "Ethereum",
    price: 3456.78,
    change: 61.23,
    changePercent: 1.79,
    volume: 8200000000,
    high24h: 3520,
    low24h: 3380,
    trend: "positive"
  },
  {
    symbol: "SOL/USD",
    name: "Solana",
    price: 198.45,
    change: 8.12,
    changePercent: 4.27,
    volume: 2100000000,
    high24h: 205,
    low24h: 186,
    trend: "positive"
  },
  {
    symbol: "AVAX/USD",
    name: "Avalanche",
    price: 42.18,
    change: -0.21,
    changePercent: -0.49,
    volume: 456000000,
    high24h: 43.5,
    low24h: 41.8,
    trend: "negative"
  }
];

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return NextResponse.json({
      success: true,
      data: mockMarketData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Markets API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}
