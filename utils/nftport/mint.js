// Update AUTH, CONTRACT_ADDRESS, MINT_TO_ADDRESS, and CHAIN 

const fetch = require("node-fetch");
const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require("fs");

// Change AUTH to your own API key 
const AUTH = 'INSERT YOUR API KEY'; 

// Change CONTRACT_ADDRESS to your own contract 
const CONTRACT_ADDRESS = 'INSERT YOUR CONTRACT ADDRESS';

// Change MINT_TO_ADDRESS to your own digital wallet
const MINT_TO_ADDRESS = 'INSERT YOUR WALLET ID';

// CHAIN is either rinkeby or polygon 
const CHAIN = 'polygon';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const ipfsMetas = JSON.parse(
  fs.readFileSync(`${basePath}/build/json/_ipfsMetas.json`)
);

fs.writeFileSync(`${basePath}/build/minted.json`, "");
const writter = fs.createWriteStream(`${basePath}/build/minted.json`, {
  flags: "a",
});

writter.write("[");
nftCount = ipfsMetas.length;
let nftCountMinusOne= nftCount -1;

async function run(idx) {
  await sleep(5000);
  console.log("### Run function started with nftCount = " + nftCount + " and with run(idx) => "+ idx +" ### ");
  const meta = ipfsMetas[idx];
  console.log("Logging meta name "+meta.name+" and idx ="+idx);
  let url = "https://api.nftport.xyz/v0/mints/customizable";

  const mintInfo = {
        chain: CHAIN,
        contract_address: CONTRACT_ADDRESS,
        metadata_uri: meta.metadata_uri,
        mint_to_address: MINT_TO_ADDRESS,
        token_id: meta.custom_fields.edition,
      }; 

  const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH,
      },
  body: JSON.stringify(mintInfo),
  };  

  await fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      writter.write(JSON.stringify(json, null, 2));
      console.log("Logging nftcount %%% " + nftCount + " %%%")
      nftCount--;

      if (nftCount === 0) {
        writter.write("]");
        writter.end();
        console.log ("### Minting process completed ###");
        return;
      } else {
        writter.write(",\n");
      }

      console.log(`Minted: ${json.transaction_external_url}`);
    })
    .catch((err) => console.error("error:" + err));

    if (idx < nftCountMinusOne) run(idx + 1);
};

run(0);