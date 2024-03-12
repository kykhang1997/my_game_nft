// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract CLTX is Ownable {
    uint256 public MINIMUM_USD = 50 * 1e8;

    event StartGame(address from, string game, uint256 amount);
    event AdDeposit(address from, uint256 amount);

    constructor(address initOwnable) Ownable(initOwnable) {}

    function setMinimumAmount(uint256 _amount) external {
        MINIMUM_USD = _amount;
    }

    function fund(string memory game) external payable {
        require(msg.value > MINIMUM_USD, "You need to spend more ETH!");
        emit StartGame(msg.sender, game, msg.value);
    }

    function withdraw(address to, uint256 _amount) external payable onlyOwner {
        require(_amount <= address(this).balance, "Amount withdraw too large");
        (bool callSuccess, ) = payable(to).call{value: _amount}("a");
        require(callSuccess, "Call failed");
    }

    function deposit() external payable onlyOwner {
        require(
            msg.value <= address(msg.sender).balance,
            "You need to spend more ETH!"
        );
        emit AdDeposit(msg.sender, msg.value);
    }
}
