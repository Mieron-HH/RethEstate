"use client";

import { use, useEffect, useState } from "react";
import "./_navbar.scss";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { motion } from "framer-motion";

// COMPONENTS
import { Avatar } from "@mui/material";

// ICONS
import { IoIosWallet } from "react-icons/io";
import EastIcon from "@mui/icons-material/East";

// ACTIONS
import { setAuthAction } from "@/libs/slices/common-slice";

// ANIMATIONS
import { navLogoAnim, navLinksAnim } from "@/libs/animations";

const Navbar = () => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { user, animateNavbar } = useAppSelector((state) => state.common);
	const [isAuthPage, setIsAuthPage] = useState(false);

	useEffect(() => {
		setIsAuthPage(() => (pathname === "/auth" ? true : false));
	}, []);

	const navigateToHome = () => {
		if (pathname !== "/") router.push("/");
	};

	const navigateToAuth = (action: "login" | "register") => {
		dispatch(setAuthAction(action));

		router.push("/auth");
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
					<div
						className={`nav__item ${pathname === "/dashboard" && "selected"}`}
					>
						Dashboard
					</div>
				)}

				{!isAuthPage ? (
					user ? (
						<div className="nav__auth logged__in">
							<div className="wallet__connector">
								<IoIosWallet className="icon" />
							</div>

							<Avatar className="avatar" src="/images/user-image.jpg" />
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
				)}
			</motion.div>
		</div>
	);
};

export default Navbar;
