import {
	Paper,
	TextInput,
	Grid,
	NumberInput,
	Select,
	Title,
	Center,
	Divider,
	Textarea,
	Button,
	Text,
	Tooltip,
} from "@mantine/core";
import { useState } from "react";
import { ImageInput } from "./ImageInput";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconX, IconCheck, IconAlertCircle } from "@tabler/icons";
import { dClinicContractAddress, dClinicAbi } from "../constants";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";

export function EditDoctorPanel() {
	const { isConnected } = useAccount();
	const { data: signer, isError, isLoading } = useSigner();

	const [image, setImage] = useState<File>();
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	const [specialization, setSpecialization] = useState("");
	const [perAddress, setPerAddress] = useState("");
	const [consultationFee, setConsultationFee] = useState("");
	const [duration, setDuration] = useState("");

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
		const tx = await contractInstance.createDoctor(
			name,
			age,
			gender,
			perAddress,
			specialization,
			consultationFee,
			duration
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
					<Title>Doctor Profile</Title>
				</Center>

				<Divider size="sm" my={10} variant={"dashed"} />

				<Grid>
					<Grid.Col span={10} mt={24} mx="auto">
						<Text size={"lg"} fw={500} mb={10}>
							Upload your Profile Pic <span style={{ color: "red" }}>*</span>
						</Text>
						<ImageInput
							width={800}
							height={300}
							onChange={setImage}
							value={image}
						/>
					</Grid.Col>

					<Grid.Col span={12}>
						<TextInput
							label="Name"
							placeholder="Your Name"
							radius="md"
							size="md"
							withAsterisk
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</Grid.Col>

					<Grid.Col span={6}>
						<NumberInput
							label="Age"
							placeholder="Your age"
							radius="md"
							size="md"
							withAsterisk
							min={0}
							onChange={(e) => {
								if (!e) {
									return;
								}
								setAge(e.toString());
							}}
						/>
					</Grid.Col>

					<Grid.Col span={6}>
						<Select
							label="Gender"
							placeholder="Choose your gender"
							data={[
								{ value: "male", label: "Male" },
								{ value: "female", label: "Female" },
								{ value: "nonBinary", label: "Non-Binary" },
								{ value: "dnd", label: "Do not want to disclose" },
							]}
							radius="md"
							size="md"
							withAsterisk
							onChange={(e) => {
								if (!e) {
									return;
								}
								setGender(e);
							}}
						/>
					</Grid.Col>

					<Grid.Col span={12}>
						<TextInput
							label="Specialization"
							placeholder="Your Specialization"
							radius="md"
							size="md"
							withAsterisk
							onChange={(e) => {
								setSpecialization(e.target.value);
							}}
						/>
					</Grid.Col>

					<Grid.Col span={12} mx="auto">
						<Textarea
							radius="md"
							size="md"
							label="Address"
							placeholder="Enter your permanent Address"
							withAsterisk
							onChange={(e) => {
								setPerAddress(e.target.value);
							}}
						/>
					</Grid.Col>

					<Grid.Col span={6}>
						<TextInput
							label="Fee"
							placeholder="Enter your consultation fee in ETH."
							radius={"md"}
							size={"md"}
							withAsterisk
							onChange={(e) => {
								setConsultationFee(e.target.value);
							}}
						/>
					</Grid.Col>

					<Grid.Col span={6}>
						<TextInput
							label="Payment Duration"
							placeholder="Enter your payment duration period in seconds"
							radius={"md"}
							size={"md"}
							withAsterisk
							rightSection={
								<Tooltip
									multiline
									width={220}
									label="Payment will be done using Superfluid Constant Flow Agreement. 
									The Constant Flow Agreement lets you stream money! What do we mean by streaming? 
									Streaming is a constant by-the-second movement of tokens from a sending account to a receiving account. 
									In a CFA, the sender agrees to have its account balance reduce at a certain per-second rate—called the flow 
									rate—and the receiving party's account balance increase at that flow rate."
									position="top-end"
									withArrow
								>
									<div>
										<IconAlertCircle
											size={18}
											style={{ display: "block", opacity: 0.5 }}
										/>
									</div>
								</Tooltip>
							}
							onChange={(e) => {
								setDuration(e.target.value);
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
								name.length === 0 ||
								age.length === 0 ||
								gender.length === 0 ||
								specialization.length === 0 ||
								perAddress.length === 0
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
}
