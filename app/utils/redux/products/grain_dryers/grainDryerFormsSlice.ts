import { FormTypes } from "@/app/types/data/form.type";
import {
	GrainDryerFormErrors,
	GrainDryerFormsState,
	GrainDryerFormState,
	GrainDryerNumberValuesEnum,
	GrainDryerNumberValuesEnumType,
	GrainDryerStringValuesEnum,
	GrainDryerStringValuesEnumType,
	GrainDryerValuesEnumType,
} from "@/app/types/data/products/grain_dryers/grain_dryers.type";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initError: GrainDryerFormErrors = {
	// GENERAL
	[GrainDryerStringValuesEnum.TITLE]: { message: "" },
	[GrainDryerNumberValuesEnum.HEATING_SECTIONS]: { message: "" },
	[GrainDryerNumberValuesEnum.COOLING_SECTIONS]: { message: "" },
	[GrainDryerNumberValuesEnum.GRAIN_VOLUME]: { message: "" },
	[GrainDryerNumberValuesEnum.GRAIN_WEIGHT]: { message: "" },
	[GrainDryerStringValuesEnum.DRYING_METHOD]: { message: "" },
	[GrainDryerNumberValuesEnum.PRODUCTIVITY]: { message: "" },
	[GrainDryerNumberValuesEnum.HEATED_AIR_VOLUME]: { message: "" },
	[GrainDryerNumberValuesEnum.AIR_TEMPERATURE]: { message: "" },

	// POWER
	[GrainDryerNumberValuesEnum.NEEDED_HEAT_POWER]: { message: "" },
	[GrainDryerNumberValuesEnum.ELECTRIC_POWER]: { message: "" },
	[GrainDryerNumberValuesEnum.HEAT_POWER_CONSUMPTION]: { message: "" },

	// CONSTRUCTION SETTINGS
	[GrainDryerNumberValuesEnum.HEIGHT]: { message: "" },
	[GrainDryerNumberValuesEnum.WIDTH]: { message: "" },
	[GrainDryerNumberValuesEnum.LENGTH]: { message: "" },
	[GrainDryerNumberValuesEnum.WEIGHT]: { message: "" },

	// CONFIGURATION
	[GrainDryerNumberValuesEnum.HEAT_GENERATORS_COUNT]: { message: "" },
	[GrainDryerNumberValuesEnum.GRAIN_DRYERS_COUNT]: { message: "" },
	[GrainDryerNumberValuesEnum.LOADING_TANKS_TOP_COUNT]: { message: "" },
	[GrainDryerNumberValuesEnum.ELECTRICAL_ENCLOSURES_COUNT]: { message: "" },
	[GrainDryerNumberValuesEnum.HEATED_AIR_TEMPERATURE_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerNumberValuesEnum.SMOKE_TEMPERATURE_SENSORS_COUNT]: { message: "" },
	[GrainDryerNumberValuesEnum.HEATED_GRAIN_TEMPERATURE_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerNumberValuesEnum.COOLED_GRAIN_TEMPERATURE_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerNumberValuesEnum.LOADING_TANK_ROTARY_LEVEL_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerNumberValuesEnum.DRYER_TOP_SECTION_ROTARY_LEVEL_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerNumberValuesEnum.WARRANTY_YEARS_COUNT]: { message: "" },

	// GRAPHIC INFO
	[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]: { message: "" },
	[GrainDryerStringValuesEnum.CARD_IMAGE]: { message: "" },
	[GrainDryerStringValuesEnum.PRODUCT_IMAGES]: { message: "" },
};
const initFormData: GrainDryerFormState = {
	// GENERAL
	[GrainDryerStringValuesEnum.TITLE]: "",
	[GrainDryerNumberValuesEnum.HEATING_SECTIONS]: 0,
	[GrainDryerNumberValuesEnum.COOLING_SECTIONS]: 0,
	[GrainDryerNumberValuesEnum.GRAIN_VOLUME]: 0,
	[GrainDryerNumberValuesEnum.GRAIN_WEIGHT]: 0,
	[GrainDryerStringValuesEnum.DRYING_METHOD]: "",
	[GrainDryerNumberValuesEnum.PRODUCTIVITY]: 0,
	[GrainDryerNumberValuesEnum.HEATED_AIR_VOLUME]: 0,
	[GrainDryerNumberValuesEnum.AIR_TEMPERATURE]: 0,

	// POWER
	[GrainDryerNumberValuesEnum.NEEDED_HEAT_POWER]: 0,
	[GrainDryerNumberValuesEnum.ELECTRIC_POWER]: 0,
	[GrainDryerNumberValuesEnum.HEAT_POWER_CONSUMPTION]: 0,

	// CONSTRUCTION SETTINGS
	[GrainDryerNumberValuesEnum.HEIGHT]: 0,
	[GrainDryerNumberValuesEnum.WIDTH]: 0,
	[GrainDryerNumberValuesEnum.LENGTH]: 0,
	[GrainDryerNumberValuesEnum.WEIGHT]: 0,

	// CONFIGURATION
	[GrainDryerNumberValuesEnum.HEAT_GENERATORS_COUNT]: 0,
	[GrainDryerNumberValuesEnum.GRAIN_DRYERS_COUNT]: 0,
	[GrainDryerNumberValuesEnum.LOADING_TANKS_TOP_COUNT]: 0,
	[GrainDryerNumberValuesEnum.ELECTRICAL_ENCLOSURES_COUNT]: 0,
	[GrainDryerNumberValuesEnum.HEATED_AIR_TEMPERATURE_SENSORS_COUNT]: 0,
	[GrainDryerNumberValuesEnum.SMOKE_TEMPERATURE_SENSORS_COUNT]: 0,
	[GrainDryerNumberValuesEnum.HEATED_GRAIN_TEMPERATURE_SENSORS_COUNT]: 0,
	[GrainDryerNumberValuesEnum.COOLED_GRAIN_TEMPERATURE_SENSORS_COUNT]: 0,
	[GrainDryerNumberValuesEnum.LOADING_TANK_ROTARY_LEVEL_SENSORS_COUNT]: 0,
	[GrainDryerNumberValuesEnum.DRYER_TOP_SECTION_ROTARY_LEVEL_SENSORS_COUNT]: 0,
	[GrainDryerNumberValuesEnum.WARRANTY_YEARS_COUNT]: 0,

	// GRAPHIC INFO
	[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]: "",
	[GrainDryerStringValuesEnum.CARD_IMAGE]: "",
	[GrainDryerStringValuesEnum.PRODUCT_IMAGES]: "",

	error: initError,
};

