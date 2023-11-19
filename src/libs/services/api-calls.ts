import axios, { AxiosResponse } from "axios";

// INTERFACES
import { ApiResponse } from "../interfaces";

// CONSTANTS
import { BASE_URL } from "../constants";

export const getCurrentUser = async () => {
	const response = await fetch(BASE_URL + "/api/auth/currentUser");
	const result = await response.json();

	if (response.ok) return result.user;

	return null;
};

export const createProperty = async (PostData: any): Promise<ApiResponse> => {
	try {
		const response: AxiosResponse = await axios.post(
			BASE_URL + "/api/property/create",
			PostData,
			{
				withCredentials: true,
			}
		);

		return { data: response.data, error: "" };
	} catch (err) {
		if (axios.isAxiosError(err)) {
			const errorResponse: AxiosResponse | undefined = err.response;

			return {
				data: null,
				error:
					errorResponse?.data.errors[0].message ||
					"Something went wrong. Please try again.",
			};
		} else {
			return {
				data: null,
				error: "Something went wrong. Please try again.",
			};
		}
	}
};
