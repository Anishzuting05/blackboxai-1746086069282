import { ethers } from 'ethers';
import { Keypair } from '@solana/web3.js';

// Generate multiple Ethereum wallets
export function generateEthereumWallets(count) {
  const wallets = [];
  for (let i = 0; i < count; i++) {
    const wallet = ethers.Wallet.createRandom();
    wallets.push(wallet);
  }
  return wallets;
}

// Generate multiple Solana wallets
export function generateSolanaWallets(count) {
  const wallets = [];
  for (let i = 0; i < count; i++) {
    const keypair = Keypair.generate();
    wallets.push(keypair);
  }
  return wallets;
}

// Example function to divide funds from main wallet to generated wallets (Ethereum)
export async function divideFundsEthereum(mainWallet, wallets, provider, amountPerWallet) {
  for (const wallet of wallets) {
    const tx = {
      to: wallet.address,
      value: ethers.utils.parseEther(amountPerWallet.toString()),
      gasLimit: 21000,
    };
    const signedTx = await mainWallet.sendTransaction(tx);
    await signedTx.wait();
  }
}

// Example function to divide funds from main wallet to generated wallets (Solana)
export async function divideFundsSolana(mainKeypair, wallets, connection, lamportsPerWallet) {
  const transaction = new Transaction();
  for (const wallet of wallets) {
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: mainKeypair.publicKey,
        toPubkey: wallet.publicKey,
        lamports: lamportsPerWallet,
      })
    );
  }
  const signature = await connection.sendTransaction(transaction, [mainKeypair]);
  await connection.confirmTransaction(signature);
}
