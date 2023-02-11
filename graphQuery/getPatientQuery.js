import { gql } from "@apollo/client";

const getPatient = (address) => {
	const GET_PATIENT = gql`
		{
			patientCreateds(first: 5 where: { patientAddress: "${address}" }) {
				id
				patientId
				patientAddress
				name
				age
				dob
				gender
				p_address
			}
		}
	`;
	return GET_PATIENT;
};

export default getPatient;
