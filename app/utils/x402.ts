import axios from 'axios';
import { type WalletClient } from 'wagmi';
import { type Hash } from 'viem';

// X402 payment flow utility
export interface X402PaymentOptions {
  amount: string;
  recipient: string;
  tokenAddress: string; // USDC contract address
  chainId: number;
  metadata?: Record<string, any>;
}

export interface X402PaymentResult {
  success: boolean;
  transactionHash?: Hash;
  error?: string;
}

// USDC contract address on Base
export const USDC_BASE_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

/**
 * Process a payment using the x402 protocol
 * This function handles the payment flow using wagmi's useWalletClient and x402-axios
 */
export async function processX402Payment(
  walletClient: WalletClient,
  options: X402PaymentOptions
): Promise<X402PaymentResult> {
  try {
    // Step 1: Prepare the payment request
    const paymentRequest = {
      amount: options.amount,
      recipient: options.recipient,
      tokenAddress: options.tokenAddress,
      chainId: options.chainId,
      metadata: options.metadata || {},
    };

    // Step 2: Get the transaction data from the x402 API
    const response = await axios.post('/api/x402/prepare', paymentRequest);
    const { txData } = response.data;

    if (!txData) {
      throw new Error('Failed to prepare transaction data');
    }

    // Step 3: Sign and send the transaction using the wallet client
    const hash = await walletClient.sendTransaction({
      to: txData.to as `0x${string}`,
      data: txData.data as `0x${string}`,
      value: BigInt(txData.value || '0'),
    });

    // Step 4: Return the result
    return {
      success: true,
      transactionHash: hash,
    };
  } catch (error) {
    console.error('X402 payment error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown payment error',
    };
  }
}

/**
 * Verify a payment transaction
 */
export async function verifyX402Payment(
  transactionHash: Hash,
  chainId: number
): Promise<boolean> {
  try {
    const response = await axios.get(`/api/x402/verify?hash=${transactionHash}&chainId=${chainId}`);
    return response.data.verified;
  } catch (error) {
    console.error('X402 verification error:', error);
    return false;
  }
}

