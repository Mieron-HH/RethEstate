import { connect } from "@/libs/mongodb";

// MODELS
import { User } from "@/models/user";

// SCHEMAS
import signInSchema from "@/libs/schemas/signin-schema";

// SERVICES
import { Password } from "@/libs/services/password";
import { signJWT } from "@/libs/services/jwt";

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
		await connect();

		const existingUser = await User.findOne({ email: body.email });

		if (
			existingUser &&
			(await Password.compare(body.password, existingUser.password))
		) {
			const userData = {
				_id: existingUser._id,
				firstName: existingUser.firstName,
				lastName: existingUser.lastName,
				email: existingUser.email,
			};

			const accessToken = signJWT(userData);

			const result = { ...userData, accessToken };

			return Response.json(result);
		}

		return Response.json(null, { status: 401 });
	} catch (error) {
		return Response.json(
			{ error: "Something went wrong. Please try again." },
			{ status: 500 }
		);
	}
}
