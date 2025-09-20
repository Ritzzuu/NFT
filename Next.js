"use client";
import { useState } from "react";
import { ethers } from "ethers";
import ZenNFT from "../abi/ZenNFT.json"; // ABI contract

const CONTRACT_ADDRESS = "0xYourContractAddressHere";

export default function NFTMint() {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      const [acc] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(acc);
    }
  }

  async function mintNFT() {
    if (!account) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ZenNFT.abi, signer);

    const tx = await contract.mintNFT(account, "ipfs://Qm...yourMetadataHash");
    await tx.wait();
    alert("NFT berhasil di-mint!");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">ZenChain NFT Minting</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <button onClick={mintNFT}>Mint NFT</button>
      )}
    </div>
  );
}
