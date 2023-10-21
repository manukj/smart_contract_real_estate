const { expect } = require('chai');
const { ethers } = require('hardhat');



describe('RealEstate', () => {
  let realEstate, escrow
  let deployer, seller, buyer, inspector, lender
  let nftId = 1


  beforeEach(async () => {
    // Setup accounts
    accounts = await ethers.getSigners()
    deployer = accounts[0]
    seller = deployer
    buyer = accounts[1]
    inspector = accounts[2]
    lender = accounts[3]

    // Load contracts
    const RealEstate = await ethers.getContractFactory('RealEstate')
    const Escrow = await ethers.getContractFactory('Escrow')

    // Deploy contracts
    realEstate = await RealEstate.deploy()
    
    escrow = await Escrow.deploy(
      realEstate,
      nftId,
      seller.address,
      buyer.address)
  })
  
  describe('deployment',()=>{
    it("test transfer",async()=>{
        //verify if the seller is the onwer of the nft 
        expect(await realEstate.ownerOf(nftId)).to.equal(seller.address)
    })
  })

})