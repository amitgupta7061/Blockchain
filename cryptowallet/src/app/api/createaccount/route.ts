import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import { BIP32Factory } from "bip32";
import * as ecc from "tiny-secp256k1";
import { ethers } from "ethers";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import bs58 from "bs58";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

const bip32 = BIP32Factory(ecc);

// --- Ethereum ---
async function deriveEthereumWallet(seed: Buffer) {
  const ethPath = "m/44'/60'/0'/0/0";
  const root = ethers.HDNodeWallet.fromSeed(seed); // ethers v6
  const ethNode = root.derivePath(ethPath);

  return {
    address: ethNode.address,        // Ethereum address
    publicKey: ethNode.publicKey,    // Ethereum public key (uncompressed hex)
    privateKey: ethNode.privateKey,  // Ethereum private key
  };
}

// --- Bitcoin ---
async function deriveBitcoinWallet(seed: Buffer) {
  const btcPath = "m/44'/0'/0'/0/0";
  const root = bip32.fromSeed(seed);
  const child = root.derivePath(btcPath);

  const pubkey = Buffer.from(child.publicKey);
  const { address } = bitcoin.payments.p2pkh({ pubkey });

  return {
    address,               // Bitcoin address (Base58)
    publicKey: pubkey.toString("hex"), // Bitcoin public key (hex)
    privateKey: child.toWIF(),         // Bitcoin private key
  };
}

// --- Solana ---
async function deriveSolanaWallet(seed: Buffer) {
  const solPath = "m/44'/501'/0'/0'";
  const derivedSeed = derivePath(solPath, seed.toString("hex")).key;
  const keypair = Keypair.fromSeed(derivedSeed);

  return {
    address: keypair.publicKey.toBase58(), // Solana address
    publicKey: keypair.publicKey.toBase58(),
    privateKey: bs58.encode(keypair.secretKey),
  };
}

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
