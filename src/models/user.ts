import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// SERVICES
import { Password } from "@/libs/services/password";

interface UserAttr {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface UserDoc extends UserAttr, mongoose.Document {
	fullName: string;
	version: number;
}

interface UserModel extends UserAttr, mongoose.Model<UserDoc> {
	build(attr: UserAttr): UserDoc;
}

const userSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true, lowercase: true, trim: true },
		lastName: { type: String, required: true, lowercase: true, trim: true },
		publicAddress: {
			type: String,
			required: false,
			lowercase: true,
			trim: true,
		},
		email: { type: String, required: true, lowercase: true, trim: true },
		password: { type: String, required: true },
		SSN: { type: String, required: false },
		phoneNumber: { type: String, required: false, trim: true },
		DOB: { type: Date, required: false },
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.password;
				delete ret.__v;
			},
		},
	}
);

userSchema.index({ email: 1 });
userSchema.set("versionKey", "version");
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.build = (attr: UserAttr) => {
	return new User(attr);
};

userSchema.virtual("fullName").get(function (this: UserDoc) {
	return `${this.firstName} ${this.lastName}`;
});

userSchema.pre("save", async function (this: UserDoc, done) {
	if (this.isModified("password")) {
		const hashed = await Password.toHash(this.get("password"));
		this.set("password", hashed);

		done();
	}
});

const User =
	mongoose.models.User ||
	mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
