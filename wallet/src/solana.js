import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from 'bs58';

async function sendSolanaTransaction(privateKey, to, amount){
    const connection = new Connection(`https://go.getblock.us/63f113ce412f4b96816a319f5cb07d1b`);

    const fromkeypair = Keypair.fromSecretKey(bs58.decode(privateKey));
    const toPublicKey   = new PublicKey(to);

    try {
        const latestBlockHash = await connection.getLatestBlockhash();

        const transaction = new Transaction();
        transaction.recentBlockhash = latestBlockHash.blockhash;
        transaction.feePayer = fromkeypair.publicKey;

        transaction.add(
            SystemProgram.transfer({
                fromPubkey: fromkeypair.publicKey,
                toPubkey  : toPublicKey,
                lamports  : amount * LAMPORTS_PER_SOL
            })
        )

        transaction.sign(fromkeypair);

        const signature = await connection.sendRawTransaction(
            transaction.serialize(),
            {
                skipPreflight: false,
                preflightCommitment : 'confirmed'
            }
        )

        console.log("Transaction sent: ", signature);

        const confirmation = await connection.confirmTransaction({
            signature,
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight
        })

        if(confirmation.value.err){
            throw new Error(`Transaction failed: ${confirmation.value.err}`);
        }

        console.log("Transaction Confirmed!!");
        return signature;
    } catch (error) {
        console.log("Transaction failed: ", error);
        throw error;
    }
}


const privatekey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const to = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const amount = "0.000001"


sendSolanaTransaction(privatekey, to, amount);