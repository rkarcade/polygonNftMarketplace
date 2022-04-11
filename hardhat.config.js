require("@nomiclabs/hardhat-waffle");

const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString()
const projectId ="5D7gSuNctx3kMc7tPWeO-UiUvi98UgCl"




module.exports = {
  defaultNetwork:"mumbai",
  networks: {
      hardhat:{
        chainId: 31337
      },
      mumbai: {
        url: `https://polygon-mumbai.g.alchemy.com/v2/${projectId}`,
        accounts: [privateKey]
      },
      mainnet: {
        url : `https://polygon-mainnet.g.alchemy.com/v2/${projectId}`,
        accounts : [privateKey]
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
      accounts: [privateKey]
    }

  },
  solidity: "0.8.4",
};
