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

export interface ICommonInitialState {
	user: IUser | null;
	animateNavbar: boolean;
	authAction: string;
	provider: ethers.BrowserProvider | null;
	signer: ethers.JsonRpcSigner | null;
	toast: IToast;
	drawerDisplayed: boolean;
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
