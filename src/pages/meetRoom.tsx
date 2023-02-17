import { Layout } from "components/Layout";
import { useAccount } from "wagmi";
import HuddleMeeting from "../../components/HuddleMeeting";

export default function Home() {
	const { address } = useAccount();
	if (!address) return null;

	return (
		<>
			<Layout>
				<HuddleMeeting doctorAddress={address?.toLowerCase()} />
			</Layout>
		</>
	);
}
