import { HeatGeneratorFormsState } from "@/app/types/data/products/heat_generators/heat_generators.type";
import { heatGeneratorCommonReducers } from "@/app/utils/redux/products/heat_generators/forms/heatGeneratorsFormsReducers";
import { heatGeneratorsFormsInitialState } from "@/app/utils/redux/products/heat_generators/forms/heatGeneratorsFormsState";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const initialState: HeatGeneratorFormsState = _.cloneDeep(heatGeneratorsFormsInitialState);

export const householdHeatGeneratorFormsSlice = createSlice({
	name: "householdHeatGeneratorForms",
	initialState,
	reducers: {
		...heatGeneratorCommonReducers,
	},
});

export const {
	setFormValues,
	setStringValue,
	deleteImageArrayValue,
	pushImageArrayValues,
	setNotStepperValue,
	setStepperValue,
	handleCheckbox,
	setInputErrorValue,
	clearForm,
} = householdHeatGeneratorFormsSlice.actions;
export default householdHeatGeneratorFormsSlice.reducer;
