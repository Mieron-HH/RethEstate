"use client";

import { useState } from "react";
import "./_register.scss";
import { useAppDispatch } from "@/libs/hooks";

// ACTIONS
import { setAuthAction } from "@/libs/slices/common-slice";

// ICONS
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
	const dispatch = useAppDispatch();

	const [passwordVisible, setPasswordVisible] = useState(false);

	const switchToRegister = () => {
		dispatch(setAuthAction("login"));
	};

	const changePasswordVisibility = () => {
		setPasswordVisible((previous) => !previous);
	};

	return (
		<div className="register__component">
			<div className="header">Register</div>

			<div className="form__switcher">
				Already have an account? <span onClick={switchToRegister}>Log-in</span>
			</div>

			<div className="register__form">
				<div className="input__group">
					<input
						type="text"
						className="input__field"
						placeholder="First name"
					/>
				</div>

				<div className="input__group">
					<input type="text" className="input__field" placeholder="Last name" />
				</div>

				<div className="input__group">
					<input type="text" className="input__field" placeholder="Email" />
				</div>

				<div className="input__group">
					<input
						type={passwordVisible ? "text" : "password"}
						className="input__field"
						placeholder="Password"
					/>

					<div className="input__icon" onClick={changePasswordVisibility}>
						{passwordVisible ? (
							<VisibilityIcon className="icon clickable" />
						) : (
							<VisibilityOffIcon className="icon clickable" />
						)}
					</div>
				</div>

				<div className="submit__button">Register</div>
			</div>
		</div>
	);
};

export default Register;
