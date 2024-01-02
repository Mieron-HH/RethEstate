import { ethers } from "ethers";

export interface IUser {
	_id: number;
	firstName: string;
	lastName: string;
	email: string;
}

export interface IToast {
	type: "" | "success" | "error";
	message: string;
}

export type TDashboardComponent =
	| "myProperty"
	| "listProperty"
	| "liked"
	| "profile"
	| "settings";

export interface ICommonInitialState {
	user: IUser | null;
	animateNavbar: boolean;
	authAction: string;
	toast: IToast;
	drawerDisplayed: boolean;
	dashboardComponent: TDashboardComponent;
	siteLoaded: boolean;
	sessionAvailable: boolean;
}

export interface IPropertyInitialState {
	street: string;
	city: string;
	stateEntry: string;
	zipCode: string;
	bedroomNumber: string;
	bathroomNumber: string;
	price: number;
	minPrice: number;
	maxPrice: number;
	size: number;
	minSize: number;
	maxSize: number;
}

export interface PropertyImage {
	name: string;
	data: string | ArrayBuffer | null;
}

export interface ApiResponse {
	data: any;
	error: string;
}

export interface IInitialPropertyData {
	category:
		| "house"
		| "building"
		| "apartment"
		| "villa"
		| "duplex"
		| "warehouse";
	bedrooms: number;
	bathrooms: number;
	swimmingPool: boolean;
	introduction: string;
	description: string;
	price: string;
	downPayment: string;
	size: string;
	street: string;
	city: string;
	state: string;
	zipCode: string;
}
