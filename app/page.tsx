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
      <div className="space-y-8">
        {/* Navigation Tabs */}
        <nav aria-label="Main Navigation" className="sticky top-0 z-10 bg-bg pt-2">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg shadow-sm">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-md transition-all ${
                activeView === 'dashboard'
                  ? 'bg-white text-text shadow-sm'
                  : 'text-muted hover:text-text'
              }`}
              aria-pressed={activeView === 'dashboard'}
              aria-label="Dashboard View"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 5C4 4.44772 4.44772 4 5 4H9C9.55228 4 10 4.44772 10 5V9C10 9.55228 9.55228 10 9 10H5C4.44772 10 4 9.55228 4 9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 5C14 4.44772 14.4477 4 15 4H19C19.5523 4 20 4.44772 20 5V9C20 9.55228 19.5523 10 19 10H15C14.4477 10 14 9.55228 14 9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 15C4 14.4477 4.44772 14 5 14H9C9.55228 14 10 14.4477 10 15V19C10 19.5523 9.55228 20 9 20H5C4.44772 20 4 19.5523 4 19V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 15C14 14.4477 14.4477 14 15 14H19C19.5523 14 20 14.4477 20 15V19C20 19.5523 19.5523 20 19 20H15C14.4477 20 14 19.5523 14 19V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Dashboard</span>
              </div>
            </button>
            <button
              onClick={() => setActiveView('chat')}
              className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-md transition-all ${
                activeView === 'chat'
                  ? 'bg-white text-text shadow-sm'
                  : 'text-muted hover:text-text'
              }`}
              aria-pressed={activeView === 'chat'}
              aria-label="AI Assistant View"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3V4M12 20V21M21 12H20M4 12H3M18.364 18.364L17.657 17.657M6.343 6.343L5.636 5.636M18.364 5.636L17.657 6.343M6.343 17.657L5.636 18.364M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>AI Assistant</span>
              </div>
            </button>
          </div>
        </nav>

        {/* Main Content */}
        {activeView === 'dashboard' && (
          <main className="space-y-8">
            {/* Hero Section */}
            <section className="card bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20 shadow-lg" aria-labelledby="welcome-heading">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex-1">
                  <h1 id="welcome-heading" className="text-3xl font-bold text-text mb-3">
                    Welcome to Market Maker AI
                  </h1>
                  <p className="text-lg text-muted mb-6 max-w-xl">
                    Your AI co-pilot for intelligent trading and market insights. Get real-time analysis and execute trades with confidence.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <PrimaryButton
                      variant="large"
                      icon={
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 10V3L4 14H7V21L16 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      }
                      onClick={() => setActiveView('chat')}
                    >
                      Start Trading
                    </PrimaryButton>
                    <PrimaryButton
                      variant="large"
                      color="secondary"
                      icon={
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 6.25278V19.2528M12 6.25278L6.25 10.0028M12 6.25278L17.75 10.0028M3.5 7.25C3.5 5.17893 5.17893 3.5 7.25 3.5H16.75C18.8211 3.5 20.5 5.17893 20.5 7.25V16.75C20.5 18.8211 18.8211 20.5 16.75 20.5H7.25C5.17893 20.5 3.5 18.8211 3.5 16.75V7.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      }
                    >
                      Learn More
                    </PrimaryButton>
                  </div>
                </div>
                <div className="hidden sm:block flex-shrink-0">
                  <div className="w-32 h-32 bg-accent/10 rounded-2xl flex items-center justify-center shadow-inner">
                    <svg className="w-16 h-16 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 19V13C9 11.8954 8.10457 11 7 11H5C3.89543 11 3 11.8954 3 13V19C3 20.1046 3.89543 21 5 21H7C8.10457 21 9 20.1046 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 13V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 7V19C15 20.1046 15.8954 21 17 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H17C15.8954 5 15 5.89543 15 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </section>

            {/* Market Overview */}
            <MarketOverview />

            {/* Features Grid */}
            <section className="space-y-4" aria-labelledby="features-heading">
              <h2 id="features-heading" className="text-2xl font-bold text-text mb-1">Key Features</h2>
              <p className="text-sm text-muted mb-4">Powerful tools to enhance your trading experience</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="card hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6 text-success" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg">AI-Powered Execution</h3>
                  </div>
                  <p className="text-muted mb-4">
                    Automated trading with LLM-driven analysis and risk assessment. Our AI models analyze market conditions in real-time to execute trades with precision.
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-sm font-medium text-success">
                      Starting at $1 per trade
                    </div>
                    <PrimaryButton variant="small" color="secondary" iconPosition="right" icon={
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }>
                      Learn More
                    </PrimaryButton>
                  </div>
                </div>

                <div className="card hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6 text-warning" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 21H14M8.5 3.5C6.5 5.5 6.5 9 8.5 11C10.5 9 10.5 5.5 8.5 3.5ZM15.5 3.5C13.5 5.5 13.5 9 15.5 11C17.5 9 17.5 5.5 15.5 3.5ZM3.5 15.5C5.5 13.5 9 13.5 11 15.5C9 17.5 5.5 17.5 3.5 15.5ZM13 15.5C15 13.5 18.5 13.5 20.5 15.5C18.5 17.5 15 17.5 13 15.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg">Market Discovery</h3>
                  </div>
                  <p className="text-muted mb-4">
                    AI identifies promising opportunities with detailed research. Discover emerging trends and potential high-growth assets before they become mainstream.
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-sm font-medium text-warning">
                      $1 per analysis
                    </div>
                    <PrimaryButton variant="small" color="secondary" iconPosition="right" icon={
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }>
                      Learn More
                    </PrimaryButton>
                  </div>
                </div>

                <div className="card hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg">Chat Interface</h3>
                  </div>
                  <p className="text-muted mb-4">
                    Natural language trading - just tell the AI what you want. No need to learn complex trading interfaces or terminology. Simply chat with our AI assistant.
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-sm font-medium text-accent">
                      Intuitive commands
                    </div>
                    <PrimaryButton variant="small" color="secondary" iconPosition="right" icon={
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }>
                      Learn More
                    </PrimaryButton>
                  </div>
                </div>

                <div className="card hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6 text-danger" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M12 3L4 10V20H9V14H15V20H20V10L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg">Risk Analysis</h3>
                  </div>
                  <p className="text-muted mb-4">
                    Probabilistic risk assessment for informed decision making. Our advanced algorithms calculate potential outcomes and help you manage your portfolio risk.
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-sm font-medium text-danger">
                      Real-time insights
                    </div>
                    <PrimaryButton variant="small" color="secondary" iconPosition="right" icon={
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }>
                      Learn More
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </section>
          </main>
        )}

        {activeView === 'chat' && (
          <main>
            <AgentChat variant="withInput" />
          </main>
        )}
      </div>
    </AppShell>
  );
}
