document.addEventListener("DOMContentLoaded", () => {
const stakingContractABI = [
	{
		"inputs": [
			{
				"internalType": "contract AISense",
				"name": "_aisToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_burnAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_nftContract",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cost",
				"type": "uint256"
			}
		],
		"name": "setStakingCost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum AISStaking.StakingDuration",
				"name": "duration",
				"type": "uint8"
			}
		],
		"name": "Staked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "enum AISStaking.StakingDuration",
				"name": "duration",
				"type": "uint8"
			}
		],
		"name": "stakeTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "enum AISStaking.StakingDuration",
				"name": "duration",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newCost",
				"type": "uint256"
			}
		],
		"name": "StakingCostUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unstake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Unstaked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "enum AISStaking.StakingDuration",
				"name": "duration",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "newCost",
				"type": "uint256"
			}
		],
		"name": "updateStakingCost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "aisToken",
		"outputs": [
			{
				"internalType": "contract AISense",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "burnAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum AISStaking.StakingDuration",
				"name": "duration",
				"type": "uint8"
			}
		],
		"name": "getStakingCost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserStakingInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "enum AISStaking.StakingDuration",
				"name": "duration",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nftContract",
		"outputs": [
			{
				"internalType": "contract AISenseNFT",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ONE_MONTH",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "PERCENTAGE_TO_BURN",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SIX_MONTHS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum AISStaking.StakingDuration",
				"name": "",
				"type": "uint8"
			}
		],
		"name": "stakingCosts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "stakingInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "enum AISStaking.StakingDuration",
				"name": "duration",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "THREE_MONTHS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TWELVE_MONTHS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Replace with the ABI of your staking contract
