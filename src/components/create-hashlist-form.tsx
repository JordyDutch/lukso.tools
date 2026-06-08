"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLuksoWallet } from "@/hooks/use-lukso-wallet";
import { HASHLISTS_PROTOCOL_ADDRESS, explorerAddressUrl, isConfiguredAddress } from "@/lib/lukso/config";
import { deployHashList, waitForHashListDeployment } from "@/lib/lukso/contracts";

type CreateHashListFormProps = {
  defaultName?: string;
  defaultSymbol?: string;
};

function symbolFromName(name: string) {
  const letters = name.replace(/[^a-z0-9]/gi, "").toUpperCase();
  return (letters || "LIST").slice(0, 8);
}

export function CreateHashListForm({ defaultName = "LUKSO Tool List", defaultSymbol }: CreateHashListFormProps) {
  const wallet = useLuksoWallet();
  const [name, setName] = useState(defaultName);
  const [symbol, setSymbol] = useState(defaultSymbol || symbolFromName(defaultName));
  const [txHash, setTxHash] = useState("");
  const [listAddress, setListAddress] = useState("");
  const [error, setError] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const protocolReady = isConfiguredAddress(HASHLISTS_PROTOCOL_ADDRESS);

  const envLine = useMemo(() => {
    if (!listAddress) return "";
    return `{\"id\":\"your-list-id\",\"hashListAddress\":\"${listAddress}\",\"listUpAddress\":\"${wallet.account || listAddress}\"}`;
  }, [listAddress, wallet.account]);

  async function createList() {
    setError("");
    setTxHash("");
    setListAddress("");

    if (!wallet.provider || !wallet.account) {
      await wallet.connect();
      return;
    }

    if (!protocolReady) {
      setError("Hashlists protocol address is not configured for this chain.");
      return;
    }

    if (!name.trim() || !symbol.trim()) {
      setError("Name and symbol are required.");
      return;
    }

    setIsDeploying(true);
    try {
      const hash = await deployHashList(
        wallet.provider,
        wallet.account,
        HASHLISTS_PROTOCOL_ADDRESS,
        name.trim(),
        symbol.trim().toUpperCase(),
      );
      setTxHash(hash);
      const deployedAddress = await waitForHashListDeployment(hash);
      if (deployedAddress) {
        setListAddress(deployedAddress);
      }
    } catch (deployError) {
      setError(deployError instanceof Error ? deployError.message : "HashList deployment failed.");
    } finally {
      setIsDeploying(false);
    }
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase text-gray-900 dark:text-gray-100">
          Deploy HashList
        </h2>
        <a
          href={explorerAddressUrl(HASHLISTS_PROTOCOL_ADDRESS)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          Protocol
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <div className="space-y-3">
        <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="List name" />
        <Input value={symbol} onChange={(event) => setSymbol(event.target.value)} placeholder="Symbol" />
        <Button className="w-full" onClick={createList} disabled={isDeploying}>
          <Rocket className="h-4 w-4" />
          {isDeploying ? "Deploying" : "Create HashList"}
        </Button>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
        Uses the Hashlists protocol collection to deploy a curator-owned LSP8 list. Add the returned address to env config so it persists in the directory.
      </p>
      {txHash ? (
        <p className="mt-3 text-xs text-emerald-600 dark:text-emerald-400">
          Tx: {txHash.slice(0, 10)}...
        </p>
      ) : null}
      {listAddress ? (
        <div className="mt-3 rounded-md bg-emerald-50 p-3 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
          <p className="font-medium">Created {listAddress}</p>
          <p className="mt-1 break-all">{envLine}</p>
        </div>
      ) : null}
      {error ? (
        <p className="mt-3 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </section>
  );
}
