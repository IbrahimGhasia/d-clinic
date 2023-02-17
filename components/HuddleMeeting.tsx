import { HuddleIframe, IframeConfig } from "@huddle01/huddle01-iframe";

interface HuddleMeetingProps {
	doctorAddress: string;
}

const HuddleMeeting = (doctorAddress: HuddleMeetingProps) => {
	console.log("doctorId: ", doctorAddress.doctorAddress);
	const iframeConfig: IframeConfig = {
		roomUrl: `https://iframe.huddle01.com/${doctorAddress.doctorAddress}`,
		height: "700px",
		width: "100%",
		noBorder: true,
	};

	return (
		<div>
			<HuddleIframe config={iframeConfig} />
		</div>
	);
};
export default HuddleMeeting;
