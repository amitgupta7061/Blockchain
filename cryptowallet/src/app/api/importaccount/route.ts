import { NextResponse } from "next/server";
import * as bip39 from "bip39";
import { deriveBitcoinWallet, deriveEthereumWallet, deriveSolanaWallet } from "@/src/lib/wallet";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const { seedPhrase } = await req.json();

    if (!seedPhrase || typeof seedPhrase !== "string") {
      return NextResponse.json(
        { success: false, error: "Seed phrase is required." },
        { status: 400 }
      );
    }

    // Validate mnemonic
    if (!bip39.validateMnemonic(seedPhrase.trim())) {
      return NextResponse.json(
        { success: false, error: "Invalid seed phrase." },
        { status: 400 }
      );
    }

    // Convert mnemonic → seed buffer
    const seed = await bip39.mnemonicToSeed(seedPhrase.trim());

    // Derive wallets
    const eth = await deriveEthereumWallet(seed);
    const btc = await deriveBitcoinWallet(seed);
    const sol = await deriveSolanaWallet(seed);

    if (!btc.address) {
      throw new Error("Failed to generate Bitcoin address");
    }

    // Step 1: Check if user already exists by ETH address
    let user = await prisma.user.findFirst({
      where: { ethadd: eth.address }, 
    });

    // Step 2: If not found, create a new user
    if (!user) {
      const uniqueUsername = "user_" + eth.address.slice(2, 8);

      user = await prisma.user.create({
        data: {
          username: uniqueUsername,
          ethKey: eth.publicKey,
          btcKey: btc.publicKey,
          solKey: sol.publicKey,
          ethadd: eth.address,
          btcadd: btc.address,
          soladd: sol.address,
        },
      });
    }

    // Step 3: Return user + private keys (optional: consider not returning seed in production!)
    return NextResponse.json(
      {
        user,
        privateKeys: {
          seedPhrase,
          eth: eth.privateKey,
          btc: btc.privateKey,
          sol: sol.privateKey,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Wallet import error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error." },
      { status: 500 }
    );
  }
}
