"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconBrandGithub, IconBrandX, IconHome, IconWallet } from "@tabler/icons-react";
import Image from "next/image";

export default function Footer() {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/",
    },

    {
      title: "Create Account",
      icon: <IconWallet className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/createaccount",
    },
    {
      title: "Profile",
      icon: <Image src="/Designer (1).jpeg" width={20} height={20} alt="Portfolio" />,
      href: "/profile",
    },
    {
      title: "Portfolio",
      icon: <Image src="/my-logo1.jpeg" width={20} height={20} alt="Portfolio" />,
      href: "https://tanmay-sahu-portfolio.vercel.app/",
    },
    {
      title: "About Us",
      icon: <Image src="/Designer (2).jpeg" width={40} height={40} alt="Portfolio" />,
      href: "/about-us",
    },

    {
      title: "Twitter",
      icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://x.com/sahu069",
    },
    // {
    //   title: "Instagram",
    //   icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    //   href: "https://www.instagram.com/__tanmayy.sahu__/profilecard/?igsh=MXZwaDh4Y2dmeHRt",
    // },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://github.com/tanmay9tailed",
    },
  ];
  return (
    <div className="sm:flex sm:items-center sm:justify-center w-full fixed bottom-6 left-4 z-10">
      <FloatingDock items={links} />
    </div>
  );
}
