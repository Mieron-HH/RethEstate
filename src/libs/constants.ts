export const COOKIE_NAME: string = "RETHESATE";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
export const BASE_URL =
	process.env.NODE_ENV !== "production"
		? "http://localhost:3000"
		: "https://rethestate-nft.vercel.app";
