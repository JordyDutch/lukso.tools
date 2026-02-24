export type ToolCategory =
  | "all"
  | "defi"
  | "marketplace"
  | "indexer"
  | "token"
  | "authorization"
  | "grid"
  | "migration"
  | "developer"
  | "analytics"
  | "social"
  | "governance";

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  categories: Exclude<ToolCategory, "all">[];
  githubUrl?: string;
  tags?: string[];
  author?: string;
}

export const categories: { id: ToolCategory; label: string; description: string }[] = [
  { id: "all", label: "All", description: "All tools in the ecosystem" },
  { id: "defi", label: "DeFi", description: "Staking, swaps, liquidity, and financial tools" },
  { id: "marketplace", label: "Marketplace", description: "NFT marketplaces and creator storefronts" },
  { id: "indexer", label: "Indexer", description: "Blockchain data indexing and querying" },
  { id: "token", label: "Token", description: "Token drops, claims, and management" },
  { id: "authorization", label: "Authorization", description: "Permission and key management" },
  { id: "grid", label: "Grid", description: "Universal Profile grid layouts and templates" },
  { id: "migration", label: "Migration", description: "Asset migration and transfer tools" },
  { id: "developer", label: "Developer", description: "SDKs and developer tools" },
  { id: "analytics", label: "Analytics", description: "Explorers and dashboards" },
  { id: "social", label: "Social", description: "Social features and community tools" },
  { id: "governance", label: "Governance", description: "DAOs, voting, and community governance" },
];

