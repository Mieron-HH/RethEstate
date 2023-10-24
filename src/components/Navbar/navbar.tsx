"use client";

import "./_navbar.scss";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/libs/hooks";
import { motion } from "framer-motion";

// COMPONENTS
import { Avatar } from "@mui/material";

// ICONS
import { IoIosWallet } from "react-icons/io";
import EastIcon from "@mui/icons-material/East";

// ANIMATIONS
import { navLogoAnim, navLinksAnim } from "@/libs/animations";

const Navbar = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { user, animateNavbar } = useAppSelector((state) => state.common);

	const navigateToHome = () => {
		if (pathname !== "/") router.push("/");
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
				{user && (
					<div
						className={`nav__item ${pathname === "/dashboard" && "selected"}`}
					>
						Dashboard
					</div>
				)}

				{user ? (
					<div className="nav__auth logged__in">
						<div className="wallet__connector">
							<IoIosWallet className="icon" />
						</div>

						<Avatar className="avatar" src="/images/user-image.jpg" />
					</div>
				) : (
					<div className="nav__auth logged__out">
						<div className="navAuth__button transparent">Login</div>

						<div className="navAuth__button ">
							Register <EastIcon className="icon" />
						</div>
					</div>
				)}
			</motion.div>
		</div>
	);
};

export default Navbar;
