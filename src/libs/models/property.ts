import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export interface IMetadataAttr {
	ipnft: string;
	url: string;
}

export interface IImageAttr {
	type: string;
	data: Buffer;
}

interface PropertyAttr {
	metadata?: IMetadataAttr;
	seller: string;
	tokenID?: string;
	nftOwner?: string;
	buyer?: string;
	minted: boolean;
	listed: boolean;
	locked: boolean;
	sold: boolean;
	cancelled: boolean;
	catchy: string;
	description: string;
	category: string;
	price: string;
	downPayment: string;
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
	likes: string[];
	views: number;
}

export interface PropertyDoc extends PropertyAttr, mongoose.Document {
	version: number;
}

interface PropertyModel extends mongoose.Model<PropertyDoc> {
	build(attr: PropertyAttr): PropertyDoc;
}

const propertySchema = new mongoose.Schema(
	{
		metadata: { type: Object, required: false },
		seller: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: "User",
		},
		tokenID: { type: Number, required: false },
		street: { type: String, required: true, lowercase: true, trim: true },
		city: { type: String, required: true, lowercase: true, trim: true },
		price: { type: String, required: true },
		state: { type: String, required: true, lowercase: true, trim: true },
		zipCode: { type: String, required: true },
		downPayment: { type: String, required: false },
		size: { type: String, required: true },
		bedrooms: { type: String, required: true },
		bathrooms: { type: String, required: true },
		nftOwner: { type: String, required: false, lowercase: true, trim: true },
		thumbnail: { type: Object, required: false },
		images: { type: [Object], required: false },
		minted: { type: Boolean, required: true },
		mintedAt: { type: Date, required: false },
		listed: { type: Boolean, required: true },
		listedAt: { type: Date, required: false },
		locked: { type: Boolean, required: true },
		lockedAt: { type: Date, required: false },
		sold: { type: Boolean, required: true },
		soldAt: { type: Date, required: false },
		cancelled: { type: Boolean, required: true },
		likes: { type: [String], required: true },
		views: { type: Number, required: true },
		buyer: { type: mongoose.Types.ObjectId, required: false, ref: "User" },
		createdAt: { type: Date, default: Date.now },
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.__v;
			},
		},
	}
);

propertySchema.index({ tokenID: 1 });
propertySchema.set("versionKey", "version");
propertySchema.plugin(updateIfCurrentPlugin);

propertySchema.statics.build = (attr: PropertyAttr) => {
	return new Property(attr);
};

const Property =
	mongoose.models.Property ||
	mongoose.model<PropertyDoc, PropertyModel>("Property", propertySchema);

export { Property };
