"use client";

import { useEffect, useState } from "react";
import "./_loader.scss";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import Image from "next/image";

// ACTIONS
import { setProvider, setSigner, setUser } from "@/libs/slices/common-slice";

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

				if (user) {
					dispatch(setUser(user));
					connectWithBlockchain();
				}
			} else {
				connectWithBlockchain();
			}
		})();
	}, []);

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
