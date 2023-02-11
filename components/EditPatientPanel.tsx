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
import { DatePicker } from "@mantine/dates";
import { showNotification, updateNotification } from "@mantine/notifications";

// import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { ImageInput } from "./ImageInput";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useSigner } from "wagmi";
import {
	useContractRead,
	useContractWrite,
	usePrepareContractWrite,
	useSignMessage,
} from "wagmi";
import { dClinicAbi, dClinicContractAddress } from "../constants";
import { IconCheck, IconX } from "@tabler/icons";

// import { z } from "zod";

// const schema = z.object({
// 	name: z.string().min(3, { message: "Name should have atleast 3 character" }),
// 	age: z.number().min(1, { message: "Age should be greater than 0" }),
// });

export function EditPatientPanel() {
	const { isConnected } = useAccount();
	const { data: signer, isError, isLoading } = useSigner();

	const [image, setImage] = useState<File>();
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("");
	const [perAddress, setPerAddress] = useState("");

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
		const tx = await contractInstance.createPatient(
			name,
			age,
			dob,
			gender,
			perAddress
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
				my={10}
			>
				<Center>
					<Title>Patient Profile</Title>
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
							// {...form.getInputProps("name")}
							onChange={(e) => setName(e.target.value)}
						/>
					</Grid.Col>

					<Grid.Col span={4}>
						<NumberInput
							label="Age"
							placeholder="Your age"
							radius="md"
							size="md"
							withAsterisk
							min={0}
							// {...form.getInputProps("age")}
							onChange={(e) => {
								if (!e) {
									return;
								}
								setAge(e.toString());
							}}
						/>
					</Grid.Col>

					<Grid.Col span={4}>
						<DatePicker
							dropdownType="modal"
							placeholder="Enter your birth date"
							label="Birth Date"
							radius="md"
							size="md"
							withAsterisk
							// {...form.getInputProps("dob")}
							onChange={(event) => {
								if (!event) {
									return;
								}
								// setDob((event.valueOf() = new Date().toJSON().slice(0, 10)));
								setDob(event.toJSON().slice(0, 10));
							}}
						/>
					</Grid.Col>

					<Grid.Col span={4}>
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
							// {...form.getInputProps("gender")}
							onChange={(e) => {
								if (!e) {
									return;
								}
								setGender(e);
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
							// {...form.getInputProps("per_address")}
							onChange={(e) => setPerAddress(e.target.value)}
						/>
					</Grid.Col>

					<Grid.Col span={6} mx="auto" my={20}>
						<Button
							radius="xl"
							color={"green"}
							size="md"
							fullWidth
							// disabled={form.isValid() ? false : true}
							disabled={
								name.length === 0 ||
								age.length === 0 ||
								dob.length === 0 ||
								gender.length === 0 ||
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
