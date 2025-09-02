"use client";

import { AppShell } from "./components/AppShell";
import { AgentChat } from "./components/AgentChat";
import { MarketOverview } from "./components/MarketOverview";
import { PrimaryButton } from "./components/PrimaryButton";
import { useState } from "react";

export default function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'chat'>('dashboard');

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
              activeView === 'dashboard'
                ? 'bg-white text-text shadow-sm'
                : 'text-muted hover:text-text'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveView('chat')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
              activeView === 'chat'
                ? 'bg-white text-text shadow-sm'
                : 'text-muted hover:text-text'
            }`}
          >
            🤖 AI Assistant
          </button>
        </div>

        {/* Main Content */}
        {activeView === 'dashboard' && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="card bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-text mb-2">
                    Welcome to Market Maker AI
                  </h1>
                  <p className="text-muted mb-4">
                    Your AI co-pilot for intelligent trading and market insights
                  </p>
                  <div className="flex space-x-3">
                    <PrimaryButton
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      }
                      onClick={() => setActiveView('chat')}
                    >
                      Start Trading
                    </PrimaryButton>
                    <button className="btn-secondary">
                      📚 Learn More
                    </button>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="w-24 h-24 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Overview */}
            <MarketOverview />

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <span className="text-success">🤖</span>
                  </div>
                  <h3 className="font-semibold">AI-Powered Execution</h3>
                </div>
                <p className="text-sm text-muted mb-3">
                  Automated trading with LLM-driven analysis and risk assessment
                </p>
                <div className="text-xs text-muted">
                  ⚡ Starting at $1 per trade
                </div>
              </div>

              <div className="card">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                    <span className="text-warning">🔍</span>
                  </div>
                  <h3 className="font-semibold">Market Discovery</h3>
                </div>
                <p className="text-sm text-muted mb-3">
                  AI identifies promising opportunities with detailed research
                </p>
                <div className="text-xs text-muted">
                  📊 $1 per analysis
                </div>
              </div>

              <div className="card">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span className="text-accent">💬</span>
                  </div>
                  <h3 className="font-semibold">Chat Interface</h3>
                </div>
                <p className="text-sm text-muted mb-3">
                  Natural language trading - just tell the AI what you want
                </p>
                <div className="text-xs text-muted">
                  🎯 Intuitive commands
                </div>
              </div>

              <div className="card">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-danger/10 rounded-lg flex items-center justify-center">
                    <span className="text-danger">⚖️</span>
                  </div>
                  <h3 className="font-semibold">Risk Analysis</h3>
                </div>
                <p className="text-sm text-muted mb-3">
                  Probabilistic risk assessment for informed decision making
                </p>
                <div className="text-xs text-muted">
                  📈 Real-time insights
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'chat' && (
          <AgentChat variant="withInput" />
        )}
      </div>
    </AppShell>
  );
}
