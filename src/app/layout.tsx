import type { Metadata } from "next";
import { Forum } from "next/font/google";
import Providers from "@/libs/provider";

const forum = Forum({
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "RethEstate",
	description: "NFT powered Real Estate",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={forum.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