export const initialState: GrainDryerFormsState = {
	create: _.cloneDeep(initFormData),
	update: _.cloneDeep(initFormData),
};

export const grainDryerFormsSlice = createSlice({
	name: "grainDryerForms",
	initialState,
	reducers: {
		setStringValue(
			state,
			action: {
				payload: {
					value: string;
					form: FormTypes;
					field: GrainDryerStringValuesEnumType;
				};
			},
		) {
			const { value, form, field } = action.payload;
			state[form][field] = value;
		},
		setNumberValue(
			state,
			action: {
				payload: {
					value: number;
					form: FormTypes;
					field: GrainDryerNumberValuesEnumType;
				};
			},
		) {
			const { value, form, field } = action.payload;
			state[form][field] = value;
		},
		setInputErrorValue(
			state,
			action: {
				payload: {
					message: string;
					form: FormTypes;
					field: GrainDryerValuesEnumType;
				};
			},
		) {
			const { message, form, field } = action.payload;
			state[form].error[field] = { message };
		},

		setFormValues(
			state,
			action: {
				payload: {
					data: GrainDryerFormState;
					form: FormTypes;
				};
			},
		) {
			const { data, form } = action.payload;
			state[form] = data;
		},
		clearForm(state, action: { payload: FormTypes }) {
			state[action.payload] = initFormData;
		},
	},
});

export const {
	setFormValues,
	setStringValue,
	setNumberValue,
	setInputErrorValue,
	clearForm,
} = grainDryerFormsSlice.actions;
export default grainDryerFormsSlice.reducer;
