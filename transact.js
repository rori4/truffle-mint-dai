const Web3 = require('web3');
const daiAbi = require('./test/abi/dai');

const recipientAddress = '0xf4343EF3bD18C908964ed34a123Af71338c99C2a';
const unlockedAddress = '0x07BB41Df8C1d275c4259CdD0dBf0189d6a9a5F32';
const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';

const web3 = new Web3('http://localhost:8545');
const dai = new web3.eth.Contract(daiAbi, daiAddress);

async function run() {
	await dai.methods
		.transfer(recipientAddress, Web3.utils.toWei('1000', 'ether'))
		.send({ from: unlockedAddress });
	const [unlockedBalance, recipientBalance] = await Promise.all([
		dai.methods.balanceOf(unlockedAddress).call(),
		dai.methods.balanceOf(recipientAddress).call(),
	]);

	console.log(`Balance unlocked: ${unlockedBalance}`);
	console.log(`Balance unlocked: ${recipientBalance}`);
}

run();
