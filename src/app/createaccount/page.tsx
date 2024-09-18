"use client";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import Mnemonic from "@/components/Mnemonic";

type CreateOrImportType = "create" | "import";
type SelectCurrencyType = "501" | "60" | "0" | ""; 

const Page = () => {
  const [createOrImport, setCreateOrImport] = useState<CreateOrImportType | "">("");
  const [selectCurrency, setSelectCurrency] = useState<SelectCurrencyType>("");
  const isMobile = useMediaQuery({
    query: "(max-device-width: 500px)",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <>
      {createOrImport === "" && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="h-full flex flex-col justify-center items-center space-y-20 sm:space-y-32"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <Image
              src="/TrezorX.jpeg"
              width={isMobile ? 100 : 200}
              height={isMobile ? 100 : 200}
              className="object-cover rounded-full mb-6"
              alt="TrezorX Logo"
            />
            <div className="text-center">
              <h1 className="text-5xl font-bold">Welcome to TrezorX</h1>
              <p className="text-lg mt-4 text-gray-400">Let&apos;s get started</p>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="mt-10 space-y-3 sm:space-y-6 w-full flex flex-col items-center"
          >
            <Button
              onClick={() => {
                setCreateOrImport("create");
              }}
              className="w-64 py-4 rounded-lg font-semibold transition duration-300"
            >
              Create a new wallet
            </Button>
            <Button
              onClick={() => {
                setCreateOrImport("import");
              }}
              className="w-64 py-4 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
            >
              Import Wallet
            </Button>
          </motion.div>
        </motion.div>
      )}
      {createOrImport !== "" && selectCurrency === "" && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="h-full w-full flex flex-col justify-start items-center pt-20 md:pt-52"
        >
          <motion.h1 variants={itemVariants} className="text-4xl font-semibold mb-12">
            Select Network
          </motion.h1>
          <div className="space-y-3 sm:space-y-6 w-full max-w-md flex flex-col items-center px-10 sm:px-0">
            <motion.div variants={itemVariants} className="w-full">
              <Button
                size={"lg"}
                onClick={() => setSelectCurrency("501")}
                className="w-full py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition duration-300 flex justify-start items-center space-x-4"
              >
                <Image
                  src="https://s3.amazonaws.com/app-assets.xnfts.dev/images/network-logo-replacement-solana.png"
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                  alt="Solana Logo"
                />
                <span className="ml-4">Solana</span>
              </Button>
            </motion.div>
            <motion.div variants={itemVariants} className="w-full">
              <Button
                size={"lg"}
                onClick={() => setSelectCurrency("60")}
                className="w-full py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition duration-300 flex justify-start items-center space-x-4"
              >
                <Image
                  src="https://assets.coingecko.com/asset_platforms/images/279/large/ethereum.png"
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                  alt="Ethereum Logo"
                />
                <span className="ml-4">Ethereum</span>
              </Button>
            </motion.div>
            {/* <motion.div variants={itemVariants} className="w-full">
              <Button
                size={"lg"}
                onClick={() => setSelectCurrency("0")}
                className="w-full py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition duration-300 flex justify-start items-center space-x-4"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/96px-Bitcoin.svg.png"
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                  alt="Bitcoin Logo"
                />
                <span className="ml-4">Bitcoin</span>
              </Button>
            </motion.div> */}
          </div>
        </motion.div>
      )}
      <Mnemonic selectCurrency={selectCurrency} createOrImport={createOrImport as CreateOrImportType} />
    </>
  );
};

export default Page;
