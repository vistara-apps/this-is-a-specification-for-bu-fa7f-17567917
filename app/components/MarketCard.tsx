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

  const trendBgColor = {
    positive: 'bg-success/10',
    negative: 'bg-danger/10',
    neutral: 'bg-muted/10'
  }[market.trend];

  const trendBorderColor = {
    positive: 'border-success/30',
    negative: 'border-danger/30',
    neutral: 'border-muted/30'
  }[market.trend];

  const trendIcon = {
    positive: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 9L13 4M18 9V4M18 9H13M6 20L11 15M6 20V15M6 20H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    negative: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 4L11 9M6 4V9M6 4H11M18 20L13 15M18 20V15M18 20H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    neutral: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12H18M6 12L10 8M6 12L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }[market.trend];

  return (
    <div 
      className={`market-card ${market.trend} animate-fade-in hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 ${trendBorderColor}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${market.name} market card, price ${market.price}, change ${market.changePercent}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${trendBgColor} rounded-lg flex items-center justify-center shadow-sm`}>
            <span className={`${trendColor} font-bold text-base`}>
              {market.symbol.split('/')[0]}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-text text-lg">{market.symbol}</h3>
            <p className="text-sm text-muted">{market.name}</p>
          </div>
        </div>
        <div className={`flex items-center justify-center w-10 h-10 ${trendBgColor} rounded-full ${trendColor}`}>
          {trendIcon}
        </div>
      </div>

      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-3xl font-bold text-text mb-2">
            {market.price}
          </div>
          <div className={`text-sm font-medium ${trendColor} flex items-center space-x-1`}>
            <span>{market.change}</span>
            <span className="px-1.5 py-0.5 rounded-md bg-opacity-20 text-xs font-semibold" style={{backgroundColor: `var(--${market.trend === 'positive' ? 'success' : market.trend === 'negative' ? 'danger' : 'muted'})`}}>
              {market.changePercent}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wider text-muted font-medium">Volume</div>
          <div className="text-base font-medium text-text">{market.volume}</div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted font-medium uppercase tracking-wider">24h Range</span>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${market.trend === 'positive' ? 'bg-success' : market.trend === 'negative' ? 'bg-danger' : 'bg-muted'} transition-all duration-300`}
                style={{ width: '68%' }}
              />
            </div>
            <span className={`${trendColor} font-medium`}>68%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
