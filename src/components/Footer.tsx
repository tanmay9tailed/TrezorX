"use client"
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconHome,
  IconUser,
  IconWallet,
} from "@tabler/icons-react";
import Image from "next/image";

export default function Footer() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Create Account",
      icon: (
        <IconWallet className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/createaccount",
    },
    {
      title: "Profile",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/profile",
    },
    {
      title: "Something new coming...",
      icon: (
        <Image
          src="/Designer (1).jpeg"
          width={20}
          height={20}
          alt="Portfolio"
        />
      ),
      href: "#",
    },
    {
      title: "Portfolio",
      icon: (
        <Image
          src="/my-logo1.jpeg"
          width={20}
          height={20}
          alt="Portfolio"
        />
      ),
      href: "https://tanmay-sahu-portfolio.vercel.app/",
    },
    {
      title: "About Us",
      icon: (
        <Image
          src="/Designer (2).jpeg"
          width={40}
          height={40}
          alt="Portfolio"
        />),
      href: "/about-us",
    },

    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.instagram.com/__tanmayy.sahu__/profilecard/?igsh=MXZwaDh4Y2dmeHRt",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/tanmay9tailed",
    },
  ];
  return (
    <div className="flex items-center justify-center w-full fixed bottom-10">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
