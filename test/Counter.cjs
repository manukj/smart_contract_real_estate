const {expect} = require('chai')
const {ethers} = require('hardhat')

describe('Counter',()=>{
    let counterContract;
    
    beforeEach(async ()=>{
        const CONTRACT = await ethers.getContractFactory('Counter');
        counterContract = await CONTRACT.deploy(10);  
    })

    it('deplyment for constructor',async ()=>{
        expect(await counterContract.count()).equal(10);
    })
})