import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Metadata configuration
export const metadata: Metadata = {
  title: "TrezorX",
  description: "Crypto Wallet WEBAPP",
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/Designer (2).jpeg",
    },
  ],
};

// Font configuration
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans antialiased m-0 p-0 relative", fontSans.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <div className="h-[80vh] w-full">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
