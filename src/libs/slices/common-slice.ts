import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// INTERFACES
import { IUser, ICommonInitialState } from "../interfaces";

const initialState: ICommonInitialState = {
	user: null,
	animateNavbar: true,
	authAction: "login",
};

const commonSlice = createSlice({
	name: "common",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser | null>) => {
			state.user = action.payload;
		},
		setAnimateNavbar: (state, action: PayloadAction<boolean>) => {
			state.animateNavbar = action.payload;
		},
		setAuthAction: (state, action: PayloadAction<string>) => {
			state.authAction = action.payload;
		},
	},
});

export const { setUser, setAnimateNavbar, setAuthAction } = commonSlice.actions;

export default commonSlice.reducer;
