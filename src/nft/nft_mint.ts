import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from "/mnt/d/GuruPT8bAvseqUTpTEXYs913YgAd3LqvTxK3VPMdJ8u5.json";
import {
  createSignerFromKeypair,
  generateSigner,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { create, mplCore } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

umi.use(mplCore());

(async () => {
  try {
    const metadataUri =
      "https://gateway.irys.xyz/GpiHuMMS6EiHwjf4D61xeiXA6cDUk4w1VbKZy8EFjXs8";
    const asset = generateSigner(umi);

    //add you nft name and metadata uri
    const tx = await create(umi, {
      asset: asset,
      name: "nate", 
      uri: metadataUri,
    }).sendAndConfirm(umi);

    const signature = base58.deserialize(tx.signature)[0];

    console.log(`signature ${signature} , asset : ${asset.publicKey}`);
  } catch (e) {
    console.log(`errior ${e}`);
  }
})();
