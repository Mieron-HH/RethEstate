import { cookies } from "next/headers";

// MODELS
import { User } from "@/models/user";

// SERVICES
import { verifyJWT } from "./jwt";

// CONSTANTS
import { COOKIE_NAME } from "@/libs/constants";

const userFromJwt = async () => {
	try {
		const accessToken = cookies().get(COOKIE_NAME);
		console.log({ accessToken });
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
