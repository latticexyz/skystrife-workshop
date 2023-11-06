import { MUDChain, mudFoundry } from "@latticexyz/common/chains";

type SkyStrifeChain = MUDChain & {
    indexerUrl?: string;
};

export const redstone = {
    name: "Redstone Testnet",
    id: 894,
    network: "redstone-testnet",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    rpcUrls: {
        default: {
            http: ["https://894.quarry.linfra.xyz"],
            webSocket: ["wss://894.quarry.linfra.xyz/ws"],
        },
        public: {
            http: ["https://894.quarry.linfra.xyz"],
            webSocket: ["wss://894.quarry.linfra.xyz/ws"],
        },
    },
    faucetUrl: "https://894-faucet.quarry.linfra.xyz/trpc",
    indexerUrl: "https://894-indexer.quarry.linfra.xyz/trpc",
} as const satisfies SkyStrifeChain;


// If you are deploying to chains other than anvil or Lattice testnet, add them here
export const supportedChains: SkyStrifeChain[] = [mudFoundry, redstone];
