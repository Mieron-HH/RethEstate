"use client";

import "./_page.scss";

// COMPONENTS
import Navbar from "../components/Navbar/navbar";
import Hero from "@/components/Hero/hero";
import Toast from "@/components/Toast/toast";

const Home = () => {
	return (
		<main className="home">
			<Navbar />

			<Hero />

			<Toast />
		</main>
	);
};

export default Home;
