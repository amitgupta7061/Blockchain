"use client";
import { MarsStrokeIcon, RadioReceiver, SendHorizonal } from 'lucide-react';
import Image from 'next/image';
// src/components/Dashboard.tsx
import React, { useState, useMemo, useCallback } from 'react';

// --- Utility Components (Simplified placeholders) ---
const Button = ({ children, className = '', onClick, variant = 'default' }: { children: React.ReactNode, className?: string, onClick?: () => void, variant?: 'default' | 'primary' | 'outline' }) => {
    let baseStyles = 'px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]';
    if (variant === 'primary') baseStyles += ' bg-primary text-primary-foreground hover:bg-primary/90';
    else if (variant === 'outline') baseStyles += ' border border-input bg-background hover:bg-accent hover:text-accent-foreground';
    else baseStyles += ' bg-secondary text-secondary-foreground hover:bg-secondary/90';
    return <button onClick={onClick} className={`${baseStyles} ${className}`}>{children}</button>;
};

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`rounded-xl border bg-card text-card-foreground p-6 shadow-xl ${className}`}>
        {children}
    </div>
);

const Separator = ({ className = '' }: { className?: string }) => (
    <div className={`h-px bg-border my-4 ${className}`} />
);

// --- New AddressDisplay Component for Sidebar ---

interface AddressDisplayProps {
    coin: 'BTC' | 'ETH' | 'SOL';
    address: string;
    colorClass: string;
}

const AddressDisplay: React.FC<AddressDisplayProps> = ({ coin, address, colorClass }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(address).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }, [address]);

    // Simple icons placeholder: Replace with actual SVG or image components
    const CoinIcon = ({ ticker }: { ticker: 'BTC' | 'ETH' | 'SOL' }) => {
        let iconText = '';
        if (ticker === 'BTC') iconText = '₿';
        else if (ticker === 'ETH') iconText = 'Ξ';
        else if (ticker === 'SOL') iconText = '◎';

        return (
            <div className={`h-4 w-4 rounded-full flex items-center justify-center font-bold text-xs ${colorClass}`}>
                {iconText}
            </div>
        );
    };

    return (
        <div className="flex items-center space-x-2 py-1">
            <CoinIcon ticker={coin} />
            <p className="text-xs font-semibold w-1/4">{coin}</p>
            <code 
                className="text-xs font-mono truncate flex-1 cursor-pointer" 
                title={address}
                onClick={handleCopy} // Allow clicking the address to copy too
            >
                {address.slice(0, 6)}...{address.slice(-4)}
            </code>
            <button
                onClick={handleCopy}
                className={`text-xs p-1 rounded transition-colors ${isCopied ? 'bg-green-500 text-white' : 'hover:bg-sidebar-accent/50 text-sidebar-foreground'}`}
                title={isCopied ? 'Copied!' : 'Copy Address'}
            >
                {isCopied ? '✅' : '📋'}
            </button>
        </div>
    );
};


// --- Mock Data Structure (Re-using original definitions) ---

interface UserKey {
    id: number;
    username: string;
    createdAt: string;
    btcKey?: string;
    btcadd?: string;
    ethKey?: string;
    ethadd?: string;
    solKey?: string;
    soladd?: string;
}

interface UserPrivateKeys {
    seedPhrase: string;
    btc: string; 
    eth: string;
    sol: string;
}

interface BackendData {
    user: UserKey;
    privateKeys: UserPrivateKeys;
}

interface CoinInfo {
    ticker: 'BTC' | 'ETH' | 'SOL';
    name: string;
    balance: number;
    usdPrice: number; 
    colorClass: 'text-bitcoin' | 'text-ethereum' | 'text-solana';
    address: string;
}

// Mock Data derived from the JSON and with added balances/prices
const MOCK_BACKEND_DATA: BackendData = {
    user: {
        id: 5,
        username: "user_c0463B",
        createdAt: "2025-10-05T18:06:06.099Z",
        btcKey: "020c9859cd86a103ebf0a3109089396327803b21bbf48631b951a66fc54e04fec",
        btcadd: "12rxUiwQdqdYkxMQTypFYAcEPmJ5DGFVYq",
        ethKey: "0x024d20e8ede0a0c8a9d1e75e954a8f70aceaf5cf452bba9d878e920eb7de8f2acd",
        ethadd: "0xc04638722fc88CD360830dd15AD48EF80f2d8BFb",
        solKey: "3e8Q2IL29pm1WaFU58TLQkifiEptYnbvT6Eou5JVCiwV",
        soladd: "3e8Q2IL29pm1WaFU58TLQkifiEptYnbvT6Eou5JVCiwV"
    },
    privateKeys: {
        seedPhrase: "split salute people raccoon fortune velvet oxygen little imitate tide oil large",
        btc: "L1eTWAqSEzumjjYUGHhew3C882FhVB4J2r2tcm1cyENKV1LR6r5",
        eth: "0xa8215335f5b525631edadf87eabd624710723ebd95ac0971a7b8cec8b6a0c596",
        sol: "2witDSpN2JjFdwZCqMCwfQBYXU56Q9HhndsTHKymweT89WRXWVNY6B8BNjHtRQV2reTYZajS7MVnifitonUkQLG7St"
    }
};


