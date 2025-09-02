"use client";

import { MarketCard } from "./MarketCard";
import { useState } from "react";

const mockMarkets = [
  {
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: "$67,234",
    change: "+$1,523",
    changePercent: "+2.31%",
    volume: "$12.4B",
    trend: "positive" as const
  },
  {
    symbol: "ETH/USD", 
    name: "Ethereum",
    price: "$3,456",
    change: "+$61",
    changePercent: "+1.79%",
    volume: "$8.2B",
    trend: "positive" as const
  },
  {
    symbol: "SOL/USD",
    name: "Solana", 
    price: "$198",
    change: "+$8.12",
    changePercent: "+4.27%",
    volume: "$2.1B",
    trend: "positive" as const
  },
  {
    symbol: "AVAX/USD",
    name: "Avalanche",
    price: "$42.18",
    change: "-$0.21",
    changePercent: "-0.49%", 
    volume: "$456M",
    trend: "negative" as const
  }
];

export function MarketOverview() {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Market Overview</h2>
        <div className="flex items-center space-x-2 text-sm text-muted">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
          <span>Live data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockMarkets.map((market) => (
          <MarketCard
            key={market.symbol}
            market={market}
            onClick={() => setSelectedMarket(
              selectedMarket === market.symbol ? null : market.symbol
            )}
          />
        ))}
      </div>

      {selectedMarket && (
        <div className="card bg-accent/5 border-accent/20 animate-slide-up">
          <h3 className="font-semibold mb-2">Quick Actions for {selectedMarket}</h3>
          <div className="flex flex-wrap gap-2">
            <button className="btn-primary small">
              📈 Buy {selectedMarket.split('/')[0]}
            </button>
            <button className="btn-secondary small">
              📊 Deep Analysis
            </button>
            <button className="btn-secondary small">
              🔔 Set Alert
            </button>
            <button className="btn-secondary small">
              📋 Add to Watchlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
