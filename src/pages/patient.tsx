import { createStyles, Title } from "@mantine/core";
import { Layout } from "components/Layout";
import { Tabs } from "@mantine/core";
import {
	IconUserCircle,
	IconEditCircle,
	IconReportMedical,
} from "@tabler/icons";
import { EditPatientPanel } from "components/EditPatientPanel";
import PatientDashboard from "components/PatientDashboard";
import AppointmentPanel from "components/AppointmentPanel";

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
							value="appointment"
							icon={
								<IconReportMedical size={28} className={classes.titleColor} />
							}
						>
							<Title className={classes.titleColor} order={4}>
								New Appointment
							</Title>
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="dashboard" pt="xs">
						<PatientDashboard />
					</Tabs.Panel>

					<Tabs.Panel value="edit" pt="xs">
						<EditPatientPanel />
					</Tabs.Panel>

					<Tabs.Panel value="appointment" pt="xs">
						<AppointmentPanel />
					</Tabs.Panel>
				</Tabs>
			</Layout>
		</>
	);
}
