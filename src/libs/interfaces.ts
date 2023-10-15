export interface IUser {
	id: number;
	name: string;
	email: string;
	isActive: boolean;
}

export interface IInitialState {
	user: IUser | null;
}