const stakingContractAddress = "0xEF4F3D7934B315fd4732BBF537a8de7D9F45fBc0"; // Replace with the address of your staking contract
const tokenContractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Replace with the ABI of your token contract
const tokenContractAddress = "0xE95929FA01E67B275458b7A0e50DB5619e8df0ce"; // Replace with the address of your token contract
const USDT_ABI = [
	{
	   "inputs":[
		  {
			 "name":"_bridge",
			 "internalType":"address",
			 "type":"address"
		  }
	   ],
	   "stateMutability":"nonpayable",
	   "type":"constructor"
	},
	{
	   "inputs":[
		  {
			 "indexed":true,
			 "name":"owner",
			 "internalType":"address",
			 "type":"address"
		  },
		  {
			 "indexed":true,
			 "name":"spender",
			 "internalType":"address",
			 "type":"address"
		  },
		  {
			 "indexed":false,
			 "name":"value",
			 "internalType":"uint256",
			 "type":"uint256"
		  }
	   ],
	   "name":"Approval",
	   "anonymous":false,
	   "type":"event"
	},
	{
	   "inputs":[
		  {
			 "indexed":true,
			 "name":"from",
			 "internalType":"address",
			 "type":"address"
		  },
		  {
			 "indexed":true,
			 "name":"to",
			 "internalType":"address",
			 "type":"address"
		  },
		  {
			 "indexed":false,
			 "name":"value",
			 "internalType":"uint256",
			 "type":"uint256"
		  }
	   ],
	   "name":"Transfer",
	   "anonymous":false,
	   "type":"event"
	},
	{
	   "outputs":[
		  {
			 "name":"",
			 "internalType":"uint256",
			 "type":"uint256"
		  }
	   ],
	   "inputs":[
		  {
			 "name":"owner",
			 "internalType":"address",
			 "type":"address"
		  },
		  {
			 "name":"spender",
			 "internalType":"address",
			 "type":"address"
		  }
	   ],
	   "name":"allowance",
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "outputs":[
		  {
			 "name":"",
			 "internalType":"bool",
			 "type":"bool"
		  }
	   ],
	   "inputs":[
		  {
			 "name":"spender",
			 "internalType":"address",
			 "type":"address"
		  },
		  {
			 "name":"amount",
			 "internalType":"uint256",
			 "type":"uint256"
		  }
	   ],
	   "name":"approve",
	   "stateMutability":"nonpayable",
	   "type":"function"
	},
	{
	   "outputs":[
		  {
			 "name":"",
			 "internalType":"uint256",
			 "type":"uint256"
		  }
	   ],
	   "inputs":[
		  {
			 "name":"account",
			 "internalType":"address",
			 "type":"address"
		  }
	   ],
	   "name":"balanceOf",
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "outputs":[
		  {
			 "name":"",
			 "internalType":"address",
			 "type":"address"
		  }
	   ],
	   "inputs":[
		  
	   ],
	   "name":"bridge",
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "outputs":[
		  
	   ],
	   "inputs":[
		  {
			 "name":"_from",
			 "internalType":"address",
			 "type":"address"
		  },
		  {
			 "name":"_amount",
			 "internalType":"uint256",
			 "type":"uint256"
		  }
	   ],
	   "name":"burn",
	   "stateMutability":"nonpayable",
	   "type":"function"
	},
	{
	   "outputs":[
		  {
			 "name":"",
			 "internalType":"uint8",
			 "type":"uint8"
		  }
	   ],
	   "inputs":[
		  
	   ],
	   "name":"decimals",
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "outputs":[
		  {
			 "name":"",
			 "internalType":"bool",
			 "type":"bool"
		  }
	   ],
	   "inputs":[
		  {
			 "name":"spender",
			 "internalType":"address",
			 "type":"address"
		  },
		  {
			 "name":"subtractedValue",
			 "internalType":"uint256",
			 "type":"uint256"
		  }
	   ],
	   "name":"decreaseAllowance",
	   "stateMutability":"nonpayable",
	   "type":"function"
	},
	{
	   "outputs":[
		  {
			 "name":"",
			 "internalType":"bool",
			 "type":"bool"
		  }
	   ],
	   "inputs":[
		  {
			 "name":"spender",
			 "internalType":"address",
			 "type":"address"
		  },
		  {
			 "name":"addedValue",
			 "internalType":"uint256",
			 "type":"uint256"
		  }
	   ],
	   "name":"increaseAllowance",
	   "stateMutability":"nonpayable",
	   "type":"function"
	},
	{
	   "outputs":[
		  
	   ],
	   "inputs":[
		  {
			 "name":"_to",
			 "internalType":"address",
			 "type":"address"
		  },
		  {
			 "name":"_amount",
			 "internalType":"uint256",
			 "type":"uint256"
		  }
	   ],
	   "name":"mint",
	   "stateMutability":"nonpayable",
	   "type":"function"
	},
	{
	   "outputs":[
		  {
			 "name":"",
			 "internalType":"string",
			 "type":"string"
		  }
	   ],
	   "inputs":[
		  
	   ],
	   "name":"name",
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "outputs":[
		  {
			 "name":"",
			 "internalType":"string",
			 "type":"string"
		  }
	   ],
	   "inputs":[
		  
	   ],
	   "name":"symbol",
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "outputs":[
		  {
			 "name":"",
			 "internalType":"uint256",
			 "type":"uint256"
		  }
	   ],
	   "inputs":[
		  
	   ],
	   "name":"totalSupply",
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "outputs":[
		  {
			 "name":"",
			 "internalType":"bool",
			 "type":"bool"
		  }
	   ],
	   "inputs":[
		  {
			 "name":"to",
			 "internalType":"address",
			 "type":"address"
		  },
		  {
			 "name":"amount",
			 "internalType":"uint256",
			 "type":"uint256"
		  }
	   ],
	   "name":"transfer",
	   "stateMutability":"nonpayable",
	   "type":"function"
	},
	{
	   "outputs":[
		  {
			 "name":"",
			 "internalType":"bool",
			 "type":"bool"
		  }
	   ],
	   "inputs":[
		  {
			 "name":"from",
			 "internalType":"address",
			 "type":"address"
		  },
		  {
			 "name":"to",
			 "internalType":"address",
			 "type":"address"
		  },
		  {
			 "name":"amount",
			 "internalType":"uint256",
			 "type":"uint256"
		  }
	   ],
	   "name":"transferFrom",
	   "stateMutability":"nonpayable",
	   "type":"function"
	}
 ]; // Replace with the ABI of USDT contract
