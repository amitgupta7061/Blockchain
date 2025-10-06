"use client";

import { useRouter } from 'next/navigation';
import React, { useState, FC, Dispatch, SetStateAction } from 'react';

// --- SVG Icon Component ---
const WalletIcon: FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 12V8H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
    <path d="M4 6v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// --- Type for Mode Setter ---
type SetMode = Dispatch<SetStateAction<'select' | 'create' | 'login'>>;

// --- Props for Screen Components ---
interface ScreenProps {
  setMode: SetMode;
}

// --- Create Wallet Screen Component ---
const CreateWalletScreen: FC<ScreenProps> = ({ setMode }) => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/createaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      console.log("Response:", data);


      if(res.ok){
        localStorage.setItem("wallet", JSON.stringify(data));
        router.push('/dashboard');
      }

    } catch (err) {
      console.error("Error creating account:", err);
    }
  };

  return (
    <div className="w-full  animate-fade-in">
      <button
        onClick={() => setMode('select')}
        className="absolute top-4 left-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back
      </button>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Create a New Wallet</h2>
        <p className="text-muted-foreground mt-2">Choose a username for your new wallet.</p>
      </div>
      <form onSubmit={handleCreate} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-muted-foreground mb-2">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., satoshi_nakamoto"
            className="w-full px-4 py-3 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-transform transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          Create Wallet
        </button>
      </form>
    </div>
  );
};

// --- Login with Seed Phrase Screen Component ---
const LoginWalletScreen: FC<ScreenProps> = ({ setMode }) => {
  const [seedPhrase, setSeedPhrase] = useState<string[]>(Array(12).fill(''));

  const handleInputChange = (index: number, value: string) => {
    const newSeedPhrase = [...seedPhrase];
    // Allow pasting the full phrase into the first input
    const words = value.trim().split(/\s+/);
    if (words.length === 12 && index === 0) {
        setSeedPhrase(words);
    } else {
        newSeedPhrase[index] = value;
        setSeedPhrase(newSeedPhrase);
    }
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const phrase = seedPhrase.join(" ").trim();

      const res = await fetch("/api/importaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seedPhrase: phrase }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to import account");
      }

      console.log("Imported wallet:", data);

      localStorage.setItem("wallet", JSON.stringify(data));
      window.location.href = "/dashboard";

    } catch (err: any) {
      console.error("Error importing account:", err.message);
      alert(err.message || "Something went wrong while importing");
    }
  };


  return (
    <div className="w-full animate-fade-in">
      <button
        onClick={() => setMode('select')}
        className="absolute top-4 left-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back
      </button>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Import Your Wallet</h2>
        <p className="text-muted-foreground mt-2">Enter your 12-word secret recovery phrase.</p>
      </div>
      <form onSubmit={handleImport} className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {seedPhrase.map((word, index) => (
            <div key={index} className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{index + 1}.</span>
              <input
                type="text"
                value={word}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="w-full pl-6 pr-2 py-3 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-transform transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          Import Wallet
        </button>
      </form>
    </div>
  );
};


// --- Initial Selection Screen Component ---
const SelectionScreen: FC<ScreenProps> = ({ setMode }) => {
  return (
    <div className="text-center animate-fade-in">
        <div className="flex justify-center items-center mb-6">
            <WalletIcon className="w-16 h-16 text-primary" />
        </div>
      <h1 className="text-3xl font-bold text-foreground mb-2">CryptoWallet</h1>
      <p className="text-muted-foreground mb-10">Your secure gateway to the decentralized world.</p>
      <div className="space-y-4">
        <button
          onClick={() => setMode('create')}
          className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-transform transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          Create a New Wallet
        </button>
        <button
          onClick={() => setMode('login')}
          className="w-full py-3 bg-secondary text-secondary-foreground font-semibold rounded-md hover:bg-secondary/80 transition-transform transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          I Already Have a Wallet
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [mode, setMode] = useState<'select' | 'create' | 'login'>('select');

  const renderContent = () => {
    switch (mode) {
      case 'create':
        return <CreateWalletScreen setMode={setMode} />;
      case 'login':
        return <LoginWalletScreen setMode={setMode} />;
      case 'select':
      default:
        return <SelectionScreen setMode={setMode} />;
    }
  };

  return (
    <div className="bg-background h-[90vh] w-full flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-card text-card-foreground p-8 rounded-xl border border-border shadow-2xl shadow-primary/5 relative">
        {renderContent()}
      </div>
    </div>
  );
}