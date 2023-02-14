import { Group, Table, Text } from "@mantine/core";
interface TableProps {
	elements: {
		doctorId: string;
		symptoms: string;
		pastMedHistory: string;
		appointmentDate: string;
		appointmentTime: string;
		doctorAddress: string;
	}[];
}

const AppointmentCard = ({ elements }: TableProps) => {
	const rows = elements.map((element) => (
		<tr key={element.doctorId}>
			<td>{element.doctorId} . </td>
			<td>{element.symptoms}</td>
			<td>{element.pastMedHistory}</td>
			<td>{element.appointmentDate}</td>
			<td>{element.appointmentTime}</td>
		</tr>
	));

	return (
		<Table>
			<thead>
				<tr>
					<th>Doctor ID</th>
					<th>Symptoms</th>
					<th>Past Medical History</th>
					<th>Appointment Date</th>
					<th>Appointment Time</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};
export default AppointmentCard;
