"use client";

import "./_navbar.scss";
import Image from "next/image";
import { useAppSelector } from "@/libs/hooks";

// COMPONENTS
import { Avatar } from "@mui/material";

// ICONS
// import { IoIosWallet } from "react-icons/io";
import EastIcon from "@mui/icons-material/East";
import WalletIcon from "@mui/icons-material/Wallet";

const Navbar = () => {
	const { user } = useAppSelector((state) => state.common);

	return (
		<div className="home__navbar">
			<div className="logo">
				<Image src="/logo.png" fill alt="" />
			</div>

			<div className="nav__links">
				<div className="nav__item">Home</div>
				<div className="nav__item">Explore</div>
				<div className="nav__item">Dashboard</div>

				{user ? (
					<div className="nav__auth logged__in">
						<div className="wallet__connector">
							<WalletIcon className="icon" />
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
			</div>
		</div>
	);
};

export default Navbar;
