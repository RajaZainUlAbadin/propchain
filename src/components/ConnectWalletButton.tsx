import { useState } from "react";
import ConnectWalletModal from "./ConnectWalletModal";
import { useWallet } from "../context/WalletContext";

const ConnectWalletButton = () => {
  const { account, setAccount } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDisconnect = () => {
    setAccount(null);
  };

  return (
    <>
     <button
        onClick={() => (account ? handleDisconnect() : setIsModalOpen(true))}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
          account
            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
            : 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white hover:from-blue-700 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:scale-105'
        }`}
      >
        <span className="hidden sm:block">
          {account
            ? `${account.slice(0, 6)}...${account.slice(-4)}`
            : 'Connect Wallet'}
        </span>
      </button>

      <ConnectWalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ConnectWalletButton;
