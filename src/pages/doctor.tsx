import { createStyles, Title } from "@mantine/core";
import { Layout } from "components/Layout";
import { Tabs } from "@mantine/core";
import {
	IconUserCircle,
	IconEditCircle,
	IconPrescription,
} from "@tabler/icons";
import { EditPatientPanel } from "components/EditPatientPanel";
import { EditDoctorPanel } from "components/EditDoctorPanel";
import DoctorDashboardPanel from "components/DoctorDashboardPanel";
import PrescriptionPanel from "components/PrescriptionPanel";

const useStyles = createStyles((theme) => ({
	titleColor: {
		color: theme.colorScheme === "dark" ? "#e6ccb2" : "#7f5539",
	},
}));

export default function Home() {
	const { classes } = useStyles();

	return (
		<>
			<Layout>
				<Tabs defaultValue="dashboard">
					<Tabs.List>
						<Tabs.Tab
							value="dashboard"
							icon={<IconUserCircle size={28} className={classes.titleColor} />}
						>
							<Title className={classes.titleColor} order={4}>
								Dashboard
							</Title>
						</Tabs.Tab>
						<Tabs.Tab
							value="edit"
							icon={<IconEditCircle size={28} className={classes.titleColor} />}
						>
							<Title className={classes.titleColor} order={4}>
								Edit Profile
							</Title>
						</Tabs.Tab>
						<Tabs.Tab
							value="prescription"
							icon={
								<IconPrescription size={28} className={classes.titleColor} />
							}
						>
							<Title className={classes.titleColor} order={4}>
								Prescription
							</Title>
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="dashboard" pt="xs">
						<DoctorDashboardPanel />
					</Tabs.Panel>

					<Tabs.Panel value="edit" pt="xs">
						<EditDoctorPanel />
					</Tabs.Panel>

					<Tabs.Panel value="prescription" pt="xs">
						<PrescriptionPanel />
					</Tabs.Panel>
				</Tabs>
			</Layout>
		</>
	);
}
