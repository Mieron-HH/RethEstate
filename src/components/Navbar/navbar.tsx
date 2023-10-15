"use client";

import "./_navbar.scss";
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
	const { user } = useAppSelector((state) => state.common);

	return (
		<div className="home__navbar">
			<motion.div
				className="logo"
				variants={navLogoAnim}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
			>
				<Image src="/logo.png" fill alt="" />
			</motion.div>

			<motion.div
				className="nav__links"
				variants={navLinksAnim}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
			>
				<div className="nav__item">Home</div>
				<div className="nav__item">Explore</div>
				<div className="nav__item">Dashboard</div>

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
