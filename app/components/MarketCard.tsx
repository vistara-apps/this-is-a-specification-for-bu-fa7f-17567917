"use client";

interface MarketData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  trend: 'positive' | 'negative' | 'neutral';
}

interface MarketCardProps {
  market: MarketData;
  variant?: 'default';
  onClick?: () => void;
}

export function MarketCard({ market, variant = 'default', onClick }: MarketCardProps) {
  const trendColor = {
    positive: 'text-success',
    negative: 'text-danger',
    neutral: 'text-muted'
  }[market.trend];

  const trendIcon = {
    positive: '↗',
    negative: '↘',
    neutral: '→'
  }[market.trend];

  return (
    <div 
      className={`market-card ${market.trend} animate-fade-in`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <span className="text-accent font-bold text-sm">
              {market.symbol.slice(0, 2)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-text">{market.symbol}</h3>
            <p className="text-xs text-muted">{market.name}</p>
          </div>
        </div>
        <div className={`text-xl ${trendColor}`}>
          {trendIcon}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-text mb-1">
            {market.price}
          </div>
          <div className={`text-sm font-medium ${trendColor}`}>
            {market.change} ({market.changePercent})
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted">Volume</div>
          <div className="text-sm font-medium text-text">{market.volume}</div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">24h Range</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${market.trend === 'positive' ? 'bg-success' : market.trend === 'negative' ? 'bg-danger' : 'bg-muted'} transition-all duration-300`}
                style={{ width: '68%' }}
              />
            </div>
            <span className="text-muted">68%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
