import { gql } from "@apollo/client";

const getAppointmentListForDoctor = (address) => {
	const GET_APPOINTMENT = gql`
		{
			appointmentCreateds(where: { doctorAddress: "${address}" }) {
				patientId
				doctorId
				patientAddress
				doctorAddress
				symptoms
				pastMedHistory
				appointmentDate
				appointmentTime
			}
		}
	`;
	return GET_APPOINTMENT;
};

export default getAppointmentListForDoctor;
