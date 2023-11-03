"use client";

import { useState } from "react";
import "./_register.scss";
import { useAppDispatch } from "@/libs/hooks";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

// ACTIONS
import { setAuthAction } from "@/libs/slices/common-slice";

// ICONS
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import signupSchema from "@/libs/schemas/signup-shema";

type Inputs = z.infer<typeof signupSchema>;

const Register = () => {
	const dispatch = useAppDispatch();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const BASE_URL =
		process.env.NODE_ENV !== "production"
			? "http://localhost:3000"
			: "https://rethestate-nft.vercel.app";
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Inputs>({
		resolver: zodResolver(signupSchema),
	});

	const switchToLogin = () => {
		if (loading) return;

		reset();
		setErrorMessage("");

		dispatch(setAuthAction("login"));
	};

	const changePasswordVisibility = () => {
		setPasswordVisible((previous) => !previous);
	};

	const registerUser: SubmitHandler<Inputs> = async (data) => {
		setLoading(true);
		const body = JSON.stringify(data);

		try {
			const response = await fetch(BASE_URL + "/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body,
			});

			const result = await response.json();

			if (response.ok && result.success) switchToLogin();
			else if (result.error) setErrorMessage(result.error);
		} catch (error) {
			setErrorMessage("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="register__component">
			<div className="header">Register</div>

			<div className="form__switcher">
				Already have an account?{" "}
				<span className={`${loading && "disabled"}`} onClick={switchToLogin}>
					Log-in
				</span>
			</div>

			<form className="register__form" onSubmit={handleSubmit(registerUser)}>
				{errorMessage !== "" && (
					<div className="error__message">{errorMessage}</div>
				)}

				<div className="input__group">
					<input
						type="text"
						className="input__field"
						{...register("firstName")}
						placeholder="First name"
						autoComplete="off"
					/>

					<p className="input__error">{errors.firstName?.message}</p>
				</div>

				<div className="input__group">
					<input
						type="text"
						className="input__field"
						{...register("lastName")}
						placeholder="Last name"
						autoComplete="off"
					/>

					<p className="input__error">{errors.lastName?.message}</p>
				</div>

				<div className="input__group">
					<input
						type="email"
						className="input__field"
						{...register("email")}
						placeholder="Email"
						autoComplete="off"
					/>

					<p className="input__error">{errors.email?.message}</p>
				</div>

				<div className="input__group">
					<input
						type={passwordVisible ? "text" : "password"}
						className="input__field"
						{...register("password")}
						placeholder="Password"
						autoComplete="off"
					/>

					<div className="input__icon" onClick={changePasswordVisibility}>
						{passwordVisible ? (
							<VisibilityIcon className="icon clickable" />
						) : (
							<VisibilityOffIcon className="icon clickable" />
						)}
					</div>

					<p className="input__error">{errors.password?.message}</p>
				</div>

				<button
					type="submit"
					className={`register__button ${loading && "disabled"}`}
					disabled={loading}
				>
					Register
					{loading && (
						<Image
							className="loading__gif"
							src="/spinning-gif.gif"
							width={17}
							height={17}
							alt=""
						/>
					)}
				</button>
			</form>
		</div>
	);
};

export default Register;
