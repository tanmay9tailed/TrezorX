// src/app/layout.tsx

import ClientRootLayout from "./RootLayout";

export const metadata = {
  title: "TrezorX",
  description: "Crypto Wallet WEBAPP",
  icons: {
    icon: "/Designer (2).jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
