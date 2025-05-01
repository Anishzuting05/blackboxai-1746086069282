import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";

const WalletIntegration = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(null);

  // Connect MetaMask wallet
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        setProvider(window.ethereum);
      } catch (error) {
        console.error("MetaMask connection error:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask extension.");
    }
  };

  // Connect WalletConnect wallet
  const connectWalletConnect = async () => {
    try {
      const walletConnectProvider = new WalletConnectProvider({
        rpc: {
          56: "https://bsc-dataseed.binance.org/",
          1: "https://mainnet.infura.io/v3/your-infura-id"
        },
      });
      await walletConnectProvider.enable();
      const web3Instance = new Web3(walletConnectProvider);
      setWeb3(web3Instance);
      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);
      setProvider(walletConnectProvider);
    } catch (error) {
      console.error("WalletConnect connection error:", error);
    }
  };

  // Disconnect wallet
  const disconnect = async () => {
    if (provider && provider.close) {
      await provider.close();
    }
    setAccount(null);
    setProvider(null);
    setWeb3(null);
  };

  return (
    <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
      {!account ? (
        <>
          <button
            onClick={connectMetaMask}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4"
          >
            Connect MetaMask
          </button>
          <button
            onClick={connectWalletConnect}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Connect WalletConnect
          </button>
        </>
      ) : (
        <>
          <p className="mb-4 break-all">Connected Wallet: {account}</p>
          <button
            onClick={disconnect}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  );
};

export default WalletIntegration;
