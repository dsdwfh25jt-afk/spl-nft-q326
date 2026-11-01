import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { fetchAsset, transfer } from '@metaplex-foundation/mpl-core'
import { mplCore } from '@metaplex-foundation/mpl-core'
import { publicKey } from '@metaplex-foundation/umi'
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from "/mnt/d/GuruPT8bAvseqUTpTEXYs913YgAd3LqvTxK3VPMdJ8u5.json";
import {
  createSignerFromKeypair,
  generateSigner,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { fetchAddressesForLookupTables } from '@solana/kit';

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

umi.use(mplCore());

(async () => {
  try {
    const assetAdd =  publicKey("GE7972c2gLWSuHLJAzcvcdByWiFUWkV3TAqxrAsM4CXT");
    const owneradd =  publicKey("3SPfDgQPytk3T1cmTW79imq8idPbUhKPBf62hNvsuykB");

    const asset = await fetchAsset (umi, assetAdd);
    const tx = await transfer(umi, {
    asset: asset,
    newOwner: owneradd,
}).sendAndConfirm(umi)

// console.log('Asset transferred:', tx.signature)


    const signature = base58.deserialize(tx.signature)[0];

    console.log(`signature ${signature} , asset : ${asset.publicKey}`);
  } catch (e) {
    console.log(`errior ${e}`);
  }
})();
