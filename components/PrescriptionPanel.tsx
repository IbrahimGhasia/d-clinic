import {
	Button,
	Center,
	Divider,
	Grid,
	Paper,
	Textarea,
	TextInput,
	Title,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { ethers } from "ethers";
import { useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { dClinicContractAddress, dClinicAbi } from "../constants";

const PrescriptionPanel = () => {
	const { isConnected } = useAccount();
	const { data: signer, isError, isLoading } = useSigner();

	const [patientId, setPatientId] = useState();
	const [doctorId, setDoctorId] = useState();
	const [patientAddress, setPatientAddress] = useState("");
	const [prescription, setPrescription] = useState("");

	const handleSubmit = async () => {
		if (!isConnected) {
			showNotification({
				id: "hello",
				autoClose: 5000,
				title: "Connect Wallet",
				message: "Please Connect your wallet to register",
				color: "red",
				icon: <IconX />,
				className: "my-notification-class",
				loading: false,
			});
			return;
		}
		showNotification({
			id: "load-data",
			loading: true,
			title: "Posting...",
			message:
				"Please wait while we are posting your content to the blockchain",
			autoClose: false,
			disallowClose: true,
		});
		if (!signer) {
			console.log("No signer found");
			return;
		}
		const contractInstance = new ethers.Contract(
			dClinicContractAddress,
			dClinicAbi,
			signer
		);
		const tx = await contractInstance.addPrescription(
			patientId,
			doctorId,
			patientAddress,
			prescription
		);
		console.log(tx.hash);
		console.log("-------------------------------------------");
		const response = await tx.wait();
		console.log("DONE!");
		console.log("response");
		console.log(response);
		console.log("-------------------------------------------");

		updateNotification({
			id: "load-data",
			color: "teal",
			title: "Posted Successfully",
			icon: <IconCheck size={16} />,
			autoClose: 2000,
			message: undefined,
		});
	};

	return (
		<>
			<Paper
				shadow={"xl"}
				p={"xl"}
				radius={"xl"}
				withBorder={true}
				mx={120}
				my={80}
			>
				<Center>
					<Title>Add Prescription</Title>
				</Center>

				<Divider size="sm" my={10} variant={"dashed"} />

				<Grid>
					<Grid.Col span={4}>
						<TextInput
							label="Patient ID"
							placeholder="Enter your Patient ID"
							radius="md"
							size="md"
							withAsterisk
							onChange={(e: any) => {
								if (!e) return;
								setPatientId(e.target.value);
							}}
						/>
					</Grid.Col>
					<Grid.Col span={4}>
						<TextInput
							label="Doctor ID"
							placeholder="Enter your ID"
							radius="md"
							size="md"
							withAsterisk
							onChange={(e: any) => {
								if (!e) return;
								setDoctorId(e.target.value);
							}}
						/>
					</Grid.Col>
					<Grid.Col span={4}>
						<TextInput
							label="Patient Address"
							placeholder="Enter your patient wallet address"
							radius="md"
							size="md"
							withAsterisk
							onChange={(e) => {
								setPatientAddress(e.target.value);
							}}
						/>
					</Grid.Col>
					<Grid.Col span={12} mx="auto">
						<Textarea
							radius="md"
							size="md"
							minRows={7}
							label="Prescription"
							placeholder="Add the prescription here"
							withAsterisk
							onChange={(e) => {
								setPrescription(e.target.value);
							}}
						/>
					</Grid.Col>
					<Grid.Col span={6} mx="auto" my={20}>
						<Button
							radius="xl"
							color={"green"}
							size="md"
							fullWidth
							disabled={
								patientId === undefined ||
								doctorId === undefined ||
								patientAddress.length === 0 ||
								prescription.length === 0
							}
							onClick={handleSubmit}
						>
							SUBMIT
						</Button>
					</Grid.Col>
				</Grid>
			</Paper>
		</>
	);
};
export default PrescriptionPanel;
