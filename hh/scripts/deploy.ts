import { ethers, hardhatArguments } from 'hardhat';
import * as Config from './config';
import 'dotenv/config';

async function main() {
	await Config.initConfig();
	const addressOwner = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
	const network = hardhatArguments.network ? hardhatArguments.network : 'dev';

	const cltx = await ethers.deployContract('CLTX', [addressOwner]);
	await cltx.waitForDeployment();
	Config.setConfig(network + '.CLTX', String(cltx.target));
	console.log(`CLTX deployed to ${cltx.target}`, network + '.CLTX');

	await Config.updateConfig();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
