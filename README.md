# Market Maker AI with x402 Payment Flow

This project implements a Market Maker AI application with integrated x402 payment flow for USDC transactions on Base.

## Features

- AI-powered trading assistant
- x402 payment integration for premium features
- USDC payments on Base network
- Wallet integration using wagmi

## Payment Flow Implementation

The payment flow is implemented using the following components:

1. **x402 Utilities** (`app/utils/x402.ts`):
   - `processX402Payment`: Handles the payment flow using wagmi's useWalletClient
   - `verifyX402Payment`: Verifies transaction status

2. **API Endpoints**:
   - `/api/x402/prepare`: Prepares transaction data for payment
   - `/api/x402/verify`: Verifies transaction status

3. **PaymentButton Component** (`app/components/PaymentButton.tsx`):
   - Reusable component for initiating payments
   - Handles payment success/error states

4. **Integration in AgentChat** (`app/components/AgentChat.tsx`):
   - Identifies premium features requiring payment
   - Presents payment options to users
   - Handles payment flow and unlocks premium content

## Payment Flow Sequence

1. User requests a premium feature (market analysis, trade execution)
2. System identifies the request as a paid feature
3. User is presented with payment option (USDC on Base)
4. User initiates payment via PaymentButton
5. Payment is processed using x402 protocol
6. Transaction is verified on-chain
7. Premium content is unlocked upon successful payment

## Testing

To test the payment flow:
1. Connect your wallet (supports any Base-compatible wallet)
2. Request a premium feature like "Analyze BTC price action" or "Execute a trade"
3. Click the payment button to initiate a 1 USDC payment
4. Approve the transaction in your wallet
5. Wait for transaction confirmation
6. Access the premium feature

## Configuration

The payment flow is configured with the following parameters:
- Token: USDC on Base
- Amount: 1 USDC per premium service
- Recipient: Market Maker AI service address

