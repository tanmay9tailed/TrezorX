"use client";

import { Provider } from "react-redux";
import store from "../lib/store";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Provider store={store}>
        <div
          className={cn(
            "min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans antialiased m-0 p-0 relative",
            fontSans.variable
          )}
        >
          <Navbar />
          <div className="h-[80vh] w-full">{children}</div>
          <Footer />
        </div>
      </Provider>
    </ThemeProvider>
  );
}
