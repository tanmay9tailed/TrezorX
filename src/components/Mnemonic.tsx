import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { motion } from "framer-motion";

const Mnemonic = ({ selectCurrency, createOrImport }) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [mnemonic, setMnemonic] = useState("");

  useEffect(() => {
    if (createOrImport === "create") {
      const mnemonic = generateMnemonic();
      setMnemonic(mnemonic);
    }
  }, [createOrImport]);

  const handleCopy = () => {
    navigator.clipboard.writeText(mnemonic).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const handleInputChange = (index, value) => {
    const mnemonicArray = mnemonic.split(" ");
    mnemonicArray[index] = value;
    setMnemonic(mnemonicArray.join(" "));
  };

  const isAllFieldsFilled = () => {
    return mnemonic.split(" ").length === 12 && mnemonic.split(" ").every(phrase => phrase.trim() !== "");
  };

  const checkHandleCopy = () => {
    if (createOrImport === "create") {
      handleCopy();
    }
  };

  const mnemonicPhrases = createOrImport === "import"
    ? Array(12).fill("").map((_, index) => mnemonic.split(" ")[index] || "")
    : mnemonic.split(" ");

  const handleNext = () => {
    if (typeof window !== "undefined") { // Check if window is defined
      try {
        const seed = mnemonicToSeedSync(mnemonic);
        localStorage.setItem("seed", seed.toString("hex"));
        localStorage.setItem("Currency", selectCurrency);
        router.push("/profile");
      } catch (error) {
        console.error("Error generating seed from mnemonic:", error);
      }
    }
  };

  return (
    <>
      {selectCurrency !== "" && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {},
          }}
          className="h-full flex flex-col items-center justify-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl font-semibold mb-12">
              {createOrImport === "create" ? "Secret Recovery Phrase" : "Enter Your Recovery Phrase"}
            </h1>
            <p className="text-gray-400">
              {createOrImport === "create"
                ? "Save these words in a safe place."
                : "Please enter your recovery phrase below."}
            </p>
            {createOrImport === "create" && (
              <a href="#" className="text-blue-400 hover:underline">
                Read the warnings again
              </a>
            )}
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="bg-gray-300 dark:bg-gray-800 py-8 px-12 rounded-lg shadow-lg grid grid-cols-3 gap-10 cursor-pointer relative"
            onClick={checkHandleCopy}
          >
            {mnemonicPhrases.map((phrase, index) => (
              <div key={index} className="flex items-center">
                <span className="text-gray-400 mr-2">{index + 1}</span>
                <input
                  type="text"
                  value={phrase}
                  disabled={createOrImport === "create"}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="bg-transparent border-b border-gray-400 focus:outline-none"
                  required
                />
              </div>
            ))}
            {isCopied && createOrImport === "create" && (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-green-400 font-bold">
                Copied to clipboard!
              </div>
            )}
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-6"
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <span className="ml-2 text-gray-400">
                I {createOrImport === "create" ? "saved" : "entered"} my secret recovery phrase
              </span>
            </label>
          </motion.div>

          <motion.button
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            disabled={createOrImport === "import" ? !isAllFieldsFilled() : !isChecked}
            className={`mt-6 py-2 px-6 rounded-lg focus:outline-none transition duration-150 text-white ${
              createOrImport === "import"
                ? isAllFieldsFilled()
                  ? "bg-gray-500 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-600"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : isChecked
                ? "bg-gray-500 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-600"
                : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
            }`}
            onClick={handleNext}
          >
            {createOrImport === "import" ? "Next" : "Create Wallet"}
          </motion.button>
        </motion.div>
      )}
    </>
  );
};

export default Mnemonic;
