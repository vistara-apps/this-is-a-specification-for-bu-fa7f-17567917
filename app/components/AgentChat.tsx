"use client";

import { useState, useRef, useEffect } from "react";
import { usePrimaryButton } from "@coinbase/onchainkit/minikit";
import { useAccount } from "wagmi";
import { PaymentButton } from "./PaymentButton";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  requiresPayment?: boolean;
  paymentAmount?: string;
  paymentService?: string;
  paymentCompleted?: boolean;
}

interface AgentChatProps {
  variant?: 'withInput' | 'withUserMessage';
}

// Market Maker AI recipient address
const RECIPIENT_ADDRESS = "0xfa7f7c720771041edb0f6176aac3804c1";

export function AgentChat({ variant = 'withInput' }: AgentChatProps) {
  const { isConnected } = useAccount();
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
      const aiResponse = generateAIResponse(query);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): Message => {
    const lowerQuery = query.toLowerCase();
    const now = new Date();
    const messageId = (Date.now() + 1).toString();
    
    if (lowerQuery.includes('market') || lowerQuery.includes('hot')) {
      return {
        id: messageId,
        role: 'assistant',
        content: "📈 Here are today's trending markets:\n\n• **BTC/USD** - $67,234 (+2.3%)\n• **ETH/USD** - $3,456 (+1.8%)\n• **SOL/USD** - $198 (+4.2%)\n• **AVAX/USD** - $42 (-0.5%)\n\nBased on current momentum and volume, SOL is showing strong bullish signals. Would you like me to analyze any specific market or help you execute a trade?",
        timestamp: now
      };
    }
    
    if (lowerQuery.includes('buy') || lowerQuery.includes('trade') || lowerQuery.includes('execute')) {
      return {
        id: messageId,
        role: 'assistant',
        content: "🤖 I can help you execute trades! This service costs $1 in USDC on Base.\n\nPlease specify:\n• **Asset** (e.g., BTC, ETH)\n• **Amount** (e.g., $100, 0.01 BTC)\n• **Order type** (market/limit)\n\nExample: 'Buy 0.01 ETH at market price'\n\nClick the payment button below to proceed:",
        timestamp: now,
        requiresPayment: true,
        paymentAmount: "1",
        paymentService: "Trade Execution"
      };
    }
    
    if (lowerQuery.includes('price') || lowerQuery.includes('analysis')) {
      return {
        id: messageId,
        role: 'assistant',
        content: "📊 For detailed market analysis, I'll need to process large amounts of data. This service costs $1 in USDC on Base.\n\nClick the payment button below to proceed with the analysis:",
        timestamp: now,
        requiresPayment: true,
        paymentAmount: "1",
        paymentService: "Market Analysis"
      };
    }
    
    return {
      id: messageId,
      role: 'assistant',
      content: "I understand you're looking for trading assistance. I can help with:\n\n• 📈 Market analysis and insights ($1)\n• 🔍 Finding trending opportunities (Free)  \n• ⚡ Executing trades ($1)\n• 📊 Risk assessment ($1)\n\nWhat specific action would you like to take?",
      timestamp: now
    };
  };

  const handlePaymentSuccess = (messageId: string, txHash: string) => {
    // Update the message to show payment completed
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              paymentCompleted: true,
              content: msg.content + `\n\n✅ Payment successful! Transaction: ${txHash.slice(0, 6)}...${txHash.slice(-4)}`
            } 
          : msg
      )
    );

    // Add a follow-up message based on the service
    const paymentMessage = messages.find(msg => msg.id === messageId);
    if (paymentMessage?.paymentService) {
      setTimeout(() => {
        let responseContent = "";
        
        if (paymentMessage.paymentService === "Trade Execution") {
          responseContent = "Thank you for your payment! I'm now ready to execute your trade. Please provide the specific details of the trade you'd like to make, including:\n\n• Asset pair (e.g., BTC/USD)\n• Direction (buy/sell)\n• Amount\n• Price (for limit orders)\n\nI'll prepare the transaction for your approval once you provide these details.";
        } else if (paymentMessage.paymentService === "Market Analysis") {
          responseContent = "📊 **Detailed Market Analysis:**\n\n**BTC**: Strong support at $65k, resistance at $70k. Probability of upward movement: 68%\n\nTechnical indicators:\n• MACD: Bullish crossover\n• RSI: 58 (neutral with bullish bias)\n• Volume profile: Accumulation pattern\n\n**ETH**: Consolidating above $3.4k. Expected range: $3.2k - $3.6k\n• Key support: $3,280\n• Key resistance: $3,650\n• Correlation with BTC: 0.82\n\n**SOL**: Showing strongest momentum\n• Breaking out of bull flag pattern\n• Target: $225-240 range\n• Stop loss recommendation: $185\n\n**Risk Assessment**: Medium volatility expected over next 24h. Position sizing recommendation: 2-3% of portfolio per trade.";
        }
        
        if (responseContent) {
          const followUpMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: responseContent,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, followUpMessage]);
        }
      }, 1000);
    }
  };

  const handlePaymentError = (messageId: string, error: string) => {
    // Update the message to show payment error
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              content: msg.content + `\n\n❌ Payment failed: ${error}. Please try again.`
            } 
          : msg
      )
    );
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
      const aiResponse = generateAIResponse(input);
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
            
            {message.requiresPayment && !message.paymentCompleted && isConnected && (
              <div className="mt-3">
                <PaymentButton
                  amount={message.paymentAmount || "1"}
                  recipient={RECIPIENT_ADDRESS}
                  serviceName={message.paymentService || "AI Service"}
                  onSuccess={(txHash) => handlePaymentSuccess(message.id, txHash)}
                  onError={(error) => handlePaymentError(message.id, error)}
                >
                  Pay {message.paymentAmount} USDC
                </PaymentButton>
              </div>
            )}
            
            {message.requiresPayment && !message.paymentCompleted && !isConnected && (
              <div className="mt-3 text-sm text-warning">
                Please connect your wallet to make a payment.
              </div>
            )}
            
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
