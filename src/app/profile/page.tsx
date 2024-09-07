"use client";

import React, { useEffect, useState } from "react";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Wallet as EthersWallet, HDNodeWallet } from "ethers";
import { useRouter } from "next/navigation";
const hdkey = require("hdkey");
const createHash = require("create-hash");
import bs58check from "bs58check";
import bs58 from "bs58";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addWalletToAccount, setDefaultWallet } from "@/lib/features/slice/slice";
import Profile from "@/components/Profile";

// Define the CustomWallet interface
interface CustomWallet {
  walletNo: number;
  publicKey: string;
  privateKey: string;
}

const Page = () => {
  const accounts = useAppSelector((state) => state.accounts);
  const accNo = accounts.default_account;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrivateKeyIndex, setShowPrivateKeyIndex] = useState<number | null>(null);
  const [wallets, setWallets] = useState<CustomWallet[]>([]);
  const [curr, setCurr] = useState<string | null>(null);

  useEffect(() => {
    if (accounts.default_account === -1) {
      console.log("Redirecting to home due to missing account");
      router.push("/");
      return;
    }
    const storedWallets = accounts.details[accNo].wallets;
    setWallets(storedWallets);
    console.log(wallets);

    const currency = accounts.details[accNo]?.currency;
    if (currency === "501") {
      setCurrency("Solana");
      setCurr("501");
    } else if (currency === "60") {
      setCurrency("Ethereum");
      setCurr("60");
    } else if (currency === "0") {
      setCurrency("Bitcoin");
      setCurr("0");
    }

    setLoading(false);
  }, [accounts, accNo, router]);

  const handleAddWallet = () => {
    const walletsList = accounts.details[accNo].wallets;
    const lastWalletNo = walletsList.length > 0 ? walletsList[walletsList.length - 1].walletNo : 0;
    const nextWalletNo = lastWalletNo + 1;
  
    if (!curr) {
      console.error("Currency is not set");
      return;
    }
  
    const hexSeed = accounts.details[accNo]?.seed;
    if (!hexSeed) {
      console.error("Seed is missing or invalid");
      return;
    }
  
    const seed = Buffer.from(hexSeed, "hex");
    const path = `m/44'/${curr}'/${nextWalletNo}'/0'`;
  
    let newWallet: CustomWallet | null = null;
  
    // SOLANA
    if (curr === "501") {
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);
      newWallet = {
        walletNo: nextWalletNo, 
        publicKey: keypair.publicKey.toBase58(),
        privateKey: bs58.encode(secret),
      };
    }
  
    // ETHEREUM
    else if (curr === "60") {
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(path);
      const privateKey = child.privateKey;
      const wallet = new EthersWallet(privateKey);
      newWallet = {
        walletNo: nextWalletNo, 
        publicKey: wallet.address,
        privateKey: privateKey,
      };
    }
  
    // BITCOIN
    else if (curr === "0") {
      const root = hdkey.fromMasterSeed(seed);
      const addrnode = root.derive(path);
      const step1 = addrnode._publicKey;
      const step2 = createHash("sha256").update(step1).digest();
      const step3 = createHash("rmd160").update(step2).digest();
      const step4 = Buffer.allocUnsafe(21);
      step4.writeUInt8(0x00, 0);
      step3.copy(step4, 1);
      const address = bs58check.encode(step4);
      newWallet = {
        walletNo: nextWalletNo, 
        publicKey: address!,
        privateKey: addrnode.privateKey.toString("hex"),
      };
    }
  
    if (newWallet) {
      setWallets((prevWallets) => {
        const updatedWallets = [...prevWallets, newWallet];
        localStorage.setItem("wallets", JSON.stringify(updatedWallets));
        return updatedWallets;
      });
  
      dispatch(addWalletToAccount(newWallet));
      dispatch(setDefaultWallet(walletsList.length )); 
    } else {
      console.error("Failed to create wallet");
    }
  };  

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wallets", JSON.stringify(wallets));
    }
  }, [wallets]);

  const handleClearWallet = () => {
    setWallets([]);
    setCurrentIndex(0);
    localStorage.removeItem("wallets");
    router.push("/");
  };

  if (!loading) {
    return (
      <Profile
        currency={currency}
        wallets={wallets}
        handleAddWallet={handleAddWallet}
        handleClearWallet={handleClearWallet}
        showPrivateKeyIndex={showPrivateKeyIndex}
        setShowPrivateKeyIndex={setShowPrivateKeyIndex}
        accounts={accounts}
      />
    );
  } else {
    return (
      <motion.div
        className="flex items-center justify-center w-full h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-xl font-semibold">Creating Account...</div>
      </motion.div>
    );
  }
};

export default Page;
