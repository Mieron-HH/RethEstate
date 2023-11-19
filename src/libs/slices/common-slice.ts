import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";

// INTERFACES
import {
	IUser,
	ICommonInitialState,
	IToast,
	TDashboardComponent,
} from "../interfaces";

const initialState: ICommonInitialState = {
	user: null,
	animateNavbar: true,
	authAction: "login",
	provider: null,
	signer: null,
	toast: {
		type: "",
		message: "",
	},
	drawerDisplayed: false,
	dashboardComponent: "myProperty",
	siteLoaded: false,
	sessionAvailable: true,
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
		setToast: (state, action: PayloadAction<IToast>) => {
			state.toast = action.payload;
		},
		setDrawerDisplayed: (state, action: PayloadAction<boolean>) => {
			state.drawerDisplayed = action.payload;
		},
		setDashboardComponent: (
			state,
			action: PayloadAction<TDashboardComponent>
		) => {
			state.dashboardComponent = action.payload;
		},
		setSiteLoaded: (state, action: PayloadAction<boolean>) => {
			state.siteLoaded = action.payload;
		},
		setSessionAvailable: (state, action: PayloadAction<boolean>) => {
			state.sessionAvailable = action.payload;
		},
		logout: (state) => {
			state.user = null;
			state.signer = null;
			state.drawerDisplayed = false;
		},
	},
});

export const {
	setUser,
	setAnimateNavbar,
	setAuthAction,
	setProvider,
	setSigner,
	setToast,
	setDrawerDisplayed,
	setDashboardComponent,
	setSiteLoaded,
	setSessionAvailable,
	logout,
} = commonSlice.actions;

export default commonSlice.reducer;
