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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <section className="space-y-6" aria-labelledby="market-overview-heading">
      <div className="flex items-center justify-between">
        <div>
          <h2 
            id="market-overview-heading" 
            className="text-2xl font-bold text-text mb-1"
          >
            Market Overview
          </h2>
          <p className="text-sm text-muted">Top performing assets in the last 24 hours</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
            <span className="font-medium text-success">Live data</span>
          </div>
          
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-muted hover:text-text'}`}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5C3 3.89543 3.89543 3 5 3H9C10.1046 3 11 3.89543 11 5V9C11 10.1046 10.1046 11 9 11H5C3.89543 11 3 10.1046 3 9V5Z" stroke="currentColor" strokeWidth="2" />
                <path d="M13 5C13 3.89543 13.8954 3 15 3H19C20.1046 3 21 3.89543 21 5V9C21 10.1046 20.1046 11 19 11H15C13.8954 11 13 10.1046 13 9V5Z" stroke="currentColor" strokeWidth="2" />
                <path d="M3 15C3 13.8954 3.89543 13 5 13H9C10.1046 13 11 13.8954 11 15V19C11 20.1046 10.1046 21 9 21H5C3.89543 21 3 20.1046 3 19V15Z" stroke="currentColor" strokeWidth="2" />
                <path d="M13 15C13 13.8954 13.8954 13 15 13H19C20.1046 13 21 13.8954 21 15V19C21 20.1046 20.1046 21 19 21H15C13.8954 21 13 20.1046 13 19V15Z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-muted hover:text-text'}`}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-3'}`}>
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
          <h3 className="font-semibold text-lg mb-3">Quick Actions for {selectedMarket}</h3>
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary px-4 py-2 flex items-center space-x-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Buy {selectedMarket.split('/')[0]}</span>
            </button>
            <button className="btn-secondary px-4 py-2 flex items-center space-x-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19L3 13M3 13L9 7M3 13H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Sell {selectedMarket.split('/')[0]}</span>
            </button>
            <button className="btn-secondary px-4 py-2 flex items-center space-x-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Deep Analysis</span>
            </button>
            <button className="btn-secondary px-4 py-2 flex items-center space-x-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Set Alert</span>
            </button>
            <button className="btn-secondary px-4 py-2 flex items-center space-x-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Add to Watchlist</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
