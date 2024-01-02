import { NextRequest } from "next/server";
import { useStorageUpload } from "@thirdweb-dev/react";
import { cookies } from "next/headers";

// MODELS
import { Property } from "@/libs/models/property";

// SCHEMAS & INTERFACES
import listPropertySchema from "@/libs/schemas/list-property-schema";
import { IMetadataAttr, IImageAttr } from "@/libs/models/property";

// SERVICES
import { connect } from "@/libs/connect";
import userFromJwt from "@/libs/services/validate-user";

// CONSTANTS
import { COOKIE_NAME } from "@/libs/constants";

interface RequestBody {
	metadata?: IMetadataAttr;
	seller?: string;
	tokenID?: string;
	nftOwner?: string;
	buyer?: string;
	minted?: boolean;
	listed?: boolean;
	locked?: boolean;
	sold?: boolean;
	cancelled?: boolean;
	introduction: string;
	description: string;
	category: string;
	price: string;
	bedrooms: string;
	bathrooms: string;
	size: string;
	swimmingPool: boolean;
	street: string;
	city: string;
	state: string;
	zipCode: string;
	thumbnail?: IImageAttr;
	images?: IImageAttr[];
	likes?: string[];
	views?: number;
}

export async function POST(req: Request) {
	console.log("-----------create-----------");
	await connect();

	const cookieStore = cookies();
	const user = await userFromJwt(cookieStore.get(COOKIE_NAME));
	if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

	const body: RequestBody = await req.json();
	body.seller = user._id;
	body.minted = false;
	body.listed = false;
	body.locked = false;
	body.sold = false;
	body.cancelled = false;
	body.views = 0;
	body.likes = [];
	body.images = [];

	const result = listPropertySchema.safeParse(body);
	if (result.success === false)
		return Response.json(
			{ error: JSON.parse(result.error.message) },
			{ status: 400 }
		);

	try {
		// @ts-ignore
		const newProperty = Property.build(body);

		await newProperty.save();

		return Response.json(newProperty, { status: 201 });
	} catch (error) {
		console.log({ error });
		return Response.json(
			{ error: "Error creating propeorty" },
			{ status: 500 }
		);
	}
}
