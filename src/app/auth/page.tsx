"use client";

import { useEffect, useState } from "react";
import "./_page.scss";
import { useAppSelector } from "@/libs/hooks";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";

// COMPONENTS
import Navbar from "@/components/Navbar/navbar";
import Slider from "@/components/Slider/slider";
import Register from "@/components/Register/register";
import Login from "@/components/Login/login";
import Toast from "@/components/Toast/toast";

// ANIMATIONS
import { authFormAnim } from "@/libs/animations";

const Auth = () => {
	const route = useRouter();
	const { data: session, status } = useSession();
	const { authAction } = useAppSelector((state) => state.common);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (session && session.user) route.replace("/");
		else
			setTimeout(() => {
				setLoading(false);
			}, 1000);
	}, [status]);

	return (
		<div className="auth">
			<Navbar />

			<div className="auth__body">
				{!loading ? (
					<motion.div
						className="forms__container"
						variants={authFormAnim}
						initial="hidden"
						animate="show"
						viewport={{ once: true }}
					>
						<div className={`slider ${authAction}`}>
							<Slider />
						</div>

						<div className="register__container">
							<Register />
						</div>

						<div className="login__container">
							<Login />
						</div>
					</motion.div>
				) : (
					<div className="session__loading">
						<Image src="/loading-gif.gif" quality={100} fill alt="" />
					</div>
				)}
			</div>

			<Toast />
		</div>
	);
};

export default Auth;
