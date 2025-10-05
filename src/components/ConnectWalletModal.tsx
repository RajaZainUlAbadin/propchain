import { useState } from "react";
import { connectMetaMask } from "../helpers/wallet";
import { useWallet } from "../context/WalletContext";
import Modal from "./UI/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectWalletModal = ({ isOpen, onClose }: Props) => {
  const { account, setAccount } = useWallet();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setError(null);
    setLoading(true);
    try {
      const connectedAccount = await connectMetaMask();
      if (connectedAccount) setAccount(connectedAccount);
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Connect Wallet</h2>

      {!account ? (
        <>
          <button
            onClick={handleConnect}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? 'Connecting...' : 'MetaMask'}
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-3">
              {error === 'MetaMask is not installed' ? (
                <>
                  MetaMask is not installed.{' '}
                  <a
                    href="https://metamask.io/download.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600"
                  >
                    Install MetaMask
                  </a>
                </>
              ) : (
                error
              )}
            </p>
          )}
        </>
      ) : (
        <p className="mt-2">Connected: {account}</p>
      )}

      <button
        onClick={onClose}
        className="mt-4 w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
      >
        Close
      </button>
    </Modal>    
  );
};

export default ConnectWalletModal;
