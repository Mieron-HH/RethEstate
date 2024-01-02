import { cookies } from "next/headers";

// MODELS
import { User } from "@/libs/models/user";

// SERVICES
import { verifyJWT } from "./jwt";

// CONSTANTS
import { COOKIE_NAME } from "@/libs/constants";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const userFromJwt = async (accessToken: RequestCookie | undefined) => {
	try {
		if (!accessToken) return null;

		const userData = verifyJWT(accessToken.value);
		if (!userData) return null;

		const user = await User.findById(userData._id);
		if (!user || user.email !== userData.email) return null;

		return userData;
	} catch (error) {
		return null;
	}
};

export default userFromJwt;
