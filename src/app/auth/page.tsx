"use client";

import "./_page.scss";
import { useAppSelector } from "@/libs/hooks";

// COMPONENTS
import Navbar from "@/components/Navbar/navbar";

const Auth = () => {
	const { authAction } = useAppSelector((state) => state.common);

	return (
		<div className="auth">
			<Navbar />

			<div className="auth__body">
				<div className="forms__container">
					<div className={`slider ${authAction}`}></div>

					<div className="register__container"></div>

					<div className="login__container"></div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
