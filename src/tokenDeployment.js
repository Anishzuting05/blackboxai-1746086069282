import { ethers } from 'ethers';
import { provider } from './bscUtils';

// Minimal ERC-20 Token ABI and Bytecode (for demonstration, use verified contracts in production)
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

// Example bytecode placeholder (replace with actual compiled bytecode)
const ERC20_BYTECODE = "0x..."; // You need to replace this with actual bytecode

// Deploy ERC-20 token contract
export async function deployERC20Token(wallet, name, symbol, totalSupply) {
  const factory = new ethers.ContractFactory(ERC20_ABI, ERC20_BYTECODE, wallet);
  const contract = await factory.deploy(name, symbol, totalSupply);
  await contract.deployed();
  return contract.address;
}
