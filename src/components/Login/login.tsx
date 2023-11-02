"use client";

import { useEffect, useState } from "react";
import "./_login.scss";
import { useAppDispatch } from "@/libs/hooks";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";

// ACTIONS
import { setUser, setAuthAction } from "@/libs/slices/common-slice";

// ICONS
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// SCHEMAS
import signInSchema from "../../libs/schemas/signin-schema";

type Inputs = z.infer<typeof signInSchema>;

const Login = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { data: session, status } = useSession();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Inputs>({
		resolver: zodResolver(signInSchema),
	});

	useEffect(() => {
		if (session && session.user) {
			reset();

			dispatch(setUser(session!.user));
			router.replace("/");
		}
	}, [status]);

	const switchToRegister = () => {
		if (loading) return;

		reset();
		dispatch(setAuthAction("register"));
	};

	const changePasswordVisibility = () => {
		setPasswordVisible((previous) => !previous);
	};

	const loginUser: SubmitHandler<Inputs> = async (data) => {
		setLoading(true);
		const body = JSON.stringify(data);

		const result = await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
		});

		if (!result?.ok) {
			setLoading(false);
			console.log("Incorrect credentials");
		}

		console.log({ result });
	};

	return (
		<div className="login__component">
			<div className="header">Login</div>

			<div className="form__switcher">
				Don&apos;t have an account?{" "}
				<span className={`${loading && "disabled"}`} onClick={switchToRegister}>
					Create an account
				</span>
			</div>

			<form className="login__form" onSubmit={handleSubmit(loginUser)}>
				<div className="input__group">
					<input
						type="text"
						className="input__field"
						{...register("email")}
						placeholder="Email"
					/>

					<div className="input__icon">
						<PersonIcon className="icon" />
					</div>

					<p className="input__error">{errors.email?.message}</p>
				</div>

				<div className="input__group">
					<input
						type={passwordVisible ? "text" : "password"}
						className="input__field"
						{...register("password")}
						placeholder="Password"
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
					className={`login__button ${loading && "disabled"}`}
					disabled={loading}
				>
					Sign In
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

				<div className="forgot__password">Forgot password?</div>
			</form>
		</div>
	);
};

export default Login;
