# comet-interface

Frontend interface for the lending protocol built for DeFiGeek Community (DFGC).

[Smart Contract Repository](https://github.com/DeFiGeek-Community/comet)

## Tech Stack

- **Framework**: Next.js 14
- **Smart Contract Integration**: wagmi v2, viem
- **UI Library**: Chakra UI
- **State Management**: TanStack Query (React Query)
- **Form Management**: Formik
- **Charts**: Chart.js, react-chartjs-2
- **Wallet Connection**: Web3Modal
- **Internationalization**: react-i18next
- **Language**: TypeScript

## Requirements

- Node.js >= 18.17.0
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone https://github.com/DeFiGeek-Community/comet-interface
cd comet-interface
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
Copy `.env.example` to `.env` and set up the following environment variables:

```bash
# Alchemy Project Key
NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_key

# WalletConnect Project ID
NEXT_PUBLIC_PROJECT_ID=your_walletconnect_project_id

# Infura Project ID
NEXT_PUBLIC_INFURA_ID=your_infura_id
```

You can obtain the API keys from:
- Alchemy: https://www.alchemy.com/
- WalletConnect: https://cloud.walletconnect.com/
- Infura: https://www.infura.io/

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Key Features

- Deposit/Withdraw collateral assets
- Borrow/Repay
- Real-time interest rate display
- Liquidation risk monitoring
- Reward claiming
- Multi-wallet support
- Real-time blockchain data display

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run start`: Start production server
- `npm run lint`: Run ESLint code verification
- `npm run format`: Run Prettier code formatting

## Project Structure

```
comet-interface/
├── components/     # UI Components
├── hooks/         # Custom Hooks
│   ├── pool/      # Pool related hooks
│   ├── util/      # Utility hooks
│   └── shared/    # Shared hooks
├── lib/           # Utilities, Constants, and Contexts
│   ├── constants/ # Contract ABIs, addresses, and configs
│   ├── connector/ # Blockchain connection utilities
│   └── contexts/  # React contexts
├── pages/         # Next.js page components
└── public/        # Static files
```

## License

This project is released under the [BSD-3-Clause License](LICENSE).
