import { connect } from "@/libs/mongodb";
import { serialize } from "cookie";

// MODELS
import { User } from "@/models/user";

// SCHEMAS
import signupSchema from "@/libs/schemas/signup-shema";

// SERVICES
import { signJWT } from "@/libs/services/jwt";

// CONSTANTS
import { COOKIE_NAME, COOKIE_MAX_AGE } from "@/libs/constants";

interface RequestBody {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export async function POST(req: Request) {
	const body: RequestBody = await req.json();

	const result = signupSchema.safeParse(body);

	if (result.success === false)
		return Response.json({ error: result.error.message }, { status: 400 });

	try {
		await connect();

		const existingUser = await User.findOne({ email: body.email });

		if (existingUser)
			return Response.json(
				{ error: "User already exists with this email." },
				{ status: 400 }
			);

		// @ts-ignore
		const newUser = User.build({
			firstName: body.firstName,
			lastName: body.lastName,
			email: body.email,
			password: body.password,
		});

		await newUser.save();

		const userData = {
			_id: newUser._id,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email: newUser.email,
		};

		const accessToken = signJWT(userData);

		const serialized = serialize(COOKIE_NAME, accessToken, {
			secure: process.env.NODE_ENV === "production",
			maxAge: COOKIE_MAX_AGE,
			httpOnly: true,
			path: "/api",
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
	} catch (error) {
		return Response.json(
			{ error: "Something went wrong. Please try again." },
			{ status: 500 }
		);
	}
}