export const tools: Tool[] = [
  {
    id: "lsp-indexer",
    name: "LSP Indexer",
    description: "Open-source indexer listening to LUKSO blockchain events. Decodes LSP3 profile metadata, LSP4 asset metadata, and LSP6 permission sets for fast queries.",
    url: "https://github.com/chillwhales/lsp-indexer",
    categories: ["indexer"],
    githubUrl: "https://github.com/chillwhales/lsp-indexer",
    tags: ["indexer", "lsp3", "lsp4", "lsp6", "metadata", "events"],
    author: "chillwhales"
  },
  {
    id: "envio-lukso",
    name: "Envio LUKSO Mainnet",
    description: "High-performance GraphQL indexing endpoint for LUKSO mainnet. Query blocks, transactions, events, and decoded LSP data with sub-100ms response times.",
    url: "https://envio.lukso-mainnet.universal.tech",
    categories: ["indexer"],
    githubUrl: "https://github.com/enviodev",
    tags: ["graphql", "indexer", "api", "mainnet", "query"],
    author: "Envio"
  },
  {
    id: "agent-token-claimer",
    name: "Agent Token Claimer",
    description: "Beta application for discovering and claiming token and NFT drops on LUKSO. Browse active drops, view details, and claim directly to your Universal Profile.",
    url: "https://agent-token-claimer.vercel.app",
    categories: ["token"],
    githubUrl: "https://github.com/JordyDutch/Token-Claimer",
    tags: ["drop", "claim", "token", "nft", "lsp7", "lsp8"],
    author: "JordyDutch"
  },
  {
    id: "up-authorize",
    name: "Universal Profile Authorize",
    description: "LSP6 Key Manager permission management interface. Grant, revoke, and configure permissions for controllers of your Universal Profile with an intuitive UI.",
    url: "https://authorize.universalprofile.cloud",
    categories: ["authorization"],
    tags: ["lsp6", "permissions", "key-manager", "controller", "security"],
    author: "LUKSO"
  },
  {
    id: "grid-store",
    name: "GridStore",
    description: "Template marketplace for Universal Profile grid layouts (LSP28). Browse, preview, and install pre-built grid configurations to customize your profile's appearance.",
    url: "https://grid-store-lukso.vercel.app",
    categories: ["grid"],
    tags: ["lsp28", "grid", "templates", "profile", "customization"],
    author: "Community"
  },
  {
    id: "lsp-mover",
    name: "LSP Asset Mover",
    description: "Migration tool to transfer LSP7 and LSP8 assets from legacy EOAs to Universal Profiles. Bulk transfer support with transaction batching.",
    url: "https://lsp-mover.sigmacore.io",
    categories: ["migration"],
    tags: ["migration", "lsp7", "lsp8", "transfer", "bulk", "eoa"],
    author: "JordyDutch"
  },

  // DeFi
  {
    id: "stakingverse",
    name: "Stakingverse",
    description: "Liquid staking for LUKSO. Stake LYX and receive sLYX (LSP7 liquid staking token) to use across DeFi protocols while earning staking rewards.",
    url: "https://stakingverse.io",
    categories: ["defi"],
    tags: ["staking", "liquid-staking", "sLYX", "lsp7", "defi", "validator"],
    author: "Stakingverse"
  },
  {
    id: "universalswaps",
    name: "UniversalSwaps",
    description: "The native decentralized exchange for LUKSO. Swap LSP7 tokens, provide liquidity, and earn fees. Includes a token generator tool for creating new tokens without code.",
    url: "https://universalswaps.io",
    categories: ["defi"],
    tags: ["dex", "swap", "liquidity", "defi", "lsp7", "amm"],
    author: "UniversalSwaps"
  },

  // Marketplace
  {
    id: "universal-page",
    name: "Universal Page",
    description: "The first NFT 2.0 marketplace on LUKSO. Gasless social marketplace for digital art and collectibles with creator storefronts, drops, and Universal Page Names (UPN).",
    url: "https://universal.page",
    categories: ["marketplace"],
    githubUrl: "https://github.com/Universal-Page/contracts",
    tags: ["marketplace", "nft", "lsp7", "lsp8", "gasless", "creators"],
    author: "Universal Page"
  },

  // Authorization / Management
  {
    id: "defolio",
    name: "Defolio",
    description: "Universal Profile management platform. Manage profile metadata, assets, batch transfers, vaults (LSP9), and third-party permissions (LSP6). BuildUP #2 hackathon winner.",
    url: "https://www.de-folio.com",
    categories: ["authorization"],
    tags: ["profile-management", "lsp6", "lsp9", "vaults", "batch-transfer", "permissions"],
    author: "Deliquified Labs"
  },

  // Migration
  {
    id: "universal-grave",
    name: "Universal Grave",
    description: "Spam filter for Universal Profiles. Automatically redirects unwanted LSP7/LSP8 tokens to a specialized vault. Toggle on/off without losing access to filtered assets.",
    url: "https://universalgrave.com",
    categories: ["migration"],
    githubUrl: "https://github.com/yearone-io/universal-grave",
    tags: ["spam-filter", "lsp1", "lsp7", "lsp8", "lsp9", "vault"],
    author: "Year One"
  },

  // Analytics
  {
    id: "blockscout-lukso",
    name: "LUKSO Blockscout Explorer",
    description: "Official block explorer for LUKSO mainnet. Search transactions, verify smart contracts, analyze addresses, view network stats, and access blockchain data via API.",
    url: "https://explorer.execution.mainnet.lukso.network",
    categories: ["analytics"],
    githubUrl: "https://github.com/lukso-network/network-explorer-execution",
    tags: ["explorer", "blockchain", "transactions", "smart-contracts", "api"],
    author: "LUKSO"
  },
  {
    id: "stakingverse-network-stats",
    name: "Stakingverse Network Stats",
    description: "Real-time LUKSO network statistics dashboard. Track validator counts, staking participation, network health, and key blockchain metrics at a glance.",
    url: "https://app.stakingverse.io/network-stats",
    categories: ["analytics"],
    tags: ["network", "statistics", "validators", "staking", "dashboard"],
    author: "Stakingverse"
  },
  {
    id: "universalprofile-cloud",
    name: "UniversalProfile.cloud",
    description: "Official Universal Profile explorer and manager. Browse profiles, tokens (LSP7), and NFTs (LSP8). Create and manage your Universal Profile, send tokens, and manage assets.",
    url: "https://my.universalprofile.cloud",
    categories: ["analytics"],
    githubUrl: "https://github.com/lukso-network/universalprofile.cloud",
    tags: ["explorer", "profiles", "lsp7", "lsp8", "management"],
    author: "LUKSO"
  },

  // Developer
  {
    id: "erc725-inspect",
    name: "ERC725 Inspect",
    description: "Developer tool to inspect and decode ERC725Y key-value stores on any Universal Profile or LSP smart contract. Includes ABI encoder/decoder for debugging.",
    url: "https://erc725-inspect.lukso.tech",
    categories: ["developer"],
    githubUrl: "https://github.com/lukso-network/tools-erc725-inspect",
    tags: ["erc725", "inspect", "decoder", "debug", "lsp2"],
    author: "LUKSO"
  },
  {
    id: "lsp-smart-contracts",
    name: "LSP Smart Contracts",
    description: "Official Solidity reference implementations of all LUKSO LSP Standards. Includes ABIs, interface IDs, ERC725Y data keys, and TypeScript types for LSP3/LSP4 metadata.",
    url: "https://www.npmjs.com/package/@lukso/lsp-smart-contracts",
    categories: ["developer"],
    githubUrl: "https://github.com/lukso-network/lsp-smart-contracts",
    tags: ["smart-contracts", "solidity", "lsp", "npm", "standards"],
    author: "LUKSO"
  },
  {
    id: "lukso-playground",
    name: "LUKSO Playground",
    description: "Collection of TypeScript and Solidity code examples for building dApps with LSP standards. Scripts for Universal Profiles, LSP1 receivers, LSP7/LSP8 tokens, and Hardhat setup.",
    url: "https://github.com/lukso-network/lukso-playground",
    categories: ["developer"],
    githubUrl: "https://github.com/lukso-network/lukso-playground",
    tags: ["examples", "playground", "typescript", "solidity", "hardhat", "tutorial"],
    author: "LUKSO"
  },
  {
    id: "up-provider",
    name: "UP Provider",
    description: "EIP-1193 compatible provider that enables dApps to function as Mini-Apps on Universal Profiles. One-click connection for Grid-based mini-apps.",
    url: "https://www.npmjs.com/package/@lukso/up-provider",
    categories: ["developer"],
    githubUrl: "https://github.com/lukso-network/tools-up-provider",
    tags: ["provider", "eip-1193", "mini-apps", "grid", "sdk", "npm"],
    author: "LUKSO"
  },
  {
    id: "lukso-cli",
    name: "LUKSO CLI",
    description: "Command line tool to install, manage, and set up validators of different clients for the LUKSO blockchain. Essential for node operators.",
    url: "https://github.com/lukso-network/tools-lukso-cli",
    categories: ["developer"],
    githubUrl: "https://github.com/lukso-network/tools-lukso-cli",
    tags: ["cli", "validator", "node", "infrastructure", "staking"],
    author: "LUKSO"
  },
  {
    id: "dia-oracle",
    name: "DIA Oracle",
    description: "Price oracle infrastructure deployed on LUKSO mainnet. Real-time price feeds for tokens updated every 120 seconds. Free for ecosystem builders, essential for DeFi dApps.",
    url: "https://docs.diadata.org/introduction/dia-technical-structure/data-delivery-methods/integrated-l1-l2-networks/lukso-price-oracles",
    categories: ["developer"],
    tags: ["oracle", "price-feeds", "defi", "infrastructure", "smart-contracts"],
    author: "DIA"
  },

  // Social
  {
    id: "universal-everything",
    name: "UniversalEverything.io",
    description: "The social Web3 hub for LUKSO. Explore Universal Profiles, view assets, send/receive tokens, and host mini-apps on your profile Grid. Includes a Token Creator tool.",
    url: "https://universaleverything.io",
    categories: ["social"],
    tags: ["social", "mini-apps", "grid", "token-creator", "profiles"],
    author: "LUKSO"
  },
  {
    id: "common-ground",
    name: "Common Ground",
    description: "Free and open-source Web3 community platform. First social app to integrate Universal Profiles into its core identity system. Features community wallets and governance tools.",
    url: "https://www.commonground.cg",
    categories: ["social"],
    tags: ["social", "community", "governance", "identity", "universal-profile"],
    author: "Common Ground"
  },
  {
    id: "luksoverse",
    name: "Luksoverse",
    description: "Ecosystem navigation hub for LUKSO. Originally started as a community movement, now serves as a directory that connects you to tools, dApps, and resources across the LUKSO ecosystem.",
    url: "https://luksoverse.io",
    categories: ["social"],
    tags: ["directory", "ecosystem", "navigation", "resources"],
    author: "Community"
  },
  {
    id: "potato-tipper",
    name: "POTATO Tipper",
    description: "Automatically reward new followers with $POTATO tokens. Set up a tipping budget, configure tip amounts, and define eligibility criteria like minimum followers or token balance.",
    url: "https://potatotipper.app",
    categories: ["social"],
    tags: ["tipping", "potato", "followers", "universal-profile"],
    author: "Jean Cavallera"
  },
  {
    id: "0xsoul",
    name: "0xSoul",
    description: "Immersive on-chain MMORPG in development for LUKSO. A persistent digital world with intelligent NPCs, discoverable legendary items, and dynamic economic and political systems.",
    url: "https://www.0xsoul.com",
    categories: ["social"],
    tags: ["gaming", "mmorpg", "on-chain", "npc"],
    author: "Community"
  },
  {
    id: "forever-moments",
    name: "Forever Moments",
    description: "Create and share collections of memories stored on-chain. Curate shared experiences around events, festivals, and movements with photos, videos, and articles — each owned by its creator.",
    url: "https://www.forevermoments.life",
    categories: ["social"],
    tags: ["memories", "collections", "on-chain", "marketplace"],
    author: "Forever Moments"
  },
  {
    id: "agent-skills-hub",
    name: "Agent Skills Hub",
    description: "Community repository of OpenClaw skills for autonomous AI agents. Pre-built, reusable skills for Universal Profile management, token operations, and liquid staking on LUKSO and EVM chains.",
    url: "https://github.com/JordyDutch/Agent-skills-hub",
    categories: ["developer"],
    githubUrl: "https://github.com/JordyDutch/Agent-skills-hub",
    tags: ["ai-agents", "openclaw", "skills", "sdk"],
    author: "JordyDutch"
  },
  {
    id: "forever-moments-api",
    name: "Forever Moments API",
    description: "Public and Agent API for the Forever Moments platform. Build transaction plans for minting Moments, creating Collections, transferring $LIKES tokens, and gasless marketplace actions on LUKSO.",
    url: "https://github.com/Forever-Moments/forever-moments-api",
    categories: ["developer"],
    githubUrl: "https://github.com/Forever-Moments/forever-moments-api",
    tags: ["api", "agent", "lsp8", "gasless"],
    author: "Forever Moments"
  },
  {
    id: "sigmacore-rpc",
    name: "SigmaCore RPC",
    description: "Dedicated LUKSO RPC endpoint by SigmaCore. Provides reliable node access for dApps and developers. Requires an API key — sign up on their website to get started.",
    url: "https://sigmacore.io",
    categories: ["developer"],
    tags: ["rpc", "node", "api-key", "infrastructure"],
    author: "SigmaCore"
  },
  {
    id: "lukso-docs",
    name: "LUKSO Documentation",
    description: "Official technical documentation for LUKSO. Covers LSP standards, Universal Profiles, smart contract guides, network info, and complete API references for building on LUKSO.",
    url: "https://docs.lukso.tech",
    categories: ["developer"],
    githubUrl: "https://github.com/lukso-network/docs",
    tags: ["docs", "guides", "standards", "lsp"],
    author: "LUKSO"
  },
  {
    id: "lukso-lips",
    name: "LUKSO Improvement Proposals (LIPs)",
    description: "Official repository of LUKSO Improvement Proposals and LSP standards. The formal specification process for all LUKSO standards including LSP0 through LSP28.",
    url: "https://github.com/lukso-network/LIPs",
    categories: ["developer"],
    githubUrl: "https://github.com/lukso-network/LIPs",
    tags: ["standards", "lips", "lsp", "specifications"],
    author: "LUKSO"
  },
  {
    id: "dapp-boilerplate",
    name: "LUKSO dApp Boilerplate",
    description: "Official Next.js template for building dApps on LUKSO. Pre-configured with Universal Profile connection, LSP helpers, and best practices to get started quickly.",
    url: "https://github.com/lukso-network/tools-dapp-boilerplate",
    categories: ["developer"],
    githubUrl: "https://github.com/lukso-network/tools-dapp-boilerplate",
    tags: ["boilerplate", "nextjs", "template", "dapp"],
    author: "LUKSO"
  },
  {
    id: "miniapp-template",
    name: "Mini-App Template",
    description: "Official Next.js template for building Mini-Apps for the Universal Profile Grid. Includes UP Provider setup and everything needed to create Grid-compatible mini-apps.",
    url: "https://github.com/lukso-network/miniapp-nextjs-template",
    categories: ["developer"],
    githubUrl: "https://github.com/lukso-network/miniapp-nextjs-template",
    tags: ["mini-apps", "grid", "nextjs", "template"],
    author: "LUKSO"
  },
  {
    id: "lukso-grid-guide",
    name: "LUKSO Grid Guide",
    description: "Step-by-step beginner's guide to building, deploying, and adding a custom mini app to your Universal Profile Grid using AI vibe coding tools. No coding experience required — copy-paste prompts, deployment walkthrough, LSP28 integration, and troubleshooting included.",
    url: "https://lukso-grid-guide.vercel.app",
    categories: ["grid", "developer"],
    githubUrl: "https://github.com/JordyDutch/lukso-grid-guide",
    tags: ["guide", "beginner", "mini-apps", "lsp28", "vibe-coding", "grid"],
    author: "JordyDutch & LUKSOAgent"
  },
  {
    id: "eip191-signer",
    name: "EIP-191 Signer",
    description: "Utility tool to sign EIP-191 Execute Relay Call transactions for LUKSO. Essential for building gasless transaction flows using the Key Manager relay service.",
    url: "https://github.com/lukso-network/tools-eip191-signer",
    categories: ["developer"],
    githubUrl: "https://github.com/lukso-network/tools-eip191-signer",
    tags: ["eip-191", "relay", "gasless", "signing"],
    author: "LUKSO"
  },
  {
    id: "network-configs",
    name: "LUKSO Network Configs",
    description: "Official LUKSO network configuration files. Contains genesis files, bootnodes, and chain parameters for mainnet and testnet. Essential reference for node operators.",
    url: "https://github.com/lukso-network/network-configs",
    categories: ["developer"],
    githubUrl: "https://github.com/lukso-network/network-configs",
    tags: ["network", "config", "mainnet", "testnet"],
    author: "LUKSO"
  }
];
