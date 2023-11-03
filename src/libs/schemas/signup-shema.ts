import { z } from "zod";

const signupSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: "First name must have at least 2 characters" }),
	lastName: z
		.string()
		.min(2, { message: "Last name must have at least 2 characters" }),
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});

export default signupSchema;