const USDT_ADDRESS = "0x900101d06A7426441Ae63e9AB3B9b0F63Be145F1";
const USDT_PRICES = {
  1: '59000000',
  3: '99000000',
  6: '159000000',
  12: '239000000'
};

let web3;
let accounts;
let tokenContract;
let stakingContract;
let usdtContract;

// Initialize web3
async function initWeb3() {
    console.log('initWeb3', window.ethereum, window.web3); // Debugging line

    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        return true;
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        return true;
    } else {
        alert('No web3 provider detected. Please install MetaMask or use a compatible browser.');
        return false;
    }
}

async function connectMetaMask() {
    try {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('accounts', accounts); // Debugging line
        return true;
    } catch (error) {
        console.error('User denied account access');
        return false;
    }
}

async function initContracts() {
	accounts = (await web3.eth.getAccounts())[0];
  
	stakingContract = new web3.eth.Contract(stakingContractABI, stakingContractAddress);
	tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
	usdtContract = new web3.eth.Contract(USDT_ABI, USDT_ADDRESS);
  
	console.log('Staking Contract:', stakingContract);
	console.log('Token Contract:', tokenContract);
	console.log('USDT Contract:', usdtContract);
  	//console.log('Staking Time',getStakingEndTime);

	await updateBalance();
	await getStakingEndTime();
	startTimer();
	updateStakingCosts();
	await getStakingInfo();
	await checkUSDTAvailability();
  }


async function updateBalance() {
	console.log("METHODSS", tokenContract)
    if (tokenContract) {
        const balance = await tokenContract.methods.balanceOf(accounts).call();
        $('#balance').text(web3.utils.fromWei(balance, 'ether'));
    }
}

async function stakeTokens(duration) {
	console.log('Duration', duration)
    const cost = await stakingContract.methods.getStakingCost(duration).call();
	console.log('Stake Tokens')
    const allowance = await tokenContract.methods.allowance(accounts, stakingContractAddress).call();
	
    if (new web3.utils.BN(allowance).lt(new web3.utils.BN(cost))) {
        await tokenContract.methods.approve(stakingContractAddress, cost).send({ from: accounts });
    }

    await stakingContract.methods.stake(duration).send({ from: accounts });
    await getStakingEndTime();
    startTimer();
    updateBalance();
}

async function unstakeTokens() {
    await stakingContract.methods.unstake().send({ from: accounts });
    stakingEndTime = 0;
    clearInterval(timerInterval);
    $('#timer').text('00:00:00');
    updateBalance();
}

async function checkUSDTAvailability() {
	const userUSDTBalance = await usdtContract.methods.balanceOf(accounts).call();
	const enoughUSDT = {
	  1: BigInt(userUSDTBalance) >= BigInt(USDT_PRICES[1]),
	  3: BigInt(userUSDTBalance) >= BigInt(USDT_PRICES[3]),
	  6: BigInt(userUSDTBalance) >= BigInt(USDT_PRICES[6]),
	  12: BigInt(userUSDTBalance) >= BigInt(USDT_PRICES[12])
	};
  
	// Update the UI based on the availability of USDT
	// Replace the following example with your actual UI elements
	document.getElementById('purchase-1-month').disabled = !enoughUSDT[1];
	document.getElementById('purchase-3-months').disabled = !enoughUSDT[3];
	document.getElementById('purchase-6-months').disabled = !enoughUSDT[6];
	document.getElementById('purchase-12-months').disabled = !enoughUSDT[12];
  }
  
  async function purchaseNFTWithUSDT(duration) {
	const usdtPrice = USDT_PRICES[duration];
	if (!usdtPrice) {
	  console.error('Invalid duration');
	  return;
	}
  
	const allowance = await usdtContract.methods.allowance(accounts, stakingContractAddress).call();
  
	if (BigInt(allowance) < BigInt(usdtPrice)) {
		await usdtContract.methods.approve(stakingContractAddress, usdtPrice).send({ from: accounts });
		await aisSenseNFTContract.methods.purchaseNFTWithUSDT(duration).send({ from: accounts });
		await checkUSDTAvailability();
	}
  }

