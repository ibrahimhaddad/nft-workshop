// The only change you need to do in this mind is adding your API code 
// --> Authorization: "INSERT YOUR API CODE FROM NFTPORT"


const FormData = require("form-data");
const fetch = require("node-fetch");
const path = require ("path");
const basePath = process.cwd();
const fs = require("fs");


async function run() {
    const delayBetweenImages = 500;

    function delay(t) {
        return new Promise(resolve => setTimeout(resolve, t));
    }

    const files = fs.readdirSync(`${basePath}/build/images`);
    for (const file of files) {
        const formData = new FormData();
        const fullPath = `${basePath}/build/images/${file}`;
        const fileStream = fs.createReadStream(fullPath);
        
        // log any read errors
        fileStream.on('error', err => {
            console.log(`Error reading ${fullPath}`, err);
        });
        formData.append("file", fileStream);

        let url = "https://api.nftport.xyz/v0/files";

        let options = {
            method: "POST",
            headers: {             
             Authorization: "INSERT YOUR API CODE FROM NFTPORT",
            },
            body: formData
        };

        await fetch(url, options)
            .then((res) => res.json())
            .then((json) => {
                console.log(`parsing ${json.file_name}`);
                const fileName = path.parse(json.file_name).name;
                console.log(`   filename = ${fileName}`);
                let rawdata = fs.readFileSync(`${basePath}/build/json/${fileName}.json`);
                let metaData = JSON.parse(rawdata);

                metaData.file_url = json.ipfs_url;

                fs.writeFileSync(`${basePath}/build/json/${fileName}.json`, JSON.stringify(metaData, null, 2));

                console.log(`${json.file_name} uploaded & ${fileName}.json updated!`);
            }).catch((err) => console.error("error:", err));

        // Due to limits on API call, we add a delay. You can experiment with how long this delay is and/or
        // commenting it out entirely as it may not be needed. Check your user settings on NFTPort documentation
        // to learn more for your specific account type
        await delay(100);
    }
}

run().then(result => {
    console.log("done");
}).catch(err => {
    console.log(err);
});


