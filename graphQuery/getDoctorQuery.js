import { gql } from "@apollo/client";

const getDoctor = (address) => {
	const GET_DOCTOR = gql`
		{
			doctorCreateds(
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
				consultanceFee
				duration
			}
		}
	`;
	return GET_DOCTOR;
};

export default getDoctor;
