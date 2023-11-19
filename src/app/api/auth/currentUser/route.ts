import { cookies } from "next/headers";

// MODELS
import { User } from "@/models/user";

// SERVICES
import { verifyJWT } from "@/libs/services/jwt";

// CONSTANTS
import { COOKIE_NAME } from "@/libs/constants";

export async function GET() {
	const cookieStore = cookies();

	const accessToken = cookieStore.get(COOKIE_NAME);
	if (!accessToken)
		return Response.json(
			{
				error: "Unauthorized",
			},
			{
				status: 401,
			}
		);

	const user = verifyJWT(accessToken.value);
	if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

	const existingUser = await User.findById(user._id);
	if (!existingUser || existingUser.email !== user.email)
		return Response.json({ error: "Unauthorized" }, { status: 401 });

	return Response.json({ user: existingUser }, { status: 200 });
}
