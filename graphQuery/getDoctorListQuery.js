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
			}
		}
	`;
	return GET_DOCTOR;
};

export default getDoctorList;
