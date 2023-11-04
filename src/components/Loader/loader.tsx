"use client";

import { useEffect } from "react";
import "./_loader.scss";
import { useAppDispatch } from "@/libs/hooks";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ethers } from "ethers";
import Image from "next/image";

// ACTIONS
import { setProvider, setSigner } from "@/libs/slices/common-slice";

const Loader = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		if (session && session.user) connectWithBlockchain();

		if (status !== "loading" && (!session || !session.user))
			router.replace("/");
	}, [status]);

	const connectWithBlockchain = async () => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);

			await provider.send("eth_requestAccounts", []);
			dispatch(setProvider(provider));

			const signer = await provider.getSigner();
			dispatch(setSigner(signer));

			setTimeout(() => router.replace("/"), 1500);
		} catch (error) {
			console.log(error);
			router.replace("/");
		}
	};

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
