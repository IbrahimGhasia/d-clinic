import { gql } from "@apollo/client";

const getDoctorList = () => {
	const GET_DOCTOR = gql`
		{
			doctorCreateds(orderBy: doctorId) {
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

export default getDoctorList;
