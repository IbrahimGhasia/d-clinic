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
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { ImageInput } from "./ImageInput";
import { z } from "zod";
import { IconAlertCircle } from "@tabler/icons";

const schema = z.object({
	name: z.string().min(3, { message: "Name should have atleast 3 character" }),
	age: z.number().min(1, { message: "Age should be greater than 0" }),
});

export function EditPatientPanel() {
	const [image, setImage] = useState<File>();

	const form = useForm({
		initialValues: {
			name: "",
			age: 0,
			dob: "",
			gender: "",
			occupation: "",
			emergency_contact: "",
			maratial_status: "",
			per_address: "",
		},

		validate: zodResolver(schema),
		validateInputOnChange: true,
	});

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
							{...form.getInputProps("name")}
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
							{...form.getInputProps("age")}
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
							{...form.getInputProps("dob")}
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
							{...form.getInputProps("gender")}
						/>
					</Grid.Col>

					<Grid.Col span={12} mx="auto">
						<Textarea
							radius="md"
							size="md"
							label="Address"
							placeholder="Enter your permanent Address"
							withAsterisk
							{...form.getInputProps("per_address")}
						/>
					</Grid.Col>

					<Grid.Col span={6} mx="auto" my={20}>
						<Button
							radius="xl"
							color={"green"}
							size="md"
							fullWidth
							disabled={form.isValid() ? false : true}
						>
							SUBMIT
						</Button>
					</Grid.Col>
				</Grid>
			</Paper>
		</>
	);
}
