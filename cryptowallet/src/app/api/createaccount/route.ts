import * as bip39 from 'bip39';
import { prisma } from "@/src/lib/prisma";
import { deriveBitcoinWallet, deriveEthereumWallet, deriveSolanaWallet } from "@/src/lib/wallet";
import { NextResponse } from "next/server";

// --- API Route ---
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    }

    const mnemonic = bip39.generateMnemonic(128);
    const seed = await bip39.mnemonicToSeed(mnemonic);

    const [eth, btc, sol] = await Promise.all([
      deriveEthereumWallet(seed),
      deriveBitcoinWallet(seed),
      deriveSolanaWallet(seed),
    ]);

    if (!btc.address) {
        throw new Error("Failed to generate Bitcoin address");
    }
    // Create user in DB with separate public keys and addresses
    const newUser = await prisma.user.create({
      data: {
        username,

        ethKey: eth.publicKey,
        btcKey: btc.publicKey,
        solKey: sol.publicKey,

        ethadd: eth.address,
        btcadd: btc.address,
        soladd: sol.address,
      },
    });

    return NextResponse.json(
      {
        user: newUser,
        privateKeys: {
          mnemonic,
          eth: eth.privateKey,
          btc: btc.privateKey,
          sol: sol.privateKey,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Wallet creation failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
