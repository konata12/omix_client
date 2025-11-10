import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	formDefaultValues: false,
};

const navigationSlice = createSlice({
	name: "navigation",
	initialState,
	reducers: {
		setFormDefaultValuesNavigation(state, action: { payload: boolean }) {
			state.formDefaultValues = action.payload;
		},
	},
});

export const { setFormDefaultValuesNavigation } = navigationSlice.actions;

export default navigationSlice.reducer;
