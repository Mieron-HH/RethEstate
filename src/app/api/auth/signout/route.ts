import { serialize } from "cookie";

// CONSTANTS
import { COOKIE_NAME } from "@/libs/constants";

export async function GET() {
	const serialized = serialize(COOKIE_NAME, "", {
		maxAge: -1,
	});

	return Response.json(
		{ success: true },
		{
			status: 201,
			headers: {
				"Set-Cookie": serialized,
			},
		}
	);
}
