import { gql } from "@apollo/client";

const getPrescriptionByDoctorId = (address, doctorId) => {
	const GET_PRESCRIPTION = gql`
		{
			prescriptionAddeds(where: { patientAddress: "${address}", doctorId: "${doctorId}" }) {
				patientId
                doctorId
                patientAddress
                prescriptions
			}
		}
	`;
	return GET_PRESCRIPTION;
};

export default getPrescriptionByDoctorId;
