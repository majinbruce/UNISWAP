// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract uniswapLite {
    address public WethContract = 0xc778417E063141139Fce010982780140Aa0cD5Ab;

    address public ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address public myTokenAddress;

    // create an interface for Router
    IUniswapV2Router02 router = IUniswapV2Router02(ROUTER);

    using SafeERC20 for IERC20;
    IERC20 private immutable token;

    //events
    event liquidityAdded(address indexed, uint256 eth, uint256 amount);
    //struct

    //tracks eth stored per address
    mapping(address => uint256) public ethStoredPerAddress;

    constructor(IERC20 _token) {
        token = _token;
        myTokenAddress = _token;
    }

    function addLiquidityForEthAndMytoken(
        uint256 amountToken,
        uint256 amountTokenMin,
        uint256 amountETHMin
    ) external payable {
        require(
            amountToken >= amountTokenMin,
            "UNISWAPLITE: bhai kya kar raha hai tu? amountTokenDesired should be greater than min amount desired"
        );
        require(
            msg.value >= amountETHMin,
            "UNISWAPLITE: amount of ether sent should be greater than min amount of eth desired"
        );
        require(
            myToken.allowance(msg.sender, address(this)) >= amountToken,
            "UNISWAPLITE: this contract does not have allowance to access your tokens"
        );

        token.safeTransferFrom(msg.sender, address(this), amountToken);
        token.safeApprove(router, amountToken);

        router.addLiquidityETH{value: msg.value}(
            myTokenAddress,
            amountToken,
            amountTokenMin,
            msg.sender,
            block.timeStamp + 6969
        );

        emit liquidityAdded(msg.sender, msg.value, amountToken);
    }

    function swapTokensForExactETH(uint256 amountToken) external {
        
    }
}
