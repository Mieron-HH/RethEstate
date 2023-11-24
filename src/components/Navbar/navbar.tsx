"use client";

import { useEffect, useState } from "react";
import "./_navbar.scss";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { motion } from "framer-motion";
import { useAddress } from "@thirdweb-dev/react";
import { useMetamask } from "@thirdweb-dev/react";

// COMPONENTS
import Drawer from "@/components/Drawer/drawer";

// ICONS
import { IoIosWallet } from "react-icons/io";
import EastIcon from "@mui/icons-material/East";

// ACTIONS
import {
	setAuthAction,
	setUser,
	setToast,
	setDrawerDisplayed,
	setAnimateNavbar,
	setSessionAvailable,
} from "@/libs/slices/common-slice";

// ANIMATIONS
import { navLogoAnim, navLinksAnim, drawerAnim } from "@/libs/animations";

// SERVICES
import { getCurrentUser } from "@/libs/services/api-calls";

const Navbar = () => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { user, animateNavbar, drawerDisplayed, sessionAvailable } =
		useAppSelector((state) => state.common);
	const connectWithMetamask = useMetamask();
	const address = useAddress();
	const [loadingSession, setLoadingSession] = useState(false);
	const [isAuthPage, setIsAuthPage] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			if (animateNavbar) dispatch(setAnimateNavbar(false));
		}, 1000);

		setIsAuthPage(() => (pathname === "/auth" ? true : false));

		(async () => {
			if (!user && sessionAvailable) {
				setLoadingSession(true);
				const user = await getCurrentUser();

				if (!user) dispatch(setSessionAvailable(false));
				dispatch(setUser(user));
				setLoadingSession(false);
			}
		})();
	}, []);

	const navigateToHome = () => {
		if (pathname !== "/") router.push("/");
	};

	const navigateToAuth = (action: "login" | "register") => {
		dispatch(setAuthAction(action));

		router.push("/auth");
	};

	const connectWithBlockchainNetwork = async () => {
		if (address) {
			dispatch(
				setToast({ type: "success", message: "Wallet already connected" })
			);

			return;
		}

		try {
			await connectWithMetamask();

			dispatch(
				setToast({ type: "success", message: "Wallet connected successfully" })
			);
		} catch (error) {
			console.log(error);
			dispatch(setToast({ type: "error", message: "Error connecting Wallet" }));
		}
	};

	return (
		<div className="navbar__component">
			<motion.div
				className="logo"
				variants={navLogoAnim}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				custom={animateNavbar}
			>
				<Image
					className="light"
					src="/logo-light-theme.png"
					quality={100}
					fill
					alt=""
					onClick={navigateToHome}
				/>

				<Image
					className="dark"
					src="/logo-dark-theme.png"
					quality={100}
					fill
					alt=""
					onClick={navigateToHome}
				/>
			</motion.div>

			<motion.div
				className="nav__links"
				variants={navLinksAnim}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				custom={animateNavbar}
			>
				<Link
					href="/"
					className={`nav__item ${pathname === "/" && "selected"}`}
				>
					Home
				</Link>

				<Link
					href="/explore"
					className={`nav__item ${pathname === "/explore" && "selected"}`}
				>
					Explore
				</Link>

				{!isAuthPage && user && (
					<Link
						href="/dashboard"
						className={`nav__item ${pathname === "/dashboard" && "selected"}`}
					>
						Dashboard
					</Link>
				)}

				{!loadingSession ? (
					!isAuthPage ? (
						user ? (
							<div className="nav__auth logged__in">
								<div
									className="wallet__connector"
									onClick={connectWithBlockchainNetwork}
								>
									<IoIosWallet className="icon" />

									<div
										className={`indicator ${
											address ? "connected" : "disconnected"
										}`}
									></div>
								</div>

								<Image
									className="avatar"
									src="/images/user-image.jpg"
									width={33}
									height={33}
									alt=""
									onClick={() => dispatch(setDrawerDisplayed(!drawerDisplayed))}
								/>
							</div>
						) : (
							<div className="nav__auth logged__out">
								<div
									className="navAuth__button transparent"
									onClick={() => navigateToAuth("login")}
								>
									Login
								</div>

								<div
									className="navAuth__button"
									onClick={() => navigateToAuth("register")}
								>
									Register <EastIcon className="icon" />
								</div>
							</div>
						)
					) : (
						<div className="nav__auth logged__out"></div>
					)
				) : (
					<Image
						className="loading__gif"
						src="/loading-gif.gif"
						width={80}
						height={80}
						alt=""
					/>
				)}
			</motion.div>

			{drawerDisplayed && (
				<motion.div
					className="drawer__container"
					variants={drawerAnim}
					initial="hidden"
					animate="show"
				>
					<Drawer />
				</motion.div>
			)}
		</div>
	);
};

export default Navbar;
