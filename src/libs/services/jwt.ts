import jwt, { Jwt, JwtPayload } from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

interface SignOption {
	expiresIn: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
	expiresIn: "1h",
};

export const signJWT = (
	payload: JwtPayload,
	options: SignOption = DEFAULT_SIGN_OPTION
) => {
	const token = jwt.sign(payload, JWT_SECRET_KEY!, options);

	return token;
};

export const verifyJWT = (token: string) => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET_KEY!);

		return decoded as JwtPayload;
	} catch (error) {
		console.log({ error });

		return null;
	}
};
