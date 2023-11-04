import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";

// INTERFACES
import { IUser, ICommonInitialState } from "../interfaces";

const initialState: ICommonInitialState = {
	user: null,
	animateNavbar: true,
	authAction: "login",
	provider: null,
	signer: null,
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
		setProvider: (
			state,
			action: PayloadAction<ethers.BrowserProvider | null>
		) => {
			state.provider = action.payload;
		},
		setSigner: (state, action: PayloadAction<ethers.JsonRpcSigner | null>) => {
			state.signer = action.payload;
		},
	},
});

export const {
	setUser,
	setAnimateNavbar,
	setAuthAction,
	setProvider,
	setSigner,
} = commonSlice.actions;

export default commonSlice.reducer;
