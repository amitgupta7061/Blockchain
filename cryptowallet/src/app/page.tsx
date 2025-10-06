"use client"; // Required for using React hooks (useState)

import { ArrowRight, Wallet, Shield, Zap, TwitterIcon, GithubIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; // Added for state management
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
// Imports for the new Select dropdown
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";


export default function Welcome() {
  const features = [
    {
      icon: Wallet,
      title: "Multi-Currency Support",
      description: "Support for Bitcoin, Ethereum, and Solana in one secure wallet"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Advanced encryption and security protocols to keep your assets safe"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Quick transactions and real-time balance updates across all networks"
    }
  ];

  // --- START: State variables for the balance checker ---
  const [address, setAddress] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("ETH"); // Default coin
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState("");
  // --- END: State variables ---

  // --- START: API call handler function ---
  const handleCheckBalance = async () => {
    // Basic validation
    if (!address.trim()) {
      setError("Please enter a wallet address.");
      setBalance("");
      return;
    }

    setLoading(true);
    setError("");
    setBalance("");

    // Simulate an API call with a 1.5-second delay
    try {

      // const url = 'https://go.getblock.io/<ACCESS-TOKEN>/';
      // const headers = { 'Content-Type': 'application/json' };

      // // Prepare the request data
      // const data = {
      //   jsonrpc: '2.0',
      //   method: 'eth_getBalance',
      //   params: [
      //     '0xfe3b557e8fb62b89f4916b721be55ceb828dbd73',
      //     'latest'
      //   ],
      //   id: 'getblock.io'
      // }

      // const data = fetch.post(url, data, { headers })
      


      const mockBalance = (Math.random() * 10).toFixed(4);
      setBalance(`${mockBalance} ${selectedCoin}`);

    } catch (e) {
      console.log(e);
      setError("Failed to fetch balance. Please try again later.",);
    } finally {
      setLoading(false);
    }
  };
  // --- END: API call handler function ---


  return (
    <div className="min-h-screen bg-background">
      <main className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Your Gateway to the{" "}
                  <span className="gradient-primary bg-clip-text text-transparent">
                    Crypto World
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Securely manage Bitcoin, Ethereum, and Solana with our intuitive
                  wallet. Send, receive, and track your digital assets with ease.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href={'/account'}>
                  <Button className="wallet-button-primary text-lg px-8 py-4 h-auto">
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" className="text-lg px-8 py-4 h-auto">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="animate-slide-up">
              <Image
                src="/crypto-hero.jpg"
                alt="Crypto Wallet Hero"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl shadow-2xl glow-primary"
              />
            </div>
          </div>

          {/* ===== START: Interactive Balance Check Section ===== */}
          <section className="mt-24 animate-fade-in">
            <div className="max-w-4xl mx-auto text-center p-8 bg-card rounded-2xl shadow-lg border">
              <h2 className="text-3xl font-bold mb-4">
                Try It Now
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Check any public wallet balance without creating an account.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
                {/* Coin Selector Dropdown */}
                <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                  <SelectTrigger className="h-12 w-full sm:w-[150px] text-base">
                    <SelectValue placeholder="Select Coin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BTC">Bitcoin</SelectItem>
                    <SelectItem value="ETH">Ethereum</SelectItem>
                    <SelectItem value="SOL">Solana</SelectItem>
                  </SelectContent>
                </Select>

                {/* Address Input */}
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter a wallet address..."
                  className="h-12 text-base flex-grow"
                  aria-label="Wallet Address"
                />

                {/* Submit Button */}
                <Button
                  onClick={handleCheckBalance}
                  disabled={loading}
                  className="wallet-button-primary text-lg px-8 py-4 h-auto w-full sm:w-auto"
                >
                  {loading ? 'Checking...' : 'Check Balance'}
                </Button>
              </div>

              {/* API Response Area */}
              <div className="mt-6 text-center min-h-[40px] flex items-center justify-center">
                {error && <p className="text-red-500 font-medium animate-fade-in">{error}</p>}
                {balance && (
                  <p className="text-xl font-semibold animate-fade-in">
                    ✅ Balance: <span className="gradient-primary bg-clip-text text-transparent">{balance}</span>
                  </p>
                )}
              </div>
            </div>
          </section>
          {/* ===== END: Interactive Balance Check Section ===== */}


          {/* Features Section */}
          <section className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose CryptoWallet?
              </h2>
              <p className="text-lg text-muted-foreground">
                Built for both beginners and experts in the crypto space
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="crypto-card-elevated text-center animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="w-full text-center p-4 text-muted-foreground text-sm">
        <div className="flex justify-center items-center space-x-6 mb-2">
          <a href="#" aria-label="Twitter" className="hover:text-foreground transition-colors"><TwitterIcon className="w-5 h-5" /></a>
          <a href="#" aria-label="Github" className="hover:text-foreground transition-colors"><GithubIcon className="w-5 h-5" /></a>
          <a href="#" className="hover:text-foreground transition-colors text-xs font-semibold uppercase tracking-wider">Contact Us</a>
        </div>
        <p className="mt-4">&copy; 2025 CryptoWallet. All Rights Reserved.</p>
      </footer>
    </div>
  );
}