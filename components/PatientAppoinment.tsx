import { useQuery } from "@apollo/client";
import { Title, Divider, Group, Text } from "@mantine/core";
import { IconCircleX, IconStethoscope } from "@tabler/icons";
import { useAccount } from "wagmi";
import getAppointmentListForPatient from "../graphQuery/getAppointmentQuery";
import AppointmentCard from "./AppointmentCardPatient";

interface props {
	patientId: string;
}

const PatientAppoinment = ({ patientId }: props) => {
	const {
		loading,
		error,
		data: appointmentData,
	} = useQuery(getAppointmentListForPatient(patientId));

	if (loading) {
		return <p>Loading ... </p>;
	}

	let appointments;

	if (appointmentData.appointmentCreateds.length === 0) {
		appointments = (
			<>
				<Text color={"lime"} size={"xl"} italic underline>
					You don&apos;t have any scheduled appointments yet!
				</Text>
			</>
		);
	} else {
		appointments = (
			<>
				<AppointmentCard elements={appointmentData.appointmentCreateds} />
			</>
		);
	}

	return (
		<>
			<Group mt={60}>
				<IconStethoscope size={30} color={"red"} />
				<Title order={2} color={"red"}>
					My Appointments Schedule
				</Title>
			</Group>

			<Divider size="sm" my={10} variant={"dashed"} />
			{appointments}
		</>
	);
};
export default PatientAppoinment;
