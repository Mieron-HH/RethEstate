import mongoose from "mongoose";

export const connect = async () => {
	if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
		throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
	}

	try {
		await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
			dbName: "RethState",
		});

		console.log("Connected to MongoDB");
	} catch (error) {
		throw new Error("Error connecting to the database");
	}
};
