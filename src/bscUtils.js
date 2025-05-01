import { ethers } from 'ethers';
import { BSC_RPC_URL } from './constants';

// Initialize BSC provider
export const provider = new ethers.providers.JsonRpcProvider(BSC_RPC_URL);

// Create wallet from private key
export function createWalletFromPrivateKey(privateKey) {
  return new ethers.Wallet(privateKey, provider);
}

// Transfer BNB from one wallet to another
export async function transferBnb(wallet, toAddress, amountInEther) {
  const tx = {
    to: toAddress,
    value: ethers.utils.parseEther(amountInEther.toString()),
    gasLimit: 21000,
  };
  const transactionResponse = await wallet.sendTransaction(tx);
  await transactionResponse.wait();
  return transactionResponse.hash;
}
