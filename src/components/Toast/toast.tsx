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

const Toast = () => {
	const dispatch = useAppDispatch();
	const { toast } = useAppSelector((state) => state.common);

	useEffect(() => {
		if (toast.type !== "")
			setTimeout(() => dispatch(setToast({ type: "", message: "" })), 8000);
	}, [toast]);

	return (
		toast.type !== "" && (
			<motion.div
				className={`toast__component ${toast.type}`}
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
		)
	);
};

export default Toast;
