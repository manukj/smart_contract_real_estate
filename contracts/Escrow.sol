// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

interface IERC721 {
    function transferFrom(address _from,address _to,uint256 _id) external;
}

contract Escrow{

    address public nftAddress;
    uint256 public nftID;
    uint256 public purchaseAmount;
    uint256 public escrowAmount;
    address payable public seller;
    address payable public buyer;
    address public inspector;
    address public lender;
  

    constructor(
                address _nftAddress,
                uint256 _nftID,
                uint256 _purchaseAmount,
                uint256 _escrowAmount,
                address payable _seller,
                address payable _buyer,
                address  _inspector,
                address  _lender
                ){
        nftAddress = _nftAddress;
        nftID = _nftID;
        purchaseAmount = _purchaseAmount;
        escrowAmount = _escrowAmount;
        seller = _seller;
        buyer = _buyer;
        inspector = _inspector;
        lender = _lender;
    }

    function finalizeSale() public {
        IERC721(nftAddress).transferFrom(seller, buyer, nftID);
    }


    function getBalance() public view returns(uint) {
        return address(this).balance;
    }


    function depositeEarnest() public payable onlyBuyer {
        require(msg.value >= escrowAmount,"Can not deposite money ");
    }
    
    modifier onlyBuyer(){
        require(msg.sender == buyer,"Only buyer is allowed to call this function");
        _;
    } 
    
    modifier onlySeller(){
        require(msg.sender == seller,"Only Seller is allowed to call this function");
        _;
    }  
    
    modifier onlyInspector(){
        require(msg.sender == inspector,"Only Inspector is allowed to call this function");
        _;
    }
}