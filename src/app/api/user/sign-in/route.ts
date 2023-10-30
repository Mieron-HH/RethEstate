import { connect } from "../../../../libs/mongodb";

// MODELS
import { User } from "../../../../models/user";

// SCHEMAS
import signInSchema from "../../../../libs/schemas/signin-schema";

// SERVICES
import { Password } from "../../../../libs/services/password";

export async function POST(req: Request) {
	const { email, password } = await req.json();

	const result = signInSchema.safeParse({ email, password });

	if (result.success === false)
		return Response.json({ error: result.error.message }, { status: 400 });

	try {
		await connect();

		const existingUser = await User.findOne({ email });

		if (!existingUser)
			return Response.json({ error: "Invalid credentials" }, { status: 400 });

		if (!(await Password.compare(password, existingUser.password)))
			return Response.json({ error: "Invalid credentials" }, { status: 400 });

		return Response.json(existingUser, { status: 200 });
	} catch (error) {
		return Response.json(
			{ error: "Something went wrong. Please try again." },
			{ status: 500 }
		);
	}
}

// export default signInMiddleware(POST, signInSchema);
