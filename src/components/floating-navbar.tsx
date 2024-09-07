"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { IoCopyOutline, IoSettings } from "react-icons/io5";
import { AccountsState, setDefaultAccount } from "@/lib/features/slice/slice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export const FloatingNav = ({ className }: { className?: string; }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const accounts = useAppSelector((state) => state.accounts);

  const onChange = (num: number) => {
    console.log(num)
    dispatch(setDefaultAccount(num))
  }
  return (
    <div
      className={cn(
        "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/50 rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000]  items-center justify-center space-x-4",
        className
      )}
    >
      <div className="h-full border-r p-2 pr-4 dark:border-white/50 border-black">
        <IoSettings />
      </div>
      <div className="h-full py-2">
        <select className="px-6 pl-3 py-2 cursor-pointer hover:bg-zinc-800 rounded-full transition-all duration-300 bg-black outline-none border-none" name="accounts" id="accountSelect" value={accounts.default_account} onChange={(e) => onChange(Number(e.target.value))}>
          {accounts.details.map((account, index) => (
            <option className="" key={index} value={index}>
              {account.account_name}
            </option>
          ))}
        </select>
      </div>
      <div className="h-full border-l p-2 pl-4 dark:border-white/50 border-black">
        {" "}
        <IoCopyOutline />
      </div>
    </div>
  );
};
