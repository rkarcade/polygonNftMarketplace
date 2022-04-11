const { expect } = require("chai");
const { ethers } = require("hardhat");

//testing main functionalities

describe('NFTMarket', function(){
  it ("Should create and execute market sales", async function(){
    //deploy nftmarket contract
    const Market = await ethers.getContractFactory("NFTMarket")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    //deploy nft contract
    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    //get value of listing price
    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    //create value of auction price
    const auctionPrice = ethers.utils.parseUnits('100', 'ether')

    //create tokens , to create them , we have to interact with nft contract and pass in uri our token
    await nft.createToken("https://www.mytokenlocation.com")
    await nft.createToken("https://www.mytokenlocation2.com")

    //and list the two token on the actual market now that they created.
    await market.createMarketItem (nftContractAddress, 1, auctionPrice, { value: listingPrice})
    await market.createMarketItem (nftContractAddress , 2, auctionPrice, { value: listingPrice})

    // seller  = _ , buyer = buyeraddress
    const[ _, buyerAddress] = await ethers.getSigners()

    // use buyeraddress to connect to market
    await market.connect(buyerAddress).createMarketSale(nftContractAddress , 1, { value: auctionPrice})

    //fetch market items
    let items = await market.fetchMarketItems()

    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller, 
        owner: i.owner, 
        tokenUri
      }
      return item
     }))

    console.log('items:' , items)






  });
  
});



// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });
