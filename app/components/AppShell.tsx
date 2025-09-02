"use client";

import { ReactNode } from "react";
import { 
  useMiniKit, 
  useAddFrame, 
  useOpenUrl 
} from "@coinbase/onchainkit/dist/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useState, useCallback, useMemo } from "react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const result = await addFrame();
    setFrameAdded(Boolean(result));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors p-2 rounded-md hover:bg-accent/5"
          aria-label="Save to Farcaster"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-sm font-medium">Save</span>
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-2 text-success animate-fade-in p-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium">Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <div className="w-full max-w-screen-lg mx-auto px-4 sm:px-6 py-4">
        <header className="flex justify-between items-center mb-6 py-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-text">Market Maker AI</h1>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted">AI Trading Assistant</span>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                  <span className="text-xs text-success font-medium">Live</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-3 mr-2">
              <button 
                className="text-sm text-muted hover:text-text transition-colors px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => openUrl("https://docs.example.com")}
                aria-label="Documentation"
              >
                Docs
              </button>
              <button 
                className="text-sm text-muted hover:text-text transition-colors px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => openUrl("https://support.example.com")}
                aria-label="Support"
              >
                Support
              </button>
            </div>
            
            <Wallet className="z-10">
              <ConnectWallet>
                <div className="flex items-center space-x-2 bg-surface border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors shadow-sm">
                  <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21H5M19 21H21M5 21H3M9 6.5H10M9 9.5H10M9 12.5H10M14 6.5H15M14 9.5H15M14 12.5H15M9 21V17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <Name className="text-sm font-medium" />
                </div>
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
            {saveFrameButton}
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="mt-10 pt-6 pb-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-sm text-muted">© 2025 Market Maker AI</div>
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => openUrl("https://base.org/builders/minikit")}
                className="text-xs text-muted hover:text-text transition-colors flex items-center space-x-2"
              >
                <span>Built on Base with MiniKit</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className="flex items-center space-x-4">
                <button 
                  className="text-muted hover:text-text transition-colors"
                  onClick={() => openUrl("https://twitter.com/example")}
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 4.01C21 4.5 20.02 4.69 19 5C17.879 3.735 16.217 3.665 14.62 4.263C13.023 4.861 11.977 6.323 12 8C8.98 7.82 6.3 6.5 4 4C4 4 -0.182 12.433 8 16C6.154 17.25 4.022 17.875 2 18C10.182 21.567 20 18 20 8C20 7.75 19.909 7.5 19.818 7.25C20.862 6.369 21.595 5.02 22 4.01Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  className="text-muted hover:text-text transition-colors"
                  onClick={() => openUrl("https://discord.com/example")}
                  aria-label="Discord"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11.5C9 12.3284 8.55228 13 8 13C7.44772 13 7 12.3284 7 11.5C7 10.6716 7.44772 10 8 10C8.55228 10 9 10.6716 9 11.5Z" fill="currentColor"/>
                    <path d="M17 11.5C17 12.3284 16.5523 13 16 13C15.4477 13 15 12.3284 15 11.5C15 10.6716 15.4477 10 16 10C16.5523 10 17 10.6716 17 11.5Z" fill="currentColor"/>
                    <path d="M7.5 7.5C10.5 5.5 13.5 5.5 16.5 7.5M8.5 17C11.1667 18.3333 12.8333 18.3333 15.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 17.5L17.5 19.5C17.5 19.5 21 18.5 22 17C22 15.5 21.5 10.5 20 7C18.5 3.5 15.5 3 15.5 3L14.5 5H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.5 17.5L6.5 19.5C6.5 19.5 3 18.5 2 17C2 15.5 2.5 10.5 4 7C5.5 3.5 8.5 3 8.5 3L9.5 5H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  className="text-muted hover:text-text transition-colors"
                  onClick={() => openUrl("https://github.com/example")}
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 19C4.7 20.4 4.7 16.5 3 16M15 21V17.5C15 16.5 15.1 16.1 14.5 15.5C17.3 15.2 20 14.1 20 9.5C19.9988 8.30564 19.5325 7.15578 18.7 6.3C19.0905 5.26128 19.0545 4.11707 18.6 3.1C18.6 3.1 17.5 2.8 15.6 4C13.9039 3.55224 12.0961 3.55224 10.4 4C8.5 2.8 7.4 3.1 7.4 3.1C6.94548 4.11707 6.90947 5.26128 7.3 6.3C6.46745 7.15578 6.00122 8.30564 6 9.5C6 14.1 8.7 15.2 11.5 15.5C10.9 16.1 10.8 16.7 10.8 17.5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
