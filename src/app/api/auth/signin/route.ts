import { serialize } from "cookie";

// MODELS
import { User } from "@/models/user";

// SCHEMAS
import signInSchema from "@/libs/schemas/signin-schema";

// SERVICES
import { connect } from "@/libs/connect";
import { Password } from "@/libs/services/password";
import { signJWT } from "@/libs/services/jwt";

// CONSTANTS
import { COOKIE_NAME, COOKIE_MAX_AGE } from "@/libs/constants";

interface RequestBody {
	email: string;
	password: string;
}

export async function POST(req: Request) {
	const body: RequestBody = await req.json();

	const result = signInSchema.safeParse(body);

	if (result.success === false)
		return Response.json({ error: result.error.message }, { status: 400 });

	try {
		console.log("-----------signin-----------");
		await connect();

		const existingUser = await User.findOne({ email: body.email });

		if (
			existingUser &&
			(await Password.compare(body.password, existingUser.password))
		) {
			const userData = {
				_id: existingUser._id,
				email: existingUser.email,
			};

			const accessToken = signJWT(userData);

			const serialized = serialize(COOKIE_NAME, accessToken, {
				secure: process.env.NODE_ENV === "production",
				maxAge: COOKIE_MAX_AGE,
				httpOnly: true,
				path: "/api",
			});

			return Response.json(
				{ user: existingUser },
				{
					status: 200,
					headers: {
						"Set-Cookie": serialized,
					},
				}
			);
		}

		return Response.json(null, {
			status: 401,
		});
	} catch (error) {
		return Response.json(
			{ error: "Something went wrong. Please try again." },
			{ status: 500 }
		);
	}
}
