import { z } from "zod";

const signInSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Invalid email address" }),
	password: z.string().min(1, { message: "Password is required" }),
});

export default signInSchema;
