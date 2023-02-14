import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Layout } from "components/Layout";
import { Hero } from "components/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<Hero />
		</>
	);
}

// "DClinic": "0x5579CF7Ed2D48549Aa6285534Ce06bF61D3e0e24"
