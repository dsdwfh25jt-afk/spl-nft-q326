NFT stand for Non Fundgeble Token, which means we can not break token into parts and destribute
among users or wallets single nft single owner that's it. It can represent some tickets, cards,
passes or something else you can thing.

1) Image
first we have created image URI by uploading image on umi irys binded storage provider,
which helps us to track img without  storing whole img on chain.
using uri we point the img's data and off chain storage will store it,
and the uri will put on chain to store the data and secure the data on chain.

2) Metadata
Then we are uploading the meta data of the nft 
which looks like this 

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

here we are uploading name of the nft token, description of the token what it represents and what dev want to say about it
or what it is exactly for and so on, image which image will the nft will show, external links like website link or 
social media handle or something like that, attributes which will make each nft from the collection unique, and then properties
where the uri of nft and type of nft data containing and at the end category of nft where will shown whether it represents img, vdo
or something else.

3) Mint
After this we are minting the nft which means creating the nft or storing all the values on chain and paying for it,
for that we will create a transaction and in that transaction will send all the information.
transaction will contain the metadata , uri and type as asset of nft and then we'll sign the transaction and,
pay the fees. and then its on the devnet.

4) Update
then we are updating the metadata of the  nft as update authority 
we have updated the name, symbol and the description of the nft then sended the update metadata transaction on chain,,
with the signature

5) Transfer 
Transfering nft between wallets it is the most imp part, for which we have first fethced the asset from its public  key,
and then using that public key we have transfered the asset to the second wallet or the user, using the transfer intruction,
for that also we needed to make a transaction on chain and where the owner of the nft has signed the transaction and paid the
fees for that transaction

6) Burn
And at the end we burned the nft using burn intruction where the new owner has the authority to burn the nft and,
after burining the nft new owner will get the rent / deposite fees in owner account.