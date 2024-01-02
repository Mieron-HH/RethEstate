// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721 {
    function ownerOf(uint256 _id) external returns (address);
    function transferFrom(address _from, address _to, uint256 _nftID) external;
}

contract RethRow {
    address public RethEstateAddress;
    
    mapping(uint256 => address payable) public seller;
    mapping(uint256 => address) public buyer;

    mapping(uint256 => uint256) public purchasePrice;
    mapping(uint256 => uint256) public escrowAmount;
    mapping(uint256 => bool) public listed;
    mapping(uint256 => bool) public reserved;
    mapping(uint256 => mapping(address => bool)) public approved;
    mapping(uint256 => mapping(address => bool)) public finalized;
    mapping(uint256 => mapping(address => mapping(address => bool))) public sold;

    constructor(address _RethEstateAddress) {
        RethEstateAddress = _RethEstateAddress;
    }

    modifier onlySeller(uint256 _nftID) {
        require(
            IERC721(RethEstateAddress).ownerOf(_nftID) == msg.sender,
            "Only the owner of the property can list it"
        );

        _;
    }

    function list(
        uint256 _nftID,
        uint256 _purchasePrice,
        uint256 _escrowAmount
    ) public onlySeller(_nftID) {
        listed[_nftID] = true;
        purchasePrice[_nftID] = _purchasePrice;
        escrowAmount[_nftID] = _escrowAmount;
        seller[_nftID] = payable(msg.sender);

        IERC721(RethEstateAddress).transferFrom(msg.sender, address(this), _nftID);
    }

    function unlist(uint256 _nftID) public onlySeller(_nftID) {
        require(listed[_nftID], "Property is not listed");
        require(sold[_nftID][seller[_nftID]][buyer[_nftID]] == false, "Property is already sold");

        listed[_nftID] = false;
    }

    function reserve(uint256 _nftID) public payable {
        require(msg.sender != seller[_nftID], "Seller cannot buy their property");
        require(escrowAmount[_nftID] >= msg.value, "Earnest amount is insufficient");

        (bool success, ) = payable(address(this)).call{value: msg.value}("");
        require(success, "Deposit was not successful. Try again.");
        buyer[_nftID] = msg.sender;
        reserved[_nftID] = true;
    }

    function approve(uint256 _nftID) public payable {
        require(
            msg.sender == seller[_nftID] ||
            msg.sender == buyer[_nftID],
            "Only seller and buyer can approve the transaction"
        );
        
        if (msg.sender == buyer[_nftID]) {
            require(msg.value >= (purchasePrice[_nftID] - escrowAmount[_nftID]), "Insufficient remaining amount");
            (bool success, ) = payable(address(this)).call{value: msg.value}("");
            require(success, "Remaining payment was not processed. Try again");
        }

        approved[_nftID][msg.sender] = true;
    }

    function finalize(uint256 _nftID) public {
        require(approved[_nftID][seller[_nftID]], "Seller hasn't approved yet");
        require(approved[_nftID][buyer[_nftID]], "Buyer hasn't approved yet");
        require(address(this).balance >= purchasePrice[_nftID], "Purchase price hasn't been met");

        (bool success, ) = payable(seller[_nftID]).call{value: purchasePrice[_nftID]}("");
        require(success, "Transfer of property price was not processed. Try again");

        IERC721(RethEstateAddress).transferFrom(address(this), buyer[_nftID], _nftID);
        listed[_nftID] = false;
        sold[_nftID][seller[_nftID]][buyer[_nftID]] = true;
    }

    function cancel(uint256 _nftID) public {
        require(msg.sender == seller[_nftID] || msg.sender == buyer[_nftID], "Only buyer or seller can cancel the deal");
        require(listed[_nftID], "Property is not listed");
        require(sold[_nftID][seller[_nftID]][buyer[_nftID]], "Property is already sold");

        payable(buyer[_nftID]).transfer(escrowAmount[_nftID]);
    }

    receive() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}