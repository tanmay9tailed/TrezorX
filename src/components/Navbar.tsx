"use client"
import { ModeToggle } from "@/components/ui/mode-toggler";
import { SparklesCore } from "./ui/sparkles";
import { useRouter } from "next/navigation";

const Navbar = () => {
  
  const router = useRouter();
  return (
    <div className="h-[10vh] w-full flex flex-row justify-between items-start p-5 pr-20">
      <div className="w-60 bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md relative">
        <h1 className="text-lg font-bold text-center relative z-20 cursor-pointer" onClick={() => {router.push("/")}}>TrezorX</h1>
        <div className="w-2/3 h-14 relative">
          {/* Gradients */}
          <div className="absolute inset-x-4 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full blur-sm" />
          <div className="absolute inset-x-4 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-full" />
          <div className="absolute inset-x-12 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/2 blur-sm" />
          <div className="absolute inset-x-12 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/2" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-transparent [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
