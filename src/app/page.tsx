"use client";

import { motion } from "framer-motion";
import { Vortex } from "@/components/ui/vortex";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const { theme } = useTheme();
  const [t, setT] = useState(theme); 
  const router = useRouter();

  useEffect(() => {
    setT(theme);
  }, [theme]);

  return (
    <div className="w-screen mx-auto rounded-md h-[80vh] overflow-hidden">
      <Vortex
        backgroundColor="transparent"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {},
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className={`relative flex-col md:flex-row text-3xl md:text-5xl lg:text-9xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent ${
              t === "light"
                ? "bg-gradient-to-b from-slate-300 via-neutral-800 to-black"
                : "bg-gradient-to-b from-neutral-800 via-white to-white"
            } flex items-center gap-2 md:gap-8`}
          >
            <span>Trezor-X</span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className={`mt-10 relative flex-col md:flex-row text-xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent ${
              t === "light"
                ? "bg-gradient-to-b from-slate-300 via-neutral-800 to-black"
                : "bg-gradient-to-b from-neutral-800 via-white to-white"
            } flex items-center gap-2 md:gap-8`}
          >
            <span>Welcome to TrezorX, a Web3 crypto wallet managing platform.</span>
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            <Button variant="default" className="mt-5" onClick={() => router.push("/createaccount")}>Get Started</Button>
          </motion.div>
        </motion.div>
      </Vortex>
    </div>
  );
}
