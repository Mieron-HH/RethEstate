import { connect } from "@/libs/mongodb";

// MODELS
import { User } from "@/models/user";

// SCHEMAS
import signupSchema from "@/libs/schemas/signup-shema";

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

		return Response.json({ success: true }, { status: 201 });
	} catch (error) {
		return Response.json(
			{ error: "Something went wrong. Please try again." },
			{ status: 500 }
		);
	}
}
