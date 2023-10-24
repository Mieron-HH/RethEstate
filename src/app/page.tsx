"use client";

import { useEffect } from "react";
import "./_page.scss";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";

// COMPONENTS
import Navbar from "../components/Navbar/navbar";
import Hero from "@/components/Hero/hero";

// ACTIONS
import { setAnimateNavbar } from "@/libs/slices/common-slice";

const App = () => {
	const dispatch = useAppDispatch();

	const { animateNavbar } = useAppSelector((state) => state.common);

	useEffect(() => {
		setTimeout(() => {
			if (animateNavbar) dispatch(setAnimateNavbar(false));
		}, 1000);
	}, []);

	return (
		<main className="app">
			<Navbar />

			<Hero />
		</main>
	);
};

export default App;