const Dashboard: React.FC = () => {
    const [currentView, setCurrentView] = useState<'balance' | 'send' | 'receive'>('balance');
    const user = MOCK_BACKEND_DATA.user;

    const coinData: CoinInfo[] = useMemo(() => [
        {
            ticker: 'BTC',
            name: 'Bitcoin',
            balance: 0.850021, // Mock balance
            usdPrice: 65000.00, // Mock price
            colorClass: 'text-bitcoin',
            address: user.btcadd || 'N/A'
        },
        {
            ticker: 'ETH',
            name: 'Ethereum',
            balance: 5.10543, // Mock balance
            usdPrice: 3800.00, // Mock price
            colorClass: 'text-ethereum',
            address: user.ethadd || 'N/A'
        },
        {
            ticker: 'SOL',
            name: 'Solana',
            balance: 1500.89, // Mock balance
            usdPrice: 180.00, // Mock price
            colorClass: 'text-solana',
            address: user.soladd || 'N/A'
        },
    ], [user]);

    const totalBalanceUSD = useMemo(() => {
        return coinData.reduce((sum, coin) => sum + (coin.balance * coin.usdPrice), 0);
    }, [coinData]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const formatBalance = (amount: number) => {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 }).format(amount);
    };

    const renderMainContent = () => {
        // (Content remains the same as previous version for Send/Receive/Balance views)
        switch (currentView) {
            case 'send':
                return (
                    <Card className="animate-slide-up">
                        <h2 className="text-2xl font-bold mb-4">💸 Send Crypto</h2>
                        <p className="text-muted-foreground">This is a placeholder for the Send transaction form.</p>
                        <div className="mt-6 flex flex-col space-y-3">
                            {/* Input fields for recipient address, amount, coin selection */}
                            <div className="h-10 w-full bg-input rounded-md flex items-center p-3 text-sm">Recipient Address...</div>
                            <div className="h-10 w-full bg-input rounded-md flex items-center p-3 text-sm">Amount...</div>
                            <Button variant="primary" className="w-full mt-4">Confirm Send</Button>
                        </div>
                    </Card>
                );
            case 'receive':
                return (
                    <Card className="animate-slide-up">
                        <h2 className="text-2xl font-bold mb-4">📥 Receive Crypto</h2>
                        <p className="text-muted-foreground mb-4">Select an asset to view its public address and QR code.</p>
                        <div className="space-y-3">
                            {coinData.map(coin => (
                                <div key={coin.ticker} className="p-3 border rounded-lg bg-accent/20">
                                    <p className="font-semibold">{coin.name} Address:</p>
                                    <code className="break-all text-sm">{coin.address}</code>
                                    {/* Placeholder for QR Code  */}
                                </div>
                            ))}
                        </div>
                    </Card>
                );
            case 'balance':
            default:
                return (
                    <div className="space-y-6">
                        {/* Total Balance Card */}
                        <Card className="animate-fade-in bg-gradient-to-r from-primary/10 to-background">
                            <h1 className="text-2xl font-semibold text-muted-foreground">Total Portfolio Balance</h1>
                            <p className="text-5xl font-extrabold my-2 tracking-tight">
                                {formatCurrency(totalBalanceUSD)}
                            </p>
                            <div className="flex items-center space-x-2 mt-2 text-sm text-green-500">
                                {/* Mock change for flair */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                <span>+5.12% (+$1,234.56) today</span>
                            </div>
                        </Card>

                        {/* Coin List */}
                        <Card className="animate-slide-up">
                            <h2 className="text-2xl font-bold mb-4">Asset Balances & Prices</h2>
                            <div className="space-y-4">
                                {coinData.map((coin) => (
                                    <div key={coin.ticker} className="flex items-center justify-between p-3 border-b border-border/50 last:border-b-0">
                                        <div className="flex items-center space-x-3">
                                            {/* Coin Icon Placeholder */}
                                            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-lg ${coin.colorClass} border-2 border-current`}>
                                                {coin.ticker[0]}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{coin.name} ({coin.ticker})</p>
                                                <p className="text-xs text-muted-foreground">Price: <span className="font-medium text-foreground">{formatCurrency(coin.usdPrice)}</span></p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">{formatBalance(coin.balance)}</p>
                                            <p className="text-sm text-muted-foreground">{formatCurrency(coin.balance * coin.usdPrice)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Quick Actions Card */}
                        <Card className="animate-slide-up">
                            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <Button onClick={() => setCurrentView('send')} className="flex flex-col items-center py-4 bg-primary/20 text-primary hover:bg-primary/30">
                                    <SendHorizonal className="text-2xl mb-1"/> Send
                                </Button>
                                <Button onClick={() => setCurrentView('receive')} className="flex flex-col items-center py-4 bg-secondary/20 text-secondary-foreground hover:bg-secondary/30">
                                    <RadioReceiver className="text-2xl mb-1" /> Receive
                                </Button>
                                <Button className="flex flex-col items-center py-4 bg-accent/20 text-accent-foreground hover:bg-accent/30">
                                    <MarsStrokeIcon className="text-2xl mb-1">📈</MarsStrokeIcon> Trade
                                </Button>
                            </div>
                        </Card>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar (Updated Section) */}
            <aside className="w-full md:w-64 text-sidebar-foreground border-r border-sidebar-border p-6 hidden md:block">
                <div className='w-full flex justify-center pb-2'>
                    <Image alt='logo' src={'/logo-with-halo.png'} height={50} width={100}></Image>
                </div>
                <nav className="space-y-4">
                    {/* Navigation Links */}
                    <button
                        onClick={() => setCurrentView('balance')}
                        className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-colors ${currentView === 'balance' ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md' : 'hover:bg-sidebar-accent/50 text-sidebar-foreground'}`}
                    >
                        <span>🏠</span>
                        <span className='font-medium'>Dashboard</span>
                    </button>
                    <button
                        onClick={() => setCurrentView('send')}
                        className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-colors ${currentView === 'send' ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md' : 'hover:bg-sidebar-accent/50 text-sidebar-foreground'}`}
                    >
                        <span>💸</span>
                        <span className='font-medium'>Send Funds</span>
                    </button>
                    <button
                        onClick={() => setCurrentView('receive')}
                        className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-colors ${currentView === 'receive' ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md' : 'hover:bg-sidebar-accent/50 text-sidebar-foreground'}`}
                    >
                        <span>📥</span>
                        <span className='font-medium'>Receive Funds</span>
                    </button>

                    <Separator className="bg-sidebar-border" />
                    
                    {/* User Addresses Section (Enhanced) */}
                    <div className="text-sm font-semibold text-sidebar-accent mb-3">My Public Addresses</div>
                    
                    <div className="space-y-1 bg-sidebar-accent/10 p-3 rounded-lg border border-sidebar-accent/20">
                        <AddressDisplay 
                            coin="BTC" 
                            address={user.btcadd || 'N/A'} 
                            colorClass="text-bitcoin" 
                        />
                        <AddressDisplay 
                            coin="ETH" 
                            address={user.ethadd || 'N/A'} 
                            colorClass="text-ethereum" 
                        />
                        <AddressDisplay 
                            coin="SOL" 
                            address={user.soladd || 'N/A'} 
                            colorClass="text-solana" 
                        />
                    </div>
                    
                    <Separator className="bg-sidebar-border" />
                    
                    <div className="text-xs space-y-2">
                        <p className='truncate' title={user.username}>User ID: <span className='font-mono text-sidebar-accent'>{user.username}</span></p>
                    </div>

                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-10 overflow-auto">
                {/* Mobile Navigation */}
                <div className="md:hidden mb-6">
                    <select
                        value={currentView}
                        onChange={(e) => setCurrentView(e.target.value as 'balance' | 'send' | 'receive')}
                        className="w-full p-3 rounded-lg border bg-input text-foreground"
                    >
                        <option value="balance">🏠 Dashboard</option>
                        <option value="send">💸 Send Funds</option>
                        <option value="receive">📥 Receive Funds</option>
                    </select>
                </div>

                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        {currentView === 'balance' ? 'My Crypto Dashboard' : currentView === 'send' ? 'Send Transaction' : 'Receive Funds'}
                    </h1>
                    <p className="text-lg text-muted-foreground mt-1">Welcome back, {user.username}. Manage your assets.</p>
                </header>

                {renderMainContent()}
                
            </main>
        </div>
    );
};

export default Dashboard;