import "./_dashboard_drawer.scss";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// COMPONENTS
import { Avatar } from "@mui/material";

// ACTIONS
import {
	setToast,
	logout,
	setDashboardComponent,
} from "@/libs/slices/common-slice";

// ICONS
import { BsFillHouseAddFill, BsFillHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { IoMdHeart, IoMdSettings } from "react-icons/io";
import { RiLogoutCircleRFill } from "react-icons/ri";

// TYPES
import { TDashboardComponent } from "@/libs/interfaces";

// CONSTANTS
import { BASE_URL } from "@/libs/constants";

const DashboardDrawer = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { user, dashboardComponent } = useAppSelector((state) => state.common);

	const selectDashboardComponent = (
		dashboardComponent: TDashboardComponent
	) => {
		dispatch(setDashboardComponent(dashboardComponent));
	};

	const logoutUser = async () => {
		const response = await fetch(BASE_URL + "/api/auth/signout");
		if (response.ok) {
			dispatch(logout());

			router.replace("/");

			dispatch(
				setToast({ type: "success", message: "Successfully logged out" })
			);
		} else {
			dispatch(setToast({ type: "error", message: "Error logging out" }));
		}
	};

	return (
		<div className="dashboardDrawer__component">
			<Link className="logo" href="/">
				<Image
					className="light"
					src="/logo-light-theme.png"
					quality={100}
					width={80}
					height={70}
					alt=""
				/>
				<Image
					className="dark"
					src="/logo-dark-theme.png"
					quality={100}
					width={80}
					height={70}
					alt=""
				/>
			</Link>

			<div className="drawer__menu">
				<div
					className={`menu__item ${
						dashboardComponent === "myProperty" && "selected"
					}`}
					onClick={() => selectDashboardComponent("myProperty")}
				>
					<BsFillHouseFill className="icon" /> My Properties
				</div>

				<div
					className={`menu__item ${
						dashboardComponent === "listProperty" && "selected"
					}`}
					onClick={() => selectDashboardComponent("listProperty")}
				>
					<BsFillHouseAddFill className="icon" /> List Property
				</div>

				<div
					className={`menu__item ${
						dashboardComponent === "liked" && "selected"
					}`}
					onClick={() => selectDashboardComponent("liked")}
				>
					<IoMdHeart className="icon" /> Liked
				</div>
			</div>

			<div className="drawer__menu">
				<div
					className={`menu__item ${
						dashboardComponent === "profile" && "selected"
					}`}
					onClick={() => selectDashboardComponent("profile")}
				>
					<FaUser className="icon" /> Profile
				</div>

				<div
					className={`menu__item ${
						dashboardComponent === "settings" && "selected"
					}`}
					onClick={() => selectDashboardComponent("settings")}
				>
					<IoMdSettings className="icon" /> Settings
				</div>

				<div
					className={`menu__item ${dashboardComponent === "" && "selected"}`}
					onClick={logoutUser}
				>
					<RiLogoutCircleRFill className="icon" /> Logout
				</div>
			</div>

			{user && (
				<div className="user">
					<Avatar className="avatar" src="/images/user-image.jpg" />

					<div className="user__detail">
						<div className="name">
							{user.firstName} {user.lastName}
						</div>

						<div className="email">{user.email}</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardDrawer;
