import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function BalanceChecker() {
  const [address, setAddress] = useState("");
  const [currency, setCurrency] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);

  const checkBalance = async () => {
    if (!address || !currency) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBalance(Math.random().toFixed(4));
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="crypto-card-elevated animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Check Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Currency</label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
              <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
              <SelectItem value="solana">Solana (SOL)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Public Address</label>
          <Input
            placeholder="Enter public address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <Button 
          onClick={checkBalance} 
          disabled={!address || !currency || loading}
          className="wallet-button-primary w-full"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          Check Balance
        </Button>

        {balance && (
          <div className="crypto-card p-4 mt-4 animate-fade-in">
            <div className="text-center">
              <div className="text-2xl font-bold">{balance}</div>
              <div className="text-muted-foreground">{currency?.toUpperCase()}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}