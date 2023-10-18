const {expect} = require('chai')
const {ethers} = require('hardhat')

describe("RealEstate",()=>{
    let realEstate, escrow
    let seller,deployer
    let nftID = 1
    beforeEach(async()=>{

        // setup accounts
        accounts = await ethers.getSigners();
        deployer = accounts[0]
        seller = deployer
        

        // load contracts
        const REALESTATE = await ethers.getContractFactory('RealEstate');
        const ESCROW = await ethers.getContractFactory('Escrow');

        // deploy contracts 
        realEstate = await REALESTATE.deploy();
        escrow = await ESCROW.deploy(); 
    })


    describe("Deployment",async ()=>{
        it('Send NFT to the seller / deployer',async ()=>{
            expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)
        })
    })
})