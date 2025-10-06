"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    try {
      const walletData = localStorage.getItem("wallet");

      if (walletData) {
        const parsed = JSON.parse(walletData);
        if (parsed?.user?.username) {
          setUsername(parsed.user.username);
        }
      }
    } catch (error) {
      console.error("Error parsing wallet data:", error);
    }
  }, []);

  return (
    <div className="bg-background">
      <header className="p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold gradient-primary bg-clip-text text-transparent"
          >
            CryptoWallet
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {username && (
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
              >
                {username}
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
