import { useState } from "react";
import { Plus, Settings, Activity } from "lucide-react";

import { Button } from "./ui/button";
import { SendTransaction } from "./SendTransaction";
import { ThemeToggle } from "./ThemeToggle";
import { BalanceChecker } from "./BalanceChecker";
import { WalletCard } from "./WalletCard";
import { ReceiveModal } from "./ReceiveModal";

// Mock wallet data
const mockWallets = [
  {
    currency: "bitcoin" as const,
    balance: "0.00234567",
    publicAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
  },
  {
    currency: "ethereum" as const,
    balance: "1.23456789",
    publicAddress: "0x742d35Cc6665C0532c7bd5B1F5e7F0D8e3eA4de7"
  },
  {
    currency: "solana" as const,
    balance: "12.3456",
    publicAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
  }
];

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<"dashboard" | "send" | "balance">("dashboard");
  const [receiveModal, setReceiveModal] = useState<{
    isOpen: boolean;
    currency: string;
    address: string;
  }>({ isOpen: false, currency: "", address: "" });

  const handleSend = () => {
    setCurrentView("send");
  };

  const handleReceive = (currency: string, address: string) => {
    setReceiveModal({ isOpen: true, currency, address });
  };

  const handleBack = () => {
    setCurrentView("dashboard");
  };

  if (currentView === "send") {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto">
          <SendTransaction onBack={handleBack} />
        </div>
      </div>
    );
  }

  if (currentView === "balance") {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBack}>
              ← Back
            </Button>
            <ThemeToggle />
          </div>
          <BalanceChecker />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 border-b border-border/50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              CryptoWallet
            </h1>
            <p className="text-muted-foreground">Manage your digital assets</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentView("balance")}
            >
              <Activity className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Portfolio Overview */}
          <section className="crypto-card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Portfolio</h2>
              <Button size="sm" className="wallet-button-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Wallet
              </Button>
            </div>
            <div className="text-3xl font-bold mb-2">$15,847.32</div>
            <div className="text-green-500 text-sm">↗ +5.2% (24h)</div>
          </section>

          {/* Wallets Grid */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Your Wallets</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockWallets.map((wallet) => (
                <WalletCard
                  key={wallet.currency}
                  currency={wallet.currency}
                  balance={wallet.balance}
                  publicAddress={wallet.publicAddress}
                  onSend={handleSend}
                  onReceive={() => handleReceive(wallet.currency, wallet.publicAddress)}
                />
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="crypto-card p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => setCurrentView("balance")}
              >
                <Activity className="h-6 w-6" />
                Check Balance
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Settings className="h-6 w-6" />
                Settings
              </Button>
            </div>
          </section>
        </div>
      </main>

      <ReceiveModal
        isOpen={receiveModal.isOpen}
        onClose={() => setReceiveModal({ ...receiveModal, isOpen: false })}
        currency={receiveModal.currency}
        publicAddress={receiveModal.address}
      />
    </div>
  );
}