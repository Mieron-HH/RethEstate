import { NextRequest } from "next/server";
import { cookies } from "next/headers";
const sharp = require("sharp");

// MODELS
import { Property } from "@/libs/models/property";

// SERVICES
import { connect } from "@/libs/connect";
import userFromJwt from "@/libs/services/validate-user";

// CONSTANTS
import { COOKIE_NAME } from "@/libs/constants";

export async function POST(req: Request) {
	console.log("-----------upload-images-----------");
	await connect();

	const cookieStore = cookies();
	const user = userFromJwt(cookieStore.get(COOKIE_NAME));
	if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

	const propertyID = req.headers.get("propertyID");
	const existingProperty = await Property.findById(propertyID);
	if (!existingProperty)
		return Response.json({ error: "Property not found" }, { status: 404 });

	const formData = await req.formData();

	// Validating and extracting thumbnail image ---------------

	try {
		const thumbnail = formData.get("thumbnail") as File;
		if (!thumbnail)
			return Response.json(
				{ error: "No thumbnail provided" },
				{ status: 400, statusText: "No thumbnail provided" }
			);
		if (!["image/jpg", "image/jpeg", "image/png"].includes(thumbnail.type))
			return Response.json(
				{
					error:
						"Invalid thumbnail format. Only .jpeg, .jpg, and .png accepted",
				},
				{
					status: 400,
					statusText:
						"Invalid thumbnail format. Only .jpeg, .jpg, and .png accepted",
				}
			);

		existingProperty.set({
			thumbnail: {
				type: thumbnail.type,
				data: await sharp(await thumbnail.arrayBuffer())
					.resize({ width: 500 })
					.toBuffer(),
			},
		});

		await existingProperty.save();

		// Validating and extracting images  ----------------------

		const existingPropertyImages = existingProperty.images;

		const propertyImages = formData.getAll("images") as File[];
		if (propertyImages.length < 3)
			return Response.json(
				{
					error: "Minimum of three property images required",
				},
				{ status: 400, statusText: "Minimum of three property images required" }
			);
		for (let image of propertyImages) {
			if (!["image/jpg", "image/jpeg", "image/png"].includes(image.type))
				return Response.json(
					{
						error: "Invalid image format. Only .jpeg, .jpg, and .png accepted",
					},
					{
						status: 400,
						statusText:
							"Invalid image format. Only .jpeg, .jpg, and .png accepted",
					}
				);
			existingPropertyImages.push({
				type: image.type,
				data: await sharp(await image.arrayBuffer())
					.resize({ width: 500 })
					.toBuffer(),
			});
		}

		existingProperty.set({
			images: existingPropertyImages,
		});

		await existingProperty.save();

		return Response.json({ success: true }, { status: 200 });
	} catch (error) {
		console.log({ error });
		return Response.json(
			{ error: "Error uploading property images" },
			{ status: 500 }
		);
	}
}
