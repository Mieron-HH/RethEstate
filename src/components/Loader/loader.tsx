"use client";

import { useEffect } from "react";
import "./_loader.scss";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ACTIONS
import { setSessionAvailable, setUser } from "@/libs/slices/common-slice";

// SERVICES
import { getCurrentUser } from "@/libs/services/api-calls";

const Loader = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { user } = useAppSelector((state) => state.common);

	useEffect(() => {
		(async () => {
			if (!user) {
				const user = await getCurrentUser();

				if (user) dispatch(setUser(user));
				else dispatch(setSessionAvailable(false));
			}

			setTimeout(() => router.replace("/"), 2000);
		})();
	}, []);

	return (
		<div className="loader__copmonent">
			<div className="logo">
				<Image
					className="light"
					src="/logo-light-theme.png"
					quality={100}
					width={80}
					height={80}
					alt=""
				/>

				<Image
					className="dark"
					src="/logo-dark-theme.png"
					quality={100}
					width={80}
					height={80}
					alt=""
				/>
			</div>
		</div>
	);
};

export default Loader;
