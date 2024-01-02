import axios, { AxiosError, AxiosResponse } from "axios";

// INTERFACES
import { ApiResponse, IInitialPropertyData } from "../interfaces";

// CONSTANTS
import { BASE_URL } from "../constants";

export const getCurrentUser = async () => {
	const response = await fetch(BASE_URL + "/api/auth/currentUser");
	const result = await response.json();

	if (response.ok) return result.user;

	return null;
};

export const createProperty = async (
	initialPropertyData: IInitialPropertyData
) => {
	try {
		const response = await fetch(BASE_URL + "/api/property/create", {
			method: "POST",
			body: JSON.stringify(initialPropertyData),
		});

		const result = await response.json();

		if (response.ok) return { data: result, error: "" };
		else return { data: null, error: result.error };
	} catch (err) {
		console.log({ err });
		return { data: null, error: "Something went wrong. Please try again." };
	}
};
