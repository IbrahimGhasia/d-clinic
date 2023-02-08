import { Divider, Paper, Title } from "@mantine/core";
import { PatientProfile } from "./PatientProfile";

const PatientDashboard = () => {
	return (
		<div>
			<Paper shadow={"xl"} p={"xl"} radius={"xl"} withBorder={true} my={10}>
				<Title>Patient Dashboard</Title>
				<Divider size="sm" my={10} variant={"dashed"} />

				<PatientProfile
					avatar={
						"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
					}
					name={"Ibrahim Ghasia"}
					age={21}
					gender={"Male"}
					birthDay={"12/12/2000"}
					address={"1234 Main St, New York, NY 10001"}
				/>
			</Paper>
		</div>
	);
};
export default PatientDashboard;

// Name
// Age
// BirthDate
// Gender
