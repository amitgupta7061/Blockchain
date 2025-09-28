import { Copy, QrCode } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";


interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: string;
  publicAddress: string;
}

export function ReceiveModal({ isOpen, onClose, currency, publicAddress }: ReceiveModalProps) {
  const { toast } = useToast();

  const copyAddress = () => {
    navigator.clipboard.writeText(publicAddress);
    toast({
      title: "Address Copied",
      description: "Public address copied to clipboard",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="crypto-card-elevated">
        <DialogHeader>
          <DialogTitle className="text-center">
            Receive {currency?.toUpperCase()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex justify-center">
            <div className="p-8 bg-white rounded-xl">
              <QrCode className="h-32 w-32 text-gray-800" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Your {currency?.toUpperCase()} Address
            </label>
            <div className="crypto-card p-4 break-all text-sm font-mono">
              {publicAddress}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={copyAddress} className="wallet-button-primary flex-1">
              <Copy className="h-4 w-4 mr-2" />
              Copy Address
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            Only send {currency?.toUpperCase()} to this address. Sending other cryptocurrencies may result in permanent loss.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}