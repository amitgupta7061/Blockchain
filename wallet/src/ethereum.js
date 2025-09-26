import { ethers } from 'ethers';

async function sendTransactionWithProvider(privatekey, to, amount){
    
    const provider = new ethers.JsonRpcProvider(`https://go.getblock.us/24f65887db4c44c899a1637bbaf3b52a`);

    const wallet = new ethers.Wallet(privatekey, provider);

    try {
        
        const tx = await wallet.sendTransaction({
            to: to,
            value : ethers.parseEther(amount)
        });
        console.log("Transaction Sent: ", tx.hash);

        // wait for receipt
        const receipt = await tx.wait();
        console.log("Transaction confirmed in block: ", receipt.blockNumber);

        return tx.hash;

    } catch (error) {
        console.log("Transaction failed: ", error);
        throw error;
    }
}


const privatekey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const to = "0xc0463B722fc8BcD360830dd15AD48Ef80F2d8BFb";
const amount = "0.0000000000001"


sendTransactionWithProvider(privatekey, to, amount);