export interface IUser {
	id: number;
	name: string;
	email: string;
	isActive: boolean;
}

export interface ICommonInitialState {
	user: IUser | null;
	animateNavbar: boolean;
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
