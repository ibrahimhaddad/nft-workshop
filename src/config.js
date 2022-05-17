// Follow the comments inside the file to know what perimeters you need to update

const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);
const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "INSERT NAME OF YOUR COLLECTION";
const description = "INSERT DESCRIPTION OF YOUR COLLECTION.";
const baseUri = "ipfs://NewUriToReplace"; // Keep as is - to be updated automatically 

// The following seciton is irrelevant UNLESS you plan to post your NFTs on Solana. 
// If you are posting on OpenSea you can ignore it. 

const solanaMetadata = {
  symbol: "INSERT SYMBOL",
  seller_fee_basis_points: 500, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "INSERT WEB SITE URL",
  creators: [
    {
      address: "INSERT YOUR WALLET ADDRESS FOR ROYALTIES PAYMENT",
      share: 100, // 100 points = 1%
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automaticallY
// These layes here need to corresponds to the layers in your layers/ folder 
// You can also have a blank layer to indicate the generation of images without any 
// images from a specific layer/ folder

const layerConfigurations = [
  {
    growEditionSizeTo: 1000,  // You can grow this to 10,000 assuming you have enough traits to generate that mamy images
    layersOrder: [
      { name: "Background" },
      { name: "Expression"},
      { name: "Face" },
      { name: "Name Tag" },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 1500,
  height: 1500,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {
  external_url: "INSERT URL OF YOUR COLLECTION'S WEBSITE"
};


// This is used to adjust %s of images generated. You can mamipulate 
// that in the file name of each layer. Example: SadEyes#10.png

const rarityDelimiter = "#"; 

// Change to total number of images generated = use 10,000

const uniqueDnaTorrance = 1000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};
