import bip39 from 'bip39';
import * as ethers from 'ethers';
import bitcoin from 'bitcoinjs-lib';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import bs58 from 'bs58';


async function deriveEthereumWallet(seed) {
    const ethPath = "m/44'/60'/0'/0/0";
    const root = ethers.HDNodeWallet.fromSeed(seed);
    const ethnode = root.derivePath(ethPath);

    console.log("Ethereum Wallet: ");
    console.log("Address:", ethnode.address);
    console.log("Private Key:", ethnode.privateKey);
    console.log("Public Key:", ethnode.publicKey, "\n");
}


async function deriveBitcoinWallet(seed) {
    const btcPath = "m/44'/0'/0'/0/0";
    const bip32 = BIP32Factory(ecc);
    const root = bip32.fromSeed(seed);      // master key
    const child = root.derivePath(btcPath);

    const { address } = bitcoin.payments.p2pkh({ pubkey: Buffer.from(child.publicKey) });
    const pubkey = Buffer.from(child.publicKey).toString("hex");

    console.log("Bitcoin Wallet: ");
    console.log("Address: ", address);
    console.log("Private Key: ", child.toWIF());
    console.log("Public Key: ",pubkey, "\n");
}


async function deriveSolanaWallet(seed) {
    const solPath = "m/44'/501'/0'/0'";
    const derivedSeed = derivePath(solPath, seed.toString("hex")).key;
    const keypair = Keypair.fromSeed(derivedSeed);

    console.log("Solana Wallet: ");
    console.log("Address: ", keypair.publicKey.toBase58());
    console.log("Private Key: ", bs58.encode(keypair.secretKey));
}


async function main() {
    // Generate mnemonic
    const mnemonic = bip39.generateMnemonic(128);
    console.log("12-word Mnemonic: ");
    console.log(mnemonic, "\n");

    // Derive seed
    const seed = await bip39.mnemonicToSeed(mnemonic);

    // Generate wallets
    await deriveEthereumWallet(seed);
    await deriveBitcoinWallet(seed);
    await deriveSolanaWallet(seed);

    console.log("\nWallet Generation Completed");
}

main().catch(console.error);
