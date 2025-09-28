import { ArrowRight, Wallet, Shield, Zap, TwitterIcon, GithubIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Link from "next/link";


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

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <main className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
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
                <Link href={'/account'}><Button
                  className="wallet-button-primary text-lg px-8 py-4 h-auto"
                >
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button></Link>
                <Button variant="outline" className="text-lg px-8 py-4 h-auto">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="animate-slide-up">
              <Image
                  src="/crypto-hero.jpg"
                  alt="Crypto Wallet Hero"
                  width={600} // required
                  height={400} // required
                  className="w-full h-auto rounded-2xl shadow-2xl glow-primary"
                />
            </div>
          </div>

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
        <p className="mt-4">&copy; {2025} CryptoWallet. All Rights Reserved.</p>
      </footer>
    </div>
  );
}