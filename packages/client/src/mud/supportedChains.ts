import { MUDChain, mudFoundry } from "@latticexyz/common/chains";

export const redstoneHolesky = {
    id: 17001,
    name: "Redstone Holesky",
    network: "redstone-holesky",
    summary: {
        location: "Holesky",
    },
    description: "Redstone Holesky",
    nativeCurrency: {
        decimals: 18,
        name: "Holesky Ether",
        symbol: "ETH",
    },
    rpcUrls: {
        default: {
            http: ["https://rpc.holesky.redstone.xyz"],
            webSocket: ["wss://rpc.holesky.redstone.xyz/ws"],
        },
        public: {
            http: ["https://rpc.holesky.redstone.xyz"],
            webSocket: ["wss://rpc.holesky.redstone.xyz/ws"],
        },
    },
    blockExplorers: {
        default: {
            name: "Blockscout",
            url: "https://explorer.holesky.redstone.xyz",
        },
    },
    faucetUrl: "https://17001-faucet.quarry.linfra.xyz/trpc",
    indexerUrl: "https://indexer.holesky.redstone.xyz/trpc",
    testnet: true,
};

// If you are deploying to chains other than anvil or Lattice testnet, add them here
export const supportedChains: MUDChain[] = [mudFoundry, redstoneHolesky];
