import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";

import wallet from "/mnt/d/GuruPT8bAvseqUTpTEXYs913YgAd3LqvTxK3VPMdJ8u5.json";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(
  irysUploader({
    address: "https://devnet.irys.xyz/",
  }),
);

umi.use(signerIdentity(signer));

(async () => {
  try {
    const image = await readFile("/mnt/d/Q3_26_Builder/spl-nft-q326/src/nft/WhatsApp Image 2026-10-30 at 7.33.50 PM.jpeg");
 
    const file = createGenericFile(image, "turbin3.jpg", {contentType: "image/jpg",});

    const [myUri] = await umi.uploader.upload([file]);
    console.log("Your image URI: ", myUri);  
  } catch (error) {
    console.log(error);
  }
})();
