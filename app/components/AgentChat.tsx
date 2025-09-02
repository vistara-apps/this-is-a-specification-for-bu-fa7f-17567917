"use client";

import { useState, useRef, useEffect } from "react";
import { usePrimaryButton } from "@coinbase/onchainkit/minikit";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AgentChatProps {
  variant?: 'withInput' | 'withUserMessage';
}

export function AgentChat({ variant = 'withInput' }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to Market Maker AI! I can help you discover markets, execute trades, and provide AI-powered insights. What would you like to do today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  usePrimaryButton(
    { text: 'Get Market Insights' },
    () => {
      handleQuickAction('What are the hottest markets today?');
    }
  );

  const handleQuickAction = (query: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(query),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('market') || lowerQuery.includes('hot')) {
      return "📈 Here are today's trending markets:\n\n• **BTC/USD** - $67,234 (+2.3%)\n• **ETH/USD** - $3,456 (+1.8%)\n• **SOL/USD** - $198 (+4.2%)\n• **AVAX/USD** - $42 (-0.5%)\n\nBased on current momentum and volume, SOL is showing strong bullish signals. Would you like me to analyze any specific market or help you execute a trade?";
    }
    
    if (lowerQuery.includes('buy') || lowerQuery.includes('trade')) {
      return "🤖 I can help you execute trades! Please specify:\n\n• **Asset** (e.g., BTC, ETH)\n• **Amount** (e.g., $100, 0.01 BTC)\n• **Order type** (market/limit)\n\nExample: 'Buy 0.01 ETH at market price'\n\nNote: Execution fees start at $1 per trade.";
    }
    
    if (lowerQuery.includes('price') || lowerQuery.includes('analysis')) {
      return "📊 **Current Market Analysis:**\n\n**BTC**: Strong support at $65k, resistance at $70k. Probability of upward movement: 68%\n\n**ETH**: Consolidating above $3.4k. Expected range: $3.2k - $3.6k\n\n**Risk Assessment**: Medium volatility expected over next 24h. Consider position sizing accordingly.";
    }
    
    return "I understand you're looking for trading assistance. I can help with:\n\n• 📈 Market analysis and insights\n• 🔍 Finding trending opportunities  \n• ⚡ Executing trades\n• 📊 Risk assessment\n\nWhat specific action would you like to take?";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="card flex flex-col h-[500px]">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold">AI Trading Assistant</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className="text-sm text-muted">Online</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${message.role} animate-slide-up`}
          >
            <div className="text-sm mb-1">
              {message.role === 'assistant' ? '🤖 AI' : '👤 You'}
            </div>
            <div className="whitespace-pre-line">{message.content}</div>
            <div className="text-xs opacity-70 mt-2">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="chat-message assistant animate-slide-up">
            <div className="text-sm mb-1">🤖 AI</div>
            <div className="typing-indicator">
              <div className="typing-dot" style={{ animationDelay: '0s' }}></div>
              <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
              <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {variant === 'withInput' && (
        <>
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => handleQuickAction('What are the hottest markets today?')}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              disabled={isLoading}
            >
              📈 Hot Markets
            </button>
            <button
              onClick={() => handleQuickAction('Analyze BTC price action')}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              disabled={isLoading}
            >
              📊 BTC Analysis
            </button>
            <button
              onClick={() => handleQuickAction('Help me execute a trade')}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              disabled={isLoading}
            >
              ⚡ Execute Trade
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about markets, request analysis, or execute trades..."
              className="input-field flex-1"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </>
      )}
    </div>
  );
}
