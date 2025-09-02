"use client";

import { useState } from 'react';
import { useWalletClient } from 'wagmi';
import { base } from 'wagmi/chains';
import { PrimaryButton } from './PrimaryButton';
import { processX402Payment, USDC_BASE_ADDRESS } from '../utils/x402';

interface PaymentButtonProps {
  amount: string;
  recipient: string;
  serviceName: string;
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function PaymentButton({
  amount,
  recipient,
  serviceName,
  onSuccess,
  onError,
  disabled = false,
  children
}: PaymentButtonProps) {
  const { data: walletClient } = useWalletClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!walletClient) {
      onError?.('Wallet not connected');
      return;
    }

    setIsProcessing(true);

    try {
      const result = await processX402Payment(walletClient, {
        amount,
        recipient,
        tokenAddress: USDC_BASE_ADDRESS,
        chainId: base.id,
        metadata: {
          service: serviceName,
          timestamp: new Date().toISOString(),
        },
      });

      if (result.success && result.transactionHash) {
        setTxHash(result.transactionHash);
        onSuccess?.(result.transactionHash);
      } else {
        throw new Error(result.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      onError?.(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <PrimaryButton
        onClick={handlePayment}
        disabled={disabled || isProcessing || !walletClient}
        icon={
          isProcessing ? (
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
      >
        {isProcessing ? 'Processing...' : children}
      </PrimaryButton>
      
      {txHash && (
        <div className="mt-2 text-xs text-success">
          Payment successful! Transaction: {txHash.slice(0, 6)}...{txHash.slice(-4)}
        </div>
      )}
    </div>
  );
}

