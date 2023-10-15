import { configureStore } from "@reduxjs/toolkit";

// REDUCERS
import commonSlice from "./slices/common-slice";

export const store: any = configureStore({
	reducer: {
		common: commonSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
