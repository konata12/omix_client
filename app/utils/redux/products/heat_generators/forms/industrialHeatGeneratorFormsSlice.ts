import { HEAT_GENERATOR_TYPES } from "@/app/admin/(provided_with_redux)/(pages)/products/heat_generators/constants";
import { parseHeatGeneratorResponse } from "@/app/services/admin/products/heat_generators.service";
import { reduxSerializeError } from "@/app/services/admin/response.service";
import {
	HeatGeneratorFormsState,
	HeatGeneratorResponseData,
	HeatGeneratorStringValuesEnum,
} from "@/app/types/data/products/heat_generators/heat_generators.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { heatGeneratorCommonReducers } from "@/app/utils/redux/products/heat_generators/forms/heatGeneratorsForms.reducers";
import { heatGeneratorsFormsInitialState } from "@/app/utils/redux/products/heat_generators/forms/heatGeneratorsFormsState";
import { baseUrlHeatGenerators } from "@/app/utils/redux/products/heat_generators/heatGeneratorsSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const initialState: HeatGeneratorFormsState = _.cloneDeep(heatGeneratorsFormsInitialState);

export const getHeatGenerator = createAsyncThunk(
	"householdHeatGeneratorForms/getHeatGenerator",
	async (id: string, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance.get<HeatGeneratorResponseData>(
				`${baseUrlHeatGenerators}/${id}`,
			);

			const parsedData = await parseHeatGeneratorResponse(HEAT_GENERATOR_TYPES[1], data);
			console.log("parsedData", parsedData);

			return parsedData;
		} catch (error) {
			return rejectWithValue(reduxSerializeError(error));
		}
	},
);

export const industrialHeatGeneratorFormsSlice = createSlice({
	name: "industrialHeatGeneratorForms",
	initialState,
	reducers: {
		...heatGeneratorCommonReducers,
	},
	extraReducers(builder) {
		builder
			// GET
			.addCase(getHeatGenerator.pending, (state) => {
				state.update.fetching.status.getOne = "loading";
				state.update.fetching.error.getOne = null;
			})
			.addCase(getHeatGenerator.fulfilled, (state, action) => {
				state.update.fetching.status.getOne = "succeeded";

				state.update.data = {
					...action.payload,
					[HeatGeneratorStringValuesEnum.FAN_MODEL]:
						action.payload[HeatGeneratorStringValuesEnum.FAN_MODEL] || "",
					[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]:
						action.payload[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW] || "",
				};
				state.update.checkboxes = {
					[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]:
						!!action.payload[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW],
				};
			})
			.addCase(getHeatGenerator.rejected, (state, action) => {
				state.update.fetching.status.getOne = "failed";
				state.update.fetching.error.getOne = action.payload as ErrorResponse;
			});
	},
});

export const {
	setStringValue,
	deleteArrayValue,
	pushImageArrayValues,
	setNotStepperValue,
	setStepperValue,
	handleCheckbox,
	setInputErrorValue,
	clearForm,
	clearErrors,
} = industrialHeatGeneratorFormsSlice.actions;
export default industrialHeatGeneratorFormsSlice.reducer;
