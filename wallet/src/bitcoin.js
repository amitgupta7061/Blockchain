import bitcoin from "bitcoinjs-lib";

async function sendBitcoinTransaction(privatekey, to, utxo, amount, fee) {
  try {
    const network = bitcoin.networks.bitcoin;
    const keyPair = bitcoin.ECPair.fromprivatekey(privatekey, network);

    const psbt = new bitcoin.Psbt({ network });

   
    psbt.addInput({
      hash: utxo.txid,  
      index: utxo.vout,
      nonWitnessUtxo: Buffer.from(utxo.rawTx, "hex"),
    });


    psbt.addOutput({
      address: to,
      value: amount,
    });

    const change = utxo.value - amountToSend - fee;
    if (change > 0) {
      psbt.addOutput({
        address: bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network }).address,
        value: change,
      });
    }

    psbt.signInput(0, keyPair);
    psbt.finalizeAllInputs();

    const rawTx = psbt.extractTransaction().toHex();

    console.log("Raw Transaction (hex):", rawTx);
    return rawTx;
  } catch (err) {
    console.error("Transaction failed:", err);
    throw err;
  }
}
