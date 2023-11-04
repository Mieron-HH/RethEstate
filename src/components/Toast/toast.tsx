"use client";

import { useEffect } from "react";
import "./_toast.scss";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { motion } from "framer-motion";

// ICONS
import CloseIcon from "@mui/icons-material/Close";
import { setToast } from "@/libs/slices/common-slice";

// ANIMATIONS
import { toastAnim } from "@/libs/animations";

interface IToastType {
	type: "success" | "error";
}

const Toast = ({ type }: { type: IToastType }) => {
	const dispatch = useAppDispatch();
	const { toast } = useAppSelector((state) => state.common);

	useEffect(() => {
		setTimeout(() => dispatch(setToast({ type: "", message: "" })), 8000);
	}, []);

	return (
		<motion.div
			className={`toast__component ${type}`}
			variants={toastAnim}
			initial="hidden"
			animate="show"
		>
			<div className="message__container">{toast.message}</div>

			<div
				className="close__button"
				onClick={() => dispatch(setToast({ type: "", message: "" }))}
			>
				<CloseIcon className="icon" />
			</div>
		</motion.div>
	);
};

export default Toast;
