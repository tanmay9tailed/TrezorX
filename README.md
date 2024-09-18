TrezorX
TrezorX is a Web3 crypto management app designed for managing Solana and Ethereum accounts and wallets. With TrezorX, users can create multiple accounts, manage wallets within those accounts, view real-time cryptocurrency balances, and handle mnemonic-based wallet creation or imports.

Live Demo

Features
Multi-Account Support: Create and manage multiple Solana and Ethereum accounts.
Wallet Management: Each account can hold multiple wallets. Users can create, delete, or import wallets as needed.
Real-Time Balance Display: View live balances of SOL or ETH in each wallet, updated in real-time.
Mnemonic & Seed Generation: Generate a new set of mnemonic phrases and create wallets from those phrases. Seed phrases are created for added security and account recovery.
Wallet Import: Import wallets by providing an existing mnemonic you already hold, making it easy to restore or manage existing wallets.
Future Features: Sending and receiving functionality for cryptocurrency transactions is planned in future updates.
Getting Started
To run this project locally, follow these steps:

1. Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/trezorx.git
cd trezorx
2. Install dependencies:
bash
Copy code
npm install
3. Run the development server:
bash
Copy code
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 with your browser to see the app.

How It Works
Create Accounts: Start by creating either Solana or Ethereum accounts within TrezorX.
Manage Wallets: After account creation, manage wallets within the account. You can have multiple wallets per account, each with its own unique address and balance.
Live Balance Monitoring: View the current balance of SOL or ETH in each wallet, updated in real-time.
Mnemonic & Wallet Creation: Generate a new mnemonic phrase to create wallets, ensuring security and recovery options through seed phrases.
Import Existing Wallets: Import wallets easily by inputting an existing mnemonic phrase, restoring your accounts with ease.
Manage Accounts and Wallets: Delete unnecessary accounts or wallets as needed for better management and organization.
Learn More
To learn more about the underlying technologies used in TrezorX, check out the following resources:

Next.js Documentation – Learn about the Next.js framework powering this app.
Solana Docs – Explore how the Solana blockchain works.
Ethereum Docs – Understand Ethereum blockchain functionalities.
Deployment
The app is deployed on Vercel. You can check the deployment documentation here.