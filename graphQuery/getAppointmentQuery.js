import { gql } from "@apollo/client";

const getAppointmentListForPatient = (patientId) => {
	const GET_APPOINTMENT = gql`
		{
			appointmentCreateds(where: { patientId: ${patientId} }) {
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

export default getAppointmentListForPatient;
