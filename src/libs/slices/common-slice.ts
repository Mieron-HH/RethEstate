import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// INTERFACES
import { IUser, IInitialState } from "../interfaces";

const initialState: IInitialState = {
	user: null,
};

const commonSlice = createSlice({
	name: "common",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser | null>) => {
			state.user = action.payload;
		},
	},
});

export const { setUser } = commonSlice.actions;

export default commonSlice.reducer;
