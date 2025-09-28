import { ThemeToggle } from "./ThemeToggle";

export default function Header() {

  return (
    <div className="bg-background">
      {/* Header */}
      <header className="p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            CryptoWallet
          </div>
          <ThemeToggle />
        </div>
      </header>
    </div>
  );
}