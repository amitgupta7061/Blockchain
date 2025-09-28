import { useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


interface SendTransactionProps {
  onBack: () => void;
}

export function SendTransaction({ onBack }: SendTransactionProps) {
  const [currency, setCurrency] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const sendTransaction = async () => {
    if (!currency || !recipientAddress || !amount) return;
    
    setLoading(true);
    // Simulate transaction
    setTimeout(() => {
      toast({
        title: "Transaction Sent",
        description: `Successfully sent ${amount} ${currency.toUpperCase()}`,
      });
      setLoading(false);
      onBack();
    }, 2000);
  };

  return (
    <Card className="crypto-card-elevated animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowUpRight className="h-5 w-5" />
          Send Transaction
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
          <label className="text-sm font-medium">Recipient Address</label>
          <Input
            placeholder="Enter recipient address..."
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Input
            placeholder="0.00"
            type="number"
            step="0.0001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={sendTransaction} 
            disabled={!currency || !recipientAddress || !amount || loading}
            className="wallet-button-primary flex-1"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <ArrowUpRight className="h-4 w-4 mr-2" />
            )}
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}