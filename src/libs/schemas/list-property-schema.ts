import { z } from "zod";

const listPropertySchema = z.object({
	introduction: z
		.string()
		.min(3, { message: "Introduction is required" })
		.refine((val) => val.length <= 50, { message: "Maximum 50 characters" }),
	description: z
		.string()
		.min(3, { message: "Description is required" })
		.refine((val) => val.length <= 500, { message: "Maximum 500 characters" }),
	price: z
		.string()
		.refine(
			(val) => {
				const parsedValue = parseFloat(val);
				return !isNaN(parsedValue);
			},
			{
				message: "Price must be a valid number",
			}
		)
		.refine(
			(val) => {
				const parsedValue = parseFloat(val);
				return parsedValue > 0;
			},
			{ message: "Price must be greater than zero" }
		),
	downPayment: z
		.string()
		.refine(
			(val) => {
				const parsedValue = parseFloat(val);
				return !isNaN(parsedValue);
			},
			{
				message: "Price must be a valid number",
			}
		)
		.refine(
			(val) => {
				const parsedValue = parseFloat(val);
				return parsedValue > 0;
			},
			{ message: "Price must be greater than zero" }
		),
	size: z
		.string()
		.refine(
			(val) => {
				const parsedValue = parseFloat(val);
				return !isNaN(parsedValue);
			},
			{
				message: "Size must be a valid number",
			}
		)
		.refine(
			(val) => {
				const parsedValue = parseFloat(val);
				return parsedValue > 0;
			},
			{ message: "Size must be greater than zero" }
		),
	street: z
		.string()
		.min(10, { message: "Valid street address required" })
		.refine((val) => val.length <= 200, { message: "Street address too long" }),
	city: z
		.string()
		.min(4, { message: "City required" })
		.refine((val) => val.length <= 30, { message: "City name too long" }),
	state: z
		.string()
		.min(2, { message: "State required" })
		.refine((val) => val.length === 2, {
			message: "Provide an abbreviated two letter state name",
		}),
	zipCode: z.string().refine((val) => /^\d{5}$/.test(val), {
		message: "ZIP code must be a 5-digit number.",
	}),
});

export default listPropertySchema;
