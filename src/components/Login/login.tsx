"use client";

import { useState } from "react";
import "./_login.scss";
import { useAppDispatch } from "@/libs/hooks";

// ACTIONS
import { setAuthAction } from "@/libs/slices/common-slice";

// ICONS
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
	const dispatch = useAppDispatch();

	const [passwordVisible, setPasswordVisible] = useState(false);

	const switchToRegister = () => {
		dispatch(setAuthAction("register"));
	};

	const changePasswordVisibility = () => {
		setPasswordVisible((previous) => !previous);
	};

	return (
		<div className="login__component">
			<div className="header">Login</div>

			<div className="form__switcher">
				Don&apos;t have an account?{" "}
				<span onClick={switchToRegister}>Create an account</span>
			</div>

			<div className="login__form">
				<div className="input__group">
					<input type="text" className="input__field" placeholder="Email" />

					<div className="input__icon">
						<PersonIcon className="icon" />
					</div>
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

				<div className="submit__button">Sign In</div>

				<div className="forgot__password">Forgot password?</div>
			</div>
		</div>
	);
};

export default Login;
