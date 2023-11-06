"use client";

import "./_drawer.scss";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { signOut } from "next-auth/react";

// COMPONENTS
import { Avatar } from "@mui/material";

// ACTIONS
import {
	setDrawerDisplayed,
	setToast,
	logout,
} from "@/libs/slices/common-slice";

// ICONS
import {
	AiOutlineCloseCircle,
	AiOutlineLogout,
	AiOutlineSetting,
	AiOutlineUser,
} from "react-icons/ai";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Drawer = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const pathname = usePathname();
	const { user, signer } = useAppSelector((state) => state.common);

	const abstractAddress = (address: string) => {
		return address.slice(0, 6) + ".........." + address.slice(38);
	};

	const copyToClipboard = () => {
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(signer.address)
				.then(() =>
					dispatch(
						setToast({
							type: "success",
							message: "Successfully copied to clipboard",
						})
					)
				)
				.catch(() =>
					dispatch(
						setToast({
							type: "error",
							message: "Failed to copy address to clipboard",
						})
					)
				);
		}
	};

	const logoutUser = () => {
		dispatch(logout());
		dispatch(setDrawerDisplayed(false));
		signOut({ redirect: false })
			.then(() => {
				if (pathname.split("/").pop() === "dashboard") router.replace("/");

				dispatch(
					setToast({ type: "success", message: "Successfully logged out" })
				);
			})
			.catch(() =>
				dispatch(setToast({ type: "error", message: "Error logging out" }))
			);
	};

	return (
		user && (
			<div className="drawer__component">
				<div className="header">
					<div className="user">
						<Avatar className="avatar" src="/images/user-image.jpg" />

						<div className="user__detail">
							<div className="name">{user.firstName}</div>

							<div className="email">{user.email}</div>
						</div>

						<div
							className="close__button"
							onClick={() => dispatch(setDrawerDisplayed(false))}
						>
							<AiOutlineCloseCircle className="icon" />
						</div>
					</div>
				</div>

				<div className="wallet">
					<div className="label">Wallet :</div>
					<div className={`address ${!signer && "not__connected"}`}>
						{signer ? (
							<>
								{abstractAddress(signer.address)}
								<ContentCopyIcon className="icon" onClick={copyToClipboard} />
							</>
						) : (
							"Not connected"
						)}
					</div>
				</div>

				<div className="drawer__menu">
					<div className="menu__item">
						<AiOutlineUser className="icon" /> Profile
					</div>

					<div className="menu__item">
						<AiOutlineSetting className="icon" /> Settings
					</div>

					<div className="separated__menu">
						<div className="menu__item" onClick={logoutUser}>
							<AiOutlineLogout className="icon" /> Logout
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default Drawer;
