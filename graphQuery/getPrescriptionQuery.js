import { gql } from "@apollo/client";

const getPrescription = (address) => {
	const GET_PRESCRIPTION = gql`
		{
			prescriptionAddeds(first: 5 where: { patientAddress: "${address}" }) {
				patientId
                doctorId
                patientAddress
                prescriptions
			}
		}
	`;
	return GET_PRESCRIPTION;
};

export default getPrescription;
