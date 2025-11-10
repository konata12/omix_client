import { FormTypes } from "@/app/types/data/form.type";
import {
	GrainDryerFormErrors,
	GrainDryerFormsState,
	GrainDryerFormState,
	GrainDryerNumberValuesEnumType,
	GrainDryerStringValuesEnumType,
	GrainDryerValuesEnum,
	GrainDryerValuesEnumType,
} from "@/app/types/data/products/grain_dryers/grain_dryers.type";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initError: GrainDryerFormErrors = {
	// GENERAL
	[GrainDryerValuesEnum.TITLE]: { message: "" },
	[GrainDryerValuesEnum.HEATING_SECTIONS]: { message: "" },
	[GrainDryerValuesEnum.COOLING_SECTIONS]: { message: "" },
	[GrainDryerValuesEnum.GRAIN_VOLUME]: { message: "" },
	[GrainDryerValuesEnum.GRAIN_WEIGHT]: { message: "" },
	[GrainDryerValuesEnum.DRYING_METHOD]: { message: "" },
	[GrainDryerValuesEnum.PRODUCTIVITY]: { message: "" },
	[GrainDryerValuesEnum.HEATED_AIR_VOLUME]: { message: "" },
	[GrainDryerValuesEnum.AIR_TEMPERATURE]: { message: "" },

	// POWER
	[GrainDryerValuesEnum.NEEDED_HEAT_POWER]: { message: "" },
	[GrainDryerValuesEnum.ELECTRIC_POWER]: { message: "" },
	[GrainDryerValuesEnum.HEAT_POWER_CONSUMPTION]: { message: "" },

	// CONSTRUCTION SETTINGS
	[GrainDryerValuesEnum.HEIGHT]: { message: "" },
	[GrainDryerValuesEnum.WIDTH]: { message: "" },
	[GrainDryerValuesEnum.LENGTH]: { message: "" },
	[GrainDryerValuesEnum.WEIGHT]: { message: "" },

	// CONFIGURATION
	[GrainDryerValuesEnum.HEAT_GENERATORS_COUNT]: { message: "" },
	[GrainDryerValuesEnum.GRAIN_DRYERS_COUNT]: { message: "" },
	[GrainDryerValuesEnum.LOADING_TANKS_TOP_COUNT]: { message: "" },
	[GrainDryerValuesEnum.ELECTRICAL_ENCLOSURES_COUNT]: { message: "" },
	[GrainDryerValuesEnum.HEATED_AIR_TEMPERATURE_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerValuesEnum.SMOKE_TEMPERATURE_SENSORS_COUNT]: { message: "" },
	[GrainDryerValuesEnum.HEATED_GRAIN_TEMPERATURE_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerValuesEnum.COOLED_GRAIN_TEMPERATURE_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerValuesEnum.LOADING_TANK_ROTARY_LEVEL_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerValuesEnum.DRYER_TOP_SECTION_ROTARY_LEVEL_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerValuesEnum.WARRANTY_YEARS_COUNT]: { message: "" },

	// GRAPHIC INFO
	[GrainDryerValuesEnum.YOUTUBE_REVIEW]: { message: "" },
	[GrainDryerValuesEnum.CARD_IMAGE]: { message: "" },
	[GrainDryerValuesEnum.PRODUCT_IMAGES]: { message: "" },
};
const initFormData: GrainDryerFormState = {
	// GENERAL
	[GrainDryerValuesEnum.TITLE]: "",
	[GrainDryerValuesEnum.HEATING_SECTIONS]: 0,
	[GrainDryerValuesEnum.COOLING_SECTIONS]: 0,
	[GrainDryerValuesEnum.GRAIN_VOLUME]: 0,
	[GrainDryerValuesEnum.GRAIN_WEIGHT]: 0,
	[GrainDryerValuesEnum.DRYING_METHOD]: "",
	[GrainDryerValuesEnum.PRODUCTIVITY]: 0,
	[GrainDryerValuesEnum.HEATED_AIR_VOLUME]: 0,
	[GrainDryerValuesEnum.AIR_TEMPERATURE]: 0,

	// POWER
	[GrainDryerValuesEnum.NEEDED_HEAT_POWER]: 0,
	[GrainDryerValuesEnum.ELECTRIC_POWER]: 0,
	[GrainDryerValuesEnum.HEAT_POWER_CONSUMPTION]: 0,

	// CONSTRUCTION SETTINGS
	[GrainDryerValuesEnum.HEIGHT]: 0,
	[GrainDryerValuesEnum.WIDTH]: 0,
	[GrainDryerValuesEnum.LENGTH]: 0,
	[GrainDryerValuesEnum.WEIGHT]: 0,

	// CONFIGURATION
	[GrainDryerValuesEnum.HEAT_GENERATORS_COUNT]: 0,
	[GrainDryerValuesEnum.GRAIN_DRYERS_COUNT]: 0,
	[GrainDryerValuesEnum.LOADING_TANKS_TOP_COUNT]: 0,
	[GrainDryerValuesEnum.ELECTRICAL_ENCLOSURES_COUNT]: 0,
	[GrainDryerValuesEnum.HEATED_AIR_TEMPERATURE_SENSORS_COUNT]: 0,
	[GrainDryerValuesEnum.SMOKE_TEMPERATURE_SENSORS_COUNT]: 0,
	[GrainDryerValuesEnum.HEATED_GRAIN_TEMPERATURE_SENSORS_COUNT]: 0,
	[GrainDryerValuesEnum.COOLED_GRAIN_TEMPERATURE_SENSORS_COUNT]: 0,
	[GrainDryerValuesEnum.LOADING_TANK_ROTARY_LEVEL_SENSORS_COUNT]: 0,
	[GrainDryerValuesEnum.DRYER_TOP_SECTION_ROTARY_LEVEL_SENSORS_COUNT]: 0,
	[GrainDryerValuesEnum.WARRANTY_YEARS_COUNT]: 0,

	// GRAPHIC INFO
	[GrainDryerValuesEnum.YOUTUBE_REVIEW]: "",
	[GrainDryerValuesEnum.CARD_IMAGE]: "",
	[GrainDryerValuesEnum.PRODUCT_IMAGES]: "",

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
