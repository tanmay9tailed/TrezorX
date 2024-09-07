import React from "react";
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
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FloatingNav } from "./floating-navbar";
import { AccountsState, setDefaultWallet } from "@/lib/features/slice/slice";
import Wallet from "./Wallet";
import { useAppDispatch } from "@/lib/hooks";

interface CustomWallet {
  walletNo: number;
  publicKey: string;
  privateKey: string;
}

interface ProfileProps {
  currency: string;
  wallets: CustomWallet[];
  handleAddWallet: () => void;
  handleClearWallet: () => void;
  showPrivateKeyIndex: number | null;
  setShowPrivateKeyIndex: React.Dispatch<React.SetStateAction<number | null>>;
  accounts: AccountsState;
}

const Profile: React.FC<ProfileProps> = ({
  currency,
  wallets,
  handleAddWallet,
  handleClearWallet,
  showPrivateKeyIndex,
  setShowPrivateKeyIndex,
  accounts,
}) => {
  const dispatch = useAppDispatch();

  const changeDefaultWallet = (walletNo: string) => {
    const index = wallets.findIndex(
      (wallet) => wallet.publicKey === walletNo
    );
    dispatch(setDefaultWallet(index));
  };

  

  return (
    <motion.div
      className="w-full min-h-full px-6 sm:px-32 pb-[10vh]"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
      }}
    >
      <FloatingNav />
      <motion.div
        className="w-full flex justify-between items-center pt-10 sm:pt-20"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold">
          {currency} Wallet <br /> ({accounts.details[accounts.default_account].account_name})
        </h1>
        <div className="space-y-2 sm:space-x-5 flex flex-col sm:flex-row items-end">
          <Button variant={"default"} size={"default"} className="py-2 sm:py-4" onClick={handleAddWallet}>
            Add Wallet
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"outline"} size={"default"} className="py-2 sm:py-4">
                Change Wallet
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-mono">Switch between your wallets</AlertDialogTitle>
                <AlertDialogDescription>
                  {wallets.map((wallet) => (
                    <div className="border-b" key={wallet.walletNo}>
                      <AlertDialogCancel
                        className="py-2 sm:py-4 w-full border-none cursor-pointer hover:text-white transition-colors duration-200 font-mono block text-start"
                        onClick={() => changeDefaultWallet(wallet.publicKey)}
                      >
                        Wallet {wallet.walletNo}
                      </AlertDialogCancel>
                    </div>
                  ))}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
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
        <Wallet />
      </motion.div>
    </motion.div>
  );
};

export default Profile;
