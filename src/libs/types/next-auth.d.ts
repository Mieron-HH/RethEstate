import NextAuth from "next-auth";

declare module "next-auth" {
	interface Session {
		accessToken?: string;
		user: {
			_id: number;
			firstName: string;
			lastName: string;
			email: string;
		};
	}
}
