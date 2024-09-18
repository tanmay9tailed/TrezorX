import React, { useEffect, useState } from "react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "./ui/button";
import { removeWallet } from "@/lib/features/slice/slice";
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
import { ArrowRightLeft, DollarSign, Plus, Send } from "lucide-react";
import axios from "axios";
import { ethers } from "ethers";
import ReactLoading from 'react-loading'

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut", staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

const Wallet: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false);

  const accounts = useAppSelector((state) => state.accounts);
  const defaultAcc = accounts.default_account;
  const currency = accounts.details[defaultAcc].currency;
  const defaultWallet = accounts.details[defaultAcc].default_wallet;
  const walletDetails = accounts.details[defaultAcc].wallets[defaultWallet];
  const [balance, setBalance] = useState("-1");
  const [amount, setAmount] = useState("10");

  const handleRemoveWallet = () => {
    const index = accounts.details[defaultAcc].wallets.findIndex(
      (wallet) => wallet.publicKey === walletDetails.publicKey
    );
    if (index !== -1) {
      dispatch(removeWallet(index));
    }
  };

  const buttonData = [
    { Icon: Plus, text: "Receive", onClick: () => {} },
    { Icon: Send, text: "Send", onClick: () => {} },
    { Icon: ArrowRightLeft, text: "Swap", onClick: () => {} },
    { Icon: DollarSign, text: "Buy", onClick: () => {} },
  ];

  useEffect(() => {
    const getEthBalance = async () => {
      try {
        const response = await axios.post(
          "https://eth-mainnet.g.alchemy.com/v2/djt3Hz2vuRd_sihRFtfXzdXWZjbciIJg",
          {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getBalance",
            params: [walletDetails?.publicKey, "latest"],
          }
        );
        const balanceInWei = response.data.result;
        const balanceInEther = ethers.formatEther(balanceInWei);
        setAmount(balanceInEther);
  
        // Fetch ETH to USD price
        // const ethPriceResponse = await axios.get(
        //   "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        // );
        // const ethPriceInUSD = ethPriceResponse.data.ethereum.usd;
        // setBalance((parseFloat(balanceInEther) * ethPriceInUSD).toFixed(2));
      } catch (err) {
        console.error("Error fetching Eth", err);
      }
    };
  
    const getSolBalance = async () => {
      try {
        const response = await axios.post(
          "https://solana-mainnet.g.alchemy.com/v2/djt3Hz2vuRd_sihRFtfXzdXWZjbciIJg",
          {
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: [walletDetails?.publicKey],
          }
        );
        const balanceInLampports = response.data.result.value;
        const balanceInSol = balanceInLampports / 1e9;
        setAmount(balanceInSol.toString());
  
        // Fetch SOL to USD price
        // const solPriceResponse = await axios.get(
        //   "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        // );
        // const solPriceInUSD = solPriceResponse.data.solana.usd;
        // const balanceInUSD = balanceInSol * solPriceInUSD;
        // setBalance(balanceInUSD.toFixed(2));
      } catch (err) {
        console.error("Error fetching SOL", err);
      }
    };
  
    if (currency === "60") {
      getEthBalance();
    } else {
      getSolBalance();
    }
  }, [walletDetails?.publicKey, currency]);
  

  return (
    <>
      {walletDetails ? (
        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="text-4xl font-bold mt-8 text-center flex justify-center items-center" variants={itemVariants}>
            {balance==="-1"?<ReactLoading type={"spin"} color={"grey"} height={'24px'} width={'24px'}/>:`$ ${balance}`}
          </motion.h1>
          <motion.p className="text-lg font-semibold text-green-400 mt-3 w-full text-center" variants={itemVariants}>
            +$00.00 <span className="ml-1 p-1 bg-green-200/20 rounded-lg">+00%</span>
          </motion.p>
          <motion.div className="flex justify-center items-center gap-3 mt-8" variants={itemVariants}>
            {buttonData.map(({ Icon, text, onClick }) => (
              <motion.div
                key={text}
                className="flex flex-col justify-center flex-wrap items-center gap-1 bg-gray-800 rounded-xl w-20 hover:bg-gray-700 cursor-pointer px-4 py-2"
                onClick={onClick}
                whileHover={{ scale: 1.05 }}
              >
                <Icon size={30} className="text-blue-400" />
                <p className="text-xs text-gray-300">{text}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="mb-4 p-4 w-full border rounded-lg bg-gray-100 dark:bg-gray-800 mt-10"
            variants={itemVariants}
          >
            <motion.p className="text-lg font-semibold" variants={itemVariants}>
              Wallet {walletDetails.walletNo}
            </motion.p>
            <motion.p className="text-lg font-semibold" variants={itemVariants}>
              No of {currency == "60"?"eths":"sols"} : {amount === "10" ? <ReactLoading type={"spin"} color={"white"} height={'24px'} width={'24px'} /> : `${amount}`}

            </motion.p>

            <motion.p className="text-sm truncate" variants={itemVariants}>
              Public Key: {walletDetails.publicKey}
            </motion.p>
            <motion.div className="text-sm flex justify-between items-center" variants={itemVariants}>
              <div className="flex-1 overflow-hidden">
                <span>Private Key: </span>
                <input
                  type={isPrivateKeyVisible ? "text" : "password"}
                  value={walletDetails.privateKey}
                  readOnly
                  className="bg-transparent overflow-ellipsis w-full focus:outline-none"
                />
              </div>
              {isPrivateKeyVisible ? (
                <IconEye onClick={() => setIsPrivateKeyVisible(false)} className="ml-2 cursor-pointer" />
              ) : (
                <IconEyeClosed onClick={() => setIsPrivateKeyVisible(true)} className="ml-2 cursor-pointer" />
              )}
            </motion.div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="default" className="py-2 sm:py-4">
                  Remove Wallet
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your wallet and remove your data from our
                    servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRemoveWallet}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="flex items-center justify-center w-full pt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-2xl font-semibold text-zinc-300 [text-shadow:_0px_0px_20px_rgb(255_255_255)]">
            Create Your Wallet
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Wallet;
