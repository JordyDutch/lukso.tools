import { tools, type Tool } from "@/data/tools";

export type ToolProfile = {
  toolId: string;
  upAddress?: string;
  maintainer?: string;
  maintainerUp?: string;
  claimed: boolean;
  likesReceived: number;
  uniqueLikers: number;
  lastUpdated: string;
  standards: string[];
};

export type CuratedList = {
  id: string;
  name: string;
  description: string;
  curator: string;
  curatorUp?: string;
  listUpAddress?: string;
  hashListAddress?: string;
  likesReceived: number;
  uniqueLikers: number;
  tags: string[];
  toolIds: string[];
  source: "legacy" | "hashlist";
};

export type ToolWithSignals = Tool & {
  profile: ToolProfile | undefined;
  curatedBy: CuratedList[];
  score: number;
};

export const toolProfiles: ToolProfile[] = [];

export const curatedLists: CuratedList[] = [
  {
    id: "jordy-dev-essentials",
    name: "Jordy's Developer Essentials",
    description: "Practical tools for building, debugging, and shipping on LUKSO.",
    curator: "JordyDutch",
    likesReceived: 28600,
    uniqueLikers: 93,
    tags: ["developer", "debugging", "essentials"],
    toolIds: ["erc725-inspect", "envio-lukso", "lukso-docs", "lsp-indexer", "up-provider"],
    source: "legacy",
  },
  {
    id: "lukso-defi-live",
    name: "Live DeFi Tools",
    description: "Active DeFi and token tools that are useful for day-to-day LUKSO activity.",
    curator: "LUKSO community",
    likesReceived: 22400,
    uniqueLikers: 88,
    tags: ["defi", "staking", "swap"],
    toolIds: ["stakingverse", "universalswaps", "stakingverse-network-stats", "potato-tipper"],
    source: "legacy",
  },
  {
    id: "grid-and-social",
    name: "Grid and Social Layer",
    description: "Tools that show what Universal Profiles can become as public identities.",
    curator: "Community curators",
    likesReceived: 34600,
    uniqueLikers: 117,
    tags: ["social", "grid", "identity"],
    toolIds: ["grid-store", "lukso-grid-guide", "forever-moments", "universal-everything", "common-ground"],
    source: "legacy",
  },
];

export function adjustedLikes(likes: number, uniqueLikers: number) {
  return Math.round(Math.sqrt(likes) * 10 + uniqueLikers * 2);
}

export function getToolProfile(toolId: string) {
  return toolProfiles.find((profile) => profile.toolId === toolId);
}

export function getCuratedListsForTool(toolId: string) {
  return curatedLists.filter((list) => list.toolIds.includes(toolId));
}

export function getToolsWithSignals() {
  return tools.map((tool) => {
    const profile = getToolProfile(tool.id);
    const lists = getCuratedListsForTool(tool.id);
    const likes = profile ? adjustedLikes(profile.likesReceived, profile.uniqueLikers) : 0;
    const curatedWeight = lists.length * 1000;
    const claimedWeight = profile?.claimed ? 250 : 0;

    return {
      ...tool,
      profile,
      curatedBy: lists,
      score: curatedWeight + claimedWeight + likes,
    };
  }) satisfies ToolWithSignals[];
}

export function getCuratedToolIds() {
  return new Set(curatedLists.flatMap((list) => list.toolIds));
}

export function getToolsForList(list: CuratedList) {
  const byId = new Map(getToolsWithSignals().map((tool) => [tool.id, tool]));
  return list.toolIds
    .map((id) => byId.get(id))
    .filter((tool): tool is ToolWithSignals => Boolean(tool));
}
