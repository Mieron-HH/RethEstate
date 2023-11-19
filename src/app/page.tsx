"use client";

import { useEffect } from "react";
import "./_page.scss";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";

// COMPONENTS
import Loader from "@/components/Loader/loader";
import Navbar from "../components/Navbar/navbar";
import Hero from "@/components/Hero/hero";
import Toast from "@/components/Toast/toast";

// ACTIONS
import { setSiteLoaded } from "@/libs/slices/common-slice";

const Home = () => {
	const dispatch = useAppDispatch();
	const { siteLoaded } = useAppSelector((state) => state.common);

	useEffect(() => {
		if (!siteLoaded) {
			setTimeout(() => dispatch(setSiteLoaded(true)), 2000);
		}
	}, []);

	return (
		<main className="home">
			{!siteLoaded ? (
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
