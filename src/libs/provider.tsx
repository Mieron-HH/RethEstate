"use client";

import { Provider } from "react-redux";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { store } from "./store";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<ThirdwebProvider
				activeChain="ethereum"
				clientId="27d77456f0d9f116e107a10b0c078f20"
			>
				{children}
			</ThirdwebProvider>
		</Provider>
	);
}
