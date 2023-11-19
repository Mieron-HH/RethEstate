"use client";

import { useEffect, useState } from "react";
import "./_page.scss";
import { useAppSelector } from "@/libs/hooks";

// COMPONENTS
import Loader from "@/components/Loader/loader";
import Navbar from "../components/Navbar/navbar";
import Hero from "@/components/Hero/hero";
import Toast from "@/components/Toast/toast";

const Home = () => {
	const { user } = useAppSelector((state) => state.common);
	const [displayLoader, setDisplayLoader] = useState(true);

	useEffect(() => {
		if (user) setDisplayLoader(false);
		else setTimeout(() => setDisplayLoader(false), 2000);
	}, []);

	return (
		<main className="home">
			{displayLoader ? (
				<Loader />
			) : (
				<>
					<Navbar />

					<Hero />

					<Toast />
				</>
			)}
		</main>
	);
};

export default Home;
