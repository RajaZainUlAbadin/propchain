import { ExternalProvider } from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum?: ExternalProvider & {
      request?: (args: { method: string; params?: unknown[] }) => Promise<any>;
      isMetaMask?: boolean;
    };
  }
}

export const connectMetaMask = async (): Promise<string | null> => {
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask is not installed");
  }

  try {
    if (typeof window.ethereum.request !== "function") {
      throw new Error("MetaMask provider does not support request method");
    }

    const accounts: string[] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0];

  } catch (err: unknown) {
    if (err instanceof Error && (err as any).code === 4001) {
      // rejected request
      throw new Error("Connection request was rejected");
    }
    throw new Error("Failed to connect MetaMask");
  }
};
