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

			// await wrapEther(provider, signer, totalTokens);

			const EthXContract = await sf.loadSuperToken("ETHx");
			const ETHx = EthXContract.address;

			const superSigner = sf.createSigner({ signer: signer });

			const flowRate_ = ((totalTokens * 10 ** 18) / (duration * 3600)).toFixed(
				0
			);

			let factor = (duration * 3600).toFixed(0);

			console.log("flowRate", flowRate_);

			const createFlowOp = EthXContract.createFlow({
				sender: senderAddress,
				receiver: recieverAddress,
				flowRate: flowRate_,
				// duration: factor,
				// flowRate_,
			});

			const txnResponse = await createFlowOp.exec(superSigner);
			const txnReceipt = await txnResponse.wait();

			console.log("txnReceipt", txnResponse);
			console.log("txnReceipt", txnReceipt);
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
