import { useState } from "react";
import { Bitcoin, Zap, Hexagon, Eye, EyeOff, Copy, ArrowUpRight, ArrowDownLeft } from "lucide-react";


import { Button } from "./ui/button";
import { useToast } from "../hooks/use-toast";

interface WalletCardProps {
  currency: "bitcoin" | "ethereum" | "solana";
  balance: string;
  publicAddress: string;
  onSend: () => void;
  onReceive: () => void;
}

const currencyConfig = {
  bitcoin: {
    name: "Bitcoin",
    symbol: "BTC",
    icon: Bitcoin,
    gradient: "gradient-bitcoin",
    color: "bitcoin"
  },
  ethereum: {
    name: "Ethereum", 
    symbol: "ETH",
    icon: Zap,
    gradient: "gradient-ethereum",
    color: "ethereum"
  },
  solana: {
    name: "Solana",
    symbol: "SOL", 
    icon: Hexagon,
    gradient: "gradient-solana",
    color: "solana"
  }
};

export function WalletCard({ currency, balance, publicAddress, onSend, onReceive }: WalletCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const { toast } = useToast();
  const config = currencyConfig[currency];
  const Icon = config.icon;

  const copyAddress = () => {
    navigator.clipboard.writeText(publicAddress);
    toast({
      title: "Address Copied",
      description: "Public address copied to clipboard",
    });
  };

  return (
    <div className="crypto-card-elevated p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${config.gradient}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{config.name}</h3>
            <p className="text-muted-foreground text-sm">{config.symbol}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowBalance(!showBalance)}
        >
          {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>
      </div>

      <div className="mb-6">
        <div className="text-3xl font-bold mb-2">
          {showBalance ? balance : "••••••••"}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="truncate">{publicAddress.slice(0, 6)}...{publicAddress.slice(-4)}</span>
          <Button variant="ghost" size="icon" className="h-4 w-4" onClick={copyAddress}>
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onSend} className="wallet-button-primary flex-1">
          <ArrowUpRight className="h-4 w-4 mr-2" />
          Send
        </Button>
        <Button onClick={onReceive} variant="outline" className="flex-1">
          <ArrowDownLeft className="h-4 w-4 mr-2" />
          Receive
        </Button>
      </div>
    </div>
  );
}