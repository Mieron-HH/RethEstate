import { createSlice } from "@reduxjs/toolkit";

// INERFACES
import { IPropertyInitialState } from "../interfaces";

const initialState: IPropertyInitialState = {
	street: "",
	city: "",
	stateEntry: "",
	zipCode: "",
	bedroomNumber: "",
	bathroomNumber: "",
	price: 0,
	minPrice: 0,
	maxPrice: 0,
	size: 0,
	minSize: 0,
	maxSize: 0,
};

export const propertySlice = createSlice({
	name: "property",
	initialState,
	reducers: {
		setStreet: (state, action) => {
			state.street = action.payload;
		},
		setCity: (state, action) => {
			state.city = action.payload;
		},
		setStateEntry: (state, action) => {
			state.stateEntry = action.payload;
		},
		setZipCode: (state, action) => {
			state.zipCode = action.payload;
		},
		setBedroomNumber: (state, action) => {
			state.bedroomNumber = action.payload;
		},
		setBathroomNumber: (state, action) => {
			state.bathroomNumber = action.payload;
		},
		setPrice: (state, action) => {
			state.price = action.payload;
		},
		setSize: (state, action) => {
			state.size = action.payload;
		},
		setMinPrice: (state, action) => {
			state.minPrice = action.payload;
		},
		setMaxPrice: (state, action) => {
			state.maxPrice = action.payload;
		},
		setMinSize: (state, action) => {
			state.minSize = action.payload;
		},
		setMaxSize: (state, action) => {
			state.maxSize = action.payload;
		},
	},
});

export const {
	setStreet,
	setCity,
	setStateEntry,
	setZipCode,
	setBedroomNumber,
	setBathroomNumber,
	setPrice,
	setSize,
	setMinPrice,
	setMaxPrice,
	setMinSize,
	setMaxSize,
} = propertySlice.actions;

export default propertySlice.reducer;
