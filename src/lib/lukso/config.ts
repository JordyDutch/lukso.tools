import { type CuratedList, type ToolProfile } from "@/data/curation";

export const LUKSO_CHAIN_ID = Number(process.env.NEXT_PUBLIC_LUKSO_CHAIN_ID || 42);
const DEFAULT_RPC_BY_CHAIN: Record<number, string> = {
  42: "https://rpc.mainnet.lukso.network",
  4201: "https://rpc.testnet.lukso.network",
};
const HASHLISTS_PROTOCOL_BY_CHAIN: Record<number, string> = {
  42: "0xcD24F4b22729f3d531853255e1F31D87E42dD219",
  4201: "0xd5127cBcb66cCb18ff02d85FB461E4c284319023",
};
const EXPLORER_BY_CHAIN: Record<number, string> = {
  42: "https://explorer.execution.mainnet.lukso.network",
  4201: "https://explorer.execution.testnet.lukso.network",
};

export const LUKSO_RPC_URL =
  process.env.NEXT_PUBLIC_LUKSO_RPC_URL || DEFAULT_RPC_BY_CHAIN[LUKSO_CHAIN_ID] || DEFAULT_RPC_BY_CHAIN[42];
export const LUKSO_IPFS_GATEWAY =
  process.env.NEXT_PUBLIC_LUKSO_IPFS_GATEWAY || "https://api.universalprofile.cloud/ipfs/";
export const LIKES_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_LIKES_TOKEN_ADDRESS || "";
export const DEFAULT_LIKES_AMOUNT = process.env.NEXT_PUBLIC_DEFAULT_LIKES_AMOUNT || "1";
export const HASHLISTS_PROTOCOL_ADDRESS =
  process.env.NEXT_PUBLIC_HASHLISTS_PROTOCOL_ADDRESS ||
  HASHLISTS_PROTOCOL_BY_CHAIN[LUKSO_CHAIN_ID] ||
  "";

export type LiveListConfig = Pick<CuratedList, "id" | "hashListAddress" | "listUpAddress">;
export type LiveToolConfig = Pick<ToolProfile, "toolId" | "upAddress">;

function parseJsonEnv<T>(value: string | undefined): T[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function isPlaceholderAddress(address: string | undefined) {
  if (!address) return true;
  return /^0x(1{40}|2{40}|0{40})$/i.test(address);
}

export function isConfiguredAddress(address: string | undefined) {
  return Boolean(address && /^0x[a-fA-F0-9]{40}$/.test(address) && !isPlaceholderAddress(address));
}

export const liveListConfigs: LiveListConfig[] = parseJsonEnv<LiveListConfig>(
  process.env.NEXT_PUBLIC_CURATED_LISTS,
).filter((list) => isConfiguredAddress(list.hashListAddress));

export const liveToolConfigs: LiveToolConfig[] = parseJsonEnv<LiveToolConfig>(
  process.env.NEXT_PUBLIC_TOOL_PROFILES,
).filter((tool) => isConfiguredAddress(tool.upAddress));

export function getLiveListConfig(list: CuratedList): LiveListConfig | undefined {
  const envList = liveListConfigs.find((item) => item.id === list.id);
  if (envList) return envList;
  if (!isConfiguredAddress(list.hashListAddress)) return undefined;

  return {
    id: list.id,
    hashListAddress: list.hashListAddress,
    listUpAddress: list.listUpAddress,
  };
}

export function getLiveToolConfig(profile: ToolProfile | undefined): LiveToolConfig | undefined {
  if (!profile) return undefined;

  const envTool = liveToolConfigs.find((item) => item.toolId === profile.toolId);
  if (envTool) return envTool;
  if (!isConfiguredAddress(profile.upAddress)) return undefined;

  return {
    toolId: profile.toolId,
    upAddress: profile.upAddress,
  };
}

export function explorerAddressUrl(address: string) {
  const explorer = EXPLORER_BY_CHAIN[LUKSO_CHAIN_ID] || EXPLORER_BY_CHAIN[42];
  return `${explorer}/address/${address}`;
}
