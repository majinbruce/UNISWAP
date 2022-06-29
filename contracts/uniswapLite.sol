// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

/// @title uniswap-contract
/// @author OMKAR N CHOUDHARI
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract uniswapLite {
    address public constant WethAddress =
        0xc778417E063141139Fce010982780140Aa0cD5Ab;

    address public constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address public myTokenAddress;

    // create an interface for Router
    IUniswapV2Router02 router = IUniswapV2Router02(ROUTER);

    using SafeERC20 for IERC20;
    IERC20 private immutable token;

    //events
    event liquidityAdded(address indexed, uint256 eth, uint256 amount);
    event fallbackCalled(address indexed, uint256 amount);

    //tracks eth stored per address
    mapping(address => uint256) public ethStoredPerAddress;

    constructor(address _token) {
        token = IERC20(_token);
        myTokenAddress = _token;
    }

    receive() external payable {
        emit fallbackCalled(msg.sender, msg.value);
    }

    /// @notice lets owner add liquidity pair between MyToken & Weth
    /// @dev deadline parameter could be hardcoded in contract
    /// @param amountToken    amount of tokens to be added in liquidity pool
    /// @param amountTokenMin min amount of tokens to be added in liquidity pool
    /// @param amountETHMin  min amount of eth to be returned if tx reverts
    /// @param deadline time in seconds after which the tx reverts

    function addLiquidityForEthAndMytoken(
        uint256 amountToken,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        uint256 deadline
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
            token.allowance(msg.sender, address(this)) >= amountToken,
            "UNISWAPLITE: this contract does not have allowance to access your tokens"
        );

        token.safeTransferFrom(msg.sender, address(this), amountToken);
        token.safeApprove(ROUTER, amountToken);

        router.addLiquidityETH{value: msg.value}(
            myTokenAddress,
            amountToken,
            amountTokenMin,
            amountETHMin,
            msg.sender,
            block.timestamp + deadline
        );

        emit liquidityAdded(msg.sender, msg.value, amountToken);
    }

    /// @notice lets users swap their MyTokens for Weth & stores the corresponding Weth into uniswapLite contract
    /// @param amountIn amount of tokens to be swapped for wETH
    /// @param deadline time in seconds after which the tx reverts

    function swapTokensForExactETH(uint256 amountIn, uint256 deadline)
        external
    {
        require(
            token.allowance(msg.sender, address(this)) >= amountIn,
            "UNISWAPLITE: this contract does not have allowance to access your tokens"
        );
        token.safeTransferFrom(msg.sender, address(this), amountIn);
        token.safeApprove(ROUTER, amountIn);

        address[] memory path = new address[](2);
        path[0] = myTokenAddress;
        path[1] = WethAddress;

        uint256[] memory amounts = router.swapExactTokensForETH(
            amountIn,
            2,
            path,
            address(this),
            block.timestamp + deadline
        );

        ethStoredPerAddress[msg.sender] += amounts[1];
    }

    /// @notice lets users withdraw stored Weth for the tokens swapped
    /// @param _amount amount of wETH to be withdrawn

    function withdrawETHStored(uint256 _amount) external {
        require(
            ethStoredPerAddress[msg.sender] >= _amount,
            "UNISWAPLITE: insufficient balance"
        );

        ethStoredPerAddress[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }
}
