import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {

  return (
    <div className="bg-background">
      {/* Header */}
      <header className="p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href={'/'} className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            CryptoWallet
          </Link>
          <ThemeToggle />
        </div>
      </header>
    </div>
  );
}