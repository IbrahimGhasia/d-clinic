import { useQuery } from "@apollo/client";
import { Divider, Group, Text, Title } from "@mantine/core";
import {
	IconLoader,
	IconStethoscope,
	IconZoomExclamation,
} from "@tabler/icons";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import getAppointmentListForDoctor from "../graphQuery/getAppointmentQuery2";
import getPatient from "../graphQuery/getPatientQuery";
import AppointmentCardDoctor from "./AppointmentCardDoctor";

const DoctorAppointmentList = () => {
	const { address } = useAccount();
	const {
		loading,
		error,
		data: appointmentData,
	} = useQuery(getAppointmentListForDoctor(address));

	if (loading) {
		return (
			<>
				<Group position="center" mt={"xl"}>
					<IconLoader size={30} color={"orange"} />
					<Text color={"orange"} size={"xl"}>
						Loading ...
					</Text>
				</Group>
			</>
		);
	}

	if (error) {
		return (
			<>
				<Group position="center" mt={"xl"}>
					<IconZoomExclamation size={30} color={"red"} />
					<Text color={"red"} size={"xl"}>
						Opps, something went wrong! Try again ...
					</Text>
				</Group>
			</>
		);
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
				<AppointmentCardDoctor elements={appointmentData.appointmentCreateds} />
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
export default DoctorAppointmentList;
