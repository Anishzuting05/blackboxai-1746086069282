import { Connection, Keypair, Transaction, SystemProgram } from '@solana/web3.js';
import { SOLANA_RPC_URL } from './constants';

// Initialize Solana connection
export const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

// Generate Solana wallet
export function generateSolanaWallet() {
  return Keypair.generate();
}

// Transfer SOL from one wallet to another
export async function transferSol(fromKeypair, toPublicKey, lamports) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: toPublicKey,
      lamports,
    })
  );

  const signature = await connection.sendTransaction(transaction, [fromKeypair]);
  await connection.confirmTransaction(signature);
  return signature;
}
