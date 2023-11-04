"use client";

import { useEffect } from "react";
import "./_page.scss";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";

// COMPONENTS
import Navbar from "../components/Navbar/navbar";
import Hero from "@/components/Hero/hero";
import Toast from "@/components/Toast/toast";

// ACTIONS
import { setAnimateNavbar } from "@/libs/slices/common-slice";

const Home = () => {
	const dispatch = useAppDispatch();

	const { animateNavbar, toast } = useAppSelector((state) => state.common);

	useEffect(() => {
		setTimeout(() => {
			if (animateNavbar) dispatch(setAnimateNavbar(false));
		}, 1000);
	}, []);

	return (
		<main className="home">
			<Navbar />

			<Hero />

			{toast.type !== "" && <Toast type={toast.type} />}
		</main>
	);
};

export default Home;