$(document).ready(async () => {
    if (await initWeb3()) {
        $('#connect-btn').click(async () => {
            console.log("connect-btn clicked"); // Debugging line
            connectMetaMask().then(async (connected) => {
                if (connected) {
                    await initContracts(); // Add the 'await' keyword here
                    $('#connect-btn').text('Connected'); // Change the button text
                    $('#connect-btn').css('background-color', '#4CAF50'); // Change the button background color
                    $('#connect-btn').prop('disabled', true); // Disable the button to prevent multiple clicks
                }
            });
        });
    } else {
        alert('No web3 provider detected. Please install MetaMask or use a compatible browser.');
    }
}); // This is the closing parenthesis that was missing.

$('#stake-btn').click(() => {
    const duration = $('.staking-duration').val();
	console.log('Stake Duration', document.querySelector('.staking-duration'))
    stakeTokens(duration);
});

$('#unstake-btn').click(() => {
    unstakeTokens();
});

$('#claim-nft-btn').click(() => {
    claimNFT();
});

let stakingEndTime = 0;
let timerInterval;


	const nftDurationSelect = document.getElementById("nft-duration");
	const purchaseUsdtButton = document.getElementById("purchase-usdt-btn");
  
	purchaseUsdtButton.addEventListener("click", () => {
	  const duration = parseInt(nftDurationSelect.value, 10);
	  purchaseNFTWithUSDT(duration + 1); // Add 1 to the value since the options start from 0
	});

async function getStakingInfo() {
    try {
        const userAddress = accounts;
		console.log('User Address', userAddress);
        const userStakingInfo = await stakingContract.methods.getUserStakingInfo(userAddress).call();
        $('#staking-amount').text(web3.utils.fromWei(userStakingInfo.amount, 'ether'));
        $('#staking-start-time').text(new Date(userStakingInfo.startTime * 1000).toLocaleString());
        $('#staking-duration').text(userStakingInfo.duration);
    } catch (error) {
        console.error("Error getting user staking info:", error);
    }
}

async function getStakingEndTime() {
    if (stakingContract) {
        const { startTime, duration } = await stakingContract.methods.getUserStakingInfo(accounts).call();
        let durationInSeconds;
		console.log('Start Time', startTime);
        if (duration === '0') {
            durationInSeconds = 60*60*24*30;
        } else if (duration === '1') {
            durationInSeconds = 60*60*24*30*3;
        } else if (duration === '2') {
            durationInSeconds = 60*60*24*30*6;
        } else {
            durationInSeconds = 60*60*24*30*12;
        }

        stakingEndTime = parseInt(startTime) + durationInSeconds;
    }
}

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        const remainingTime = stakingEndTime - now;

        if (remainingTime > 0) {
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;
            $('#timer').text(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
            clearInterval(timerInterval);
            $('#timer').text('00:00:00');
        }
    }, 1000);
}

function claimNFT() {
    stakingContract.methods
        .stakers(accounts[0])
        .call()
        .then((stakerInfo) => {
            const tokenId = stakerInfo.tokenId.toString();
            alert(`Claimed NFT with ID: ${tokenId}`);
        })
        .catch((error) => {
            console.error(error);
            alert('Error claiming NFT. Please try again later.');
        });
}

async function updateStakingCosts() {
    const oneMonthCost = await stakingContract.methods.getStakingCost(0).call();
    const threeMonthsCost = await stakingContract.methods.getStakingCost(1).call();
    const sixMonthsCost = await stakingContract.methods.getStakingCost(2).call();
    const twelveMonthsCost = await stakingContract.methods.getStakingCost(3).call();

    $('#one-month-cost').text(web3.utils.fromWei(oneMonthCost, 'ether'));
    $('#three-months-cost').text(web3.utils.fromWei(threeMonthsCost, 'ether'));
    $('#six-months-cost').text(web3.utils.fromWei(sixMonthsCost, 'ether'));
    $('#twelve-months-cost').text(web3.utils.fromWei(twelveMonthsCost, 'ether'));
}
});