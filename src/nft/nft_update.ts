import {createUmi} from "@metaplex-foundation/umi-bundle-defaults";
import wallet from  "/mnt/d/GuruPT8bAvseqUTpTEXYs913YgAd3LqvTxK3VPMdJ8u5.json";
import {
  createSignerFromKeypair,
  generateSigner,
  signerIdentity,
  publicKey,
  keypairIdentity,   
} from "@metaplex-foundation/umi";
import { create, mplCore } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

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
umi.use(mplCore());

(async () => {
    try {
        const Updatedmetadata = {
             
            "name": "Gaurav #1",
            "symbol": "GRV",
            "description": "Sorry for late Lol",
        }
        const guir = await umi.uploader.uploadJson(Updatedmetadata);
        console.log("updated metadata uri : ", guir);

    } catch(e) {
        console.log("error",e);
    }
})();