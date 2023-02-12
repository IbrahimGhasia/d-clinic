import { gql } from "@apollo/client";

const getDoctor = (address) => {
	const GET_DOCTOR = gql`
		{
			doctorCreateds(
				first: 5
				where: { doctorAddress: "${address}" }
			) {
				id
				doctorId
				doctorAddress
				name
				age
				gender
				specialization
				d_address
			}
		}
	`;
	return GET_DOCTOR;
};

export default getDoctor;
