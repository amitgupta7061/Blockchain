import * as bitcoin from "bitcoinjs-lib";
import { BIP32Factory } from "bip32";
import * as ecc from "tiny-secp256k1";
import { ethers } from "ethers";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import bs58 from "bs58";

const bip32 = BIP32Factory(ecc);

// --- Ethereum ---
export async function deriveEthereumWallet(seed: Buffer) {
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
export async function deriveBitcoinWallet(seed: Buffer) {
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
export async function deriveSolanaWallet(seed: Buffer) {
  const solPath = "m/44'/501'/0'/0'";
  const derivedSeed = derivePath(solPath, seed.toString("hex")).key;
  const keypair = Keypair.fromSeed(derivedSeed);

  return {
    address: keypair.publicKey.toBase58(), // Solana address
    publicKey: keypair.publicKey.toBase58(),
    privateKey: bs58.encode(keypair.secretKey),
  };
}
