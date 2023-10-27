const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n)=>{
  return ethers.parseUnits(n.toString(),'ether')
}

const ether = tokens;

describe('RealEstate', () => {
  let realEstate, escrow
  let deployer, seller, buyer, inspector, lender
  let nftId = 1
  let purchaseAmount = ether(100)
  let escrowAmount = ether(20)


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
        purchaseAmount,
        escrowAmount,
        seller.address,
        buyer.address,
        inspector.address,
        lender.address
      )

    //approve the transcation from seller 
    transcation = await realEstate.connect(seller).approve(escrow,nftId);
    await transcation.wait();
  })
  
  describe('deployment',()=>{
    let transcation,balance

    it("test transfer",async()=>{
        //verify if the seller is the onwer of the nft 
        expect(await realEstate.ownerOf(nftId)).to.equal(seller.address)

        //deposite the eschrow amount
        transcation = await escrow.connect(buyer).depositeEarnest({value: escrowAmount})
        await transcation.wait();

        // check the balance 
        balance = await escrow.getBalance()
        var amount = ethers.parseEther('5000.0');
        console.log(ethers.formatEther(balance))

        // //transfer the nft to buyer 
        transcation = await escrow.connect(buyer).finalizeSale();
        await transcation.wait();

        //test if the transcation is done to the buyer 
        expect(await realEstate.ownerOf(nftId)).to.equal(buyer.address)
    })
  })

})