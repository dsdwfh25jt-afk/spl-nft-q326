import {
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import wallet from "/mnt/d/GuruPT8bAvseqUTpTEXYs913YgAd3LqvTxK3VPMdJ8u5.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
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

(async () => {
  try {
    const image =
      "https://gateway.irys.xyz/FdMCNz1AgJH3DghUQse5kq3NcB6DvnYmjcFidHYTkGkw";

    const metadata = {
  "name": "nate",
  "description": "something like ... ",
  image,
  "external_url": "https://example.com",
  "attributes": [
    {
      "trait_type": "color",
      "value": "green"
    },
    {
      "trait_type": "name",
      "value": "nate"
    }
  ],
  "properties": {
    "files": [
      {
        "uri": "https://gateway.irys.xyz/FdMCNz1AgJH3DghUQse5kq3NcB6DvnYmjcFidHYTkGkw",
        "type": "image/jpg"
      },
    ],
    "category": "image"
  }
}
    const myUri = await umi.uploader.uploadJson(metadata);
    console.log(`metadata uri: ${myUri} `);
  } catch (error) {
    console.log("error", error);
  }
})();
