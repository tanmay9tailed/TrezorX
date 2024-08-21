"use client";
import React from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "About TrezorX",
    description:
      "TrezorX is a cutting-edge Web3 crypto management platform that empowers users to manage their Bitcoin, Solana, and Ethereum assets with ease. Built for security and efficiency, TrezorX offers a seamless experience for both novice and experienced users. Our platform combines the power of decentralized technology with user-friendly features to ensure your assets are always secure and accessible.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/TrezorX.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="TrezorX logo"
        />
      </div>
    ),
  },
  {
    title: "Real-Time Asset Management",
    description:
      "TrezorX allows users to monitor and manage their cryptocurrency portfolios in real time. Whether you're tracking the latest price movements or executing transactions, our platform ensures you have the tools you need at your fingertips. With live updates and instant notifications, staying on top of your investments has never been easier.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/Designer (1).jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Real-time asset management"
        />
      </div>
    ),
  },
  {
    title: "Secure & Reliable",
    description:
      "Security is at the core of TrezorX. Our platform uses advanced encryption and security protocols to safeguard your digital assets. With TrezorX, you can rest assured that your cryptocurrencies are protected from potential threats. Our commitment to security means that you can focus on growing your portfolio without worrying about safety.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/Designer (2).jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Secure and reliable"
        />
      </div>
    ),
  },
  {
    title: "Developed by Tanmay Sahu",
    description:
      "I’m Tanmay Sahu, the developer behind TrezorX. With a strong background in Web3 technology and a passion for creating user-centric applications, I’ve designed TrezorX to simplify the way you manage your digital assets. My goal is to provide a platform that is not only powerful but also intuitive and easy to use, making it accessible to everyone.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/Designer.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Tanmay Sahu"
        />
      </div>
    ),
  },
];

export default function StickyScrollRevealDemo() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <StickyScroll content={content} />
    </div>
  );
}
