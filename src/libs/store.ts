import { configureStore } from "@reduxjs/toolkit";

// REDUCERS
import commonSlice from "./slices/common-slice";
import propertySlice from "./slices/property-slice";

export const store: any = configureStore({
	reducer: {
		common: commonSlice,
		property: propertySlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
