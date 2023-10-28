"use client";

import "./_page.scss";
import { useAppSelector } from "@/libs/hooks";

// COMPONENTS
import Navbar from "@/components/Navbar/navbar";
import Slider from "@/components/Slider/slider";

const Auth = () => {
	const { authAction } = useAppSelector((state) => state.common);

	return (
		<div className="auth">
			<Navbar />

			<div className="auth__body">
				<div className="forms__container">
					<div className={`slider ${authAction}`}>
						<Slider />
					</div>

					<div className="register__container"></div>

					<div className="login__container"></div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
