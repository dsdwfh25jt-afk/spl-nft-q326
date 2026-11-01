import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from "/mnt/d/Q3_26_Builder/spl-nft-q326/second-wallet.json";
import {
  createSignerFromKeypair,
  generateSigner,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { create, mplCore, burn, fetchAsset } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

umi.use(mplCore());

const assetAddress = publicKey("GE7972c2gLWSuHLJAzcvcdByWiFUWkV3TAqxrAsM4CXT");


(async () => {
  try {
    const asset = await fetchAsset (umi, assetAddress);

    const tx = await burn(umi, {
        asset: asset,
    }).sendAndConfirm(umi)

    const signature = base58.deserialize(tx.signature)[0];

    console.log(`signature ${signature}`);
  } catch (e) {
    console.log(`errior ${e}`);
  }
})();
