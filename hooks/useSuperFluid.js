import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
// import ETHxABI from "../constants/ETHx.abi";
import { ETHxABI } from "../constants/ETHx.abi.js";

const useSuperFluid = () => {
	const sendPlanedStream = async (
		provider,
		signer,
		senderAddress,
		recieverAddress,
		duration,
		totalTokens
	) => {
		try {
			const sf = await Framework.create({
				networkName: "goerli",
				provider: provider,
				chainId: 5,
			});

			await wrapEther(provider, signer, totalTokens);

			const EthXContract = await sf.loadSuperToken("ETHx");
			const ETHx = EthXContract.address;

			let res = await EthXContract.getFlow({
				sender: senderAddress,
				receiver: recieverAddress,
				providerOrSigner: provider,
			});

			// const signer_ = sf.createSigner({
			// 	privateKey:
			// 		"542a3a2711f27f11148b8c097f235278b8f2ebff4d7e5078995b4db8a9a25f56",
			// 	provider: provider,
			// });

			// const createFlowOp = EthXContract.createFlow({
			// 	sender: senderAddress,
			// 	receiver: recieverAddress,
			// 	flowRate: "1000000000000000000",
			// });

			// const txnResponse = await createFlowOp.exec(signer_);
			// const txnReceipt = await txnResponse.wait();

			// let flowOp = EthXContract.createFlow({
			// 	sender: senderAddress,
			// 	receiver: recieverAddress,
			// 	flowRate: "1000000000000000000",
			// });

			// console.log(signer._address);

			// await flowOp.exec(signer);
			// await createFlowOp.exec(signer);
		} catch (error) {
			console.log(
				"Hmmm, your transaction threw an error. Make sure  that you've entered a valid Ethereum address!"
			);
			console.error(error);
		}
	};

	const wrapEther = async (provider, signer, amt) => {
		const ETHxAddress = "0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947";
		const ETHx = new ethers.Contract(ETHxAddress, ETHxABI, provider);
		console.log("ETHx", ETHx);

		try {
			console.log(`Wrapping ${amt} ETH to ETHx...`);

			const amtToUpgrade = ethers.utils.parseEther(amt.toString());
			const receipt = await ETHx.connect(signer).upgradeByETH({
				value: amtToUpgrade,
			});
			await receipt.wait().then(function (tx) {
				console.log(`Congrats - you've just upgraded MATIC to MATICx!`);
			});
		} catch (error) {
			console.log(error);
		}
	};
	return { sendPlanedStream };
};

export default useSuperFluid;
