"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Wallet as EthersWallet, HDNodeWallet } from "ethers";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
var hdkey = require("hdkey");
var createHash = require("create-hash");
var bs58check = require("bs58check");
import bs58 from "bs58";
import { motion } from "framer-motion";

// Define the CustomWallet interface
interface CustomWallet {
  publicKey: string;
  privateKey: string;
}

const Page = () => {
  const router = useRouter();

  const [currency, setCurrency] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrivateKeyIndex, setShowPrivateKeyIndex] = useState<number | null>(null);
  const [wallets, setWallets] = useState<CustomWallet[]>([]);
  const [curr, setCurr] = useState<string | null>(null);

  useEffect(() => {
    const storedWallets = localStorage.getItem("wallets");
    if (storedWallets) {
      setWallets(JSON.parse(storedWallets));
    }

    const currency = localStorage.getItem("Currency");
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
  }, []);

  const handleAddWallet = () => {
    if (!curr) {
      console.error("Currency is not set");
      return;
    }

    const hexSeed = localStorage.getItem("seed");
    if (!hexSeed) {
      console.error("Seed is missing or invalid");
      return;
    }

    const seed = Buffer.from(hexSeed, "hex");
    const path = `m/44'/${curr}'/${currentIndex}'/0'`;

    // SOLANA
    if (curr === "501") {
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);
      setWallets((prevWallets) => [
        ...prevWallets,
        {
          publicKey: keypair.publicKey.toBase58(),
          privateKey: bs58.encode(secret),
        },
      ]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }

    // ETHEREUM
    else if (curr === "60") {
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(path);
      const privateKey = child.privateKey;
      const wallet = new EthersWallet(privateKey);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setWallets((prevWallets) => [
        ...prevWallets,
        {
          publicKey: wallet.address,
          privateKey: privateKey,
        },
      ]);
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

      setWallets((prevWallets) => [
        ...prevWallets,
        {
          publicKey: address!,
          privateKey: addrnode.privateKey.toString("hex"),
        },
      ]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
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
    localStorage.removeItem("seed");
    localStorage.removeItem("Currency");
    router.push("/");
  };

  return (
    <>
      <motion.div
        className="w-full min-h-full px-6 sm:px-32 pb-[10vh]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
        }}
      >
        <motion.div
          className="w-full flex justify-between items-center pt-10 sm:pt-20"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold">{currency} Wallet</h1>
          <div className="space-y-2 sm:space-x-5 flex flex-col sm:flex-row items-end">
            <Button variant={"default"} size={"lg"} className="py-2 sm:py-4" onClick={handleAddWallet}>
              Add Wallet
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"} size={"lg"} className="py-2 sm:py-4">
                  Clear Wallet
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your wallets and remove your data from
                    our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearWallet}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </motion.div>

        {/* Display wallets */}
        <motion.div
          className="mt-10"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {wallets.map((wallet, index) => (
            <motion.div
              key={index}
              className="mb-4 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
            >
              <p className="text-lg font-semibold">Wallet {index + 1}</p>
              <p className="text-sm truncate">Public Key: {wallet.publicKey}</p>
              <div className="text-sm flex justify-between items-center">
                <div className="flex-1 overflow-hidden">
                  <span>Private Key: </span>
                  <input
                    type={showPrivateKeyIndex === index ? "text" : "password"}
                    value={wallet.privateKey}
                    readOnly
                    className="bg-transparent overflow-ellipsis w-full focus:outline-none"
                  />
                </div>
                {showPrivateKeyIndex === index ? (
                  <IconEye onClick={() => setShowPrivateKeyIndex(null)} className="ml-2 cursor-pointer" />
                ) : (
                  <IconEyeClosed onClick={() => setShowPrivateKeyIndex(index)} className="ml-2 cursor-pointer" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Page;
