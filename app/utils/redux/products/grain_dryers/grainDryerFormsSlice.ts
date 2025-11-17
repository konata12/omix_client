import { FormImageInputType, FormTypes, NotStepperValue } from "@/app/types/data/form.type";
import {
	GrainDryerCheckboxesType,
	GrainDryerFormErrors,
	GrainDryerFormsState,
	GrainDryerFormState,
	GrainDryerImagesValuesEnum,
	GrainDryerImagesValuesType,
	GrainDryerImageValuesEnum,
	GrainDryerImageValuesType,
	GrainDryerNotStepperValuesEnum,
	GrainDryerNotStepperValuesType,
	GrainDryerStepperValuesEnum,
	GrainDryerStepperValuesType,
	GrainDryerStringValuesEnum,
	GrainDryerStringValuesEnumType,
	GrainDryerValuesEnumType,
} from "@/app/types/data/products/grain_dryers/grain_dryers.type";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initError: GrainDryerFormErrors = {
	// GENERAL
	[GrainDryerStringValuesEnum.TITLE]: { message: "" },
	[GrainDryerStepperValuesEnum.HEATING_SECTIONS]: { message: "" },
	[GrainDryerStepperValuesEnum.COOLING_SECTIONS]: { message: "" },
	[GrainDryerNotStepperValuesEnum.GRAIN_VOLUME]: { message: "" },
	[GrainDryerNotStepperValuesEnum.GRAIN_WEIGHT]: { message: "" },
	[GrainDryerStringValuesEnum.DRYING_METHOD]: { message: "" },
	[GrainDryerNotStepperValuesEnum.PRODUCTIVITY]: { message: "" },
	[GrainDryerNotStepperValuesEnum.HEATED_AIR_VOLUME]: { message: "" },
	[GrainDryerNotStepperValuesEnum.AIR_TEMPERATURE]: { message: "" },

	// POWER
	[GrainDryerNotStepperValuesEnum.NEEDED_HEAT_POWER]: { message: "" },
	[GrainDryerNotStepperValuesEnum.ELECTRIC_POWER]: { message: "" },
	[GrainDryerNotStepperValuesEnum.HEAT_POWER_CONSUMPTION]: { message: "" },

	// CONSTRUCTION SETTINGS
	[GrainDryerNotStepperValuesEnum.HEIGHT]: { message: "" },
	[GrainDryerNotStepperValuesEnum.WIDTH]: { message: "" },
	[GrainDryerNotStepperValuesEnum.LENGTH]: { message: "" },
	[GrainDryerNotStepperValuesEnum.WEIGHT]: { message: "" },

	// CONFIGURATION
	[GrainDryerStepperValuesEnum.HEAT_GENERATORS_COUNT]: { message: "" },
	[GrainDryerStepperValuesEnum.GRAIN_DRYERS_COUNT]: { message: "" },
	[GrainDryerStepperValuesEnum.LOADING_TANKS_TOP_COUNT]: { message: "" },
	[GrainDryerStepperValuesEnum.ELECTRICAL_ENCLOSURES_COUNT]: { message: "" },
	[GrainDryerStepperValuesEnum.HEATED_AIR_TEMPERATURE_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerStepperValuesEnum.SMOKE_TEMPERATURE_SENSORS_COUNT]: { message: "" },
	[GrainDryerStepperValuesEnum.HEATED_GRAIN_TEMPERATURE_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerStepperValuesEnum.COOLED_GRAIN_TEMPERATURE_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerStepperValuesEnum.LOADING_TANK_ROTARY_LEVEL_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerStepperValuesEnum.DRYER_TOP_SECTION_ROTARY_LEVEL_SENSORS_COUNT]: {
		message: "",
	},
	[GrainDryerStepperValuesEnum.WARRANTY_YEARS_COUNT]: { message: "" },

	// GRAPHIC INFO
	[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]: { message: "" },
	[GrainDryerImageValuesEnum.CARD_IMAGE]: { message: "" },
	[GrainDryerImagesValuesEnum.PRODUCT_IMAGES]: { message: "" },
};
const initFormData: GrainDryerFormState = {
	// GENERAL
	[GrainDryerStringValuesEnum.TITLE]: "",
	[GrainDryerStepperValuesEnum.HEATING_SECTIONS]: 0,
	[GrainDryerStepperValuesEnum.COOLING_SECTIONS]: 0,
	[GrainDryerNotStepperValuesEnum.GRAIN_VOLUME]: "",
	[GrainDryerNotStepperValuesEnum.GRAIN_WEIGHT]: "",
	[GrainDryerStringValuesEnum.DRYING_METHOD]: "",
	[GrainDryerNotStepperValuesEnum.PRODUCTIVITY]: "",
	[GrainDryerNotStepperValuesEnum.HEATED_AIR_VOLUME]: "",
	[GrainDryerNotStepperValuesEnum.AIR_TEMPERATURE]: "",

	// POWER
	[GrainDryerNotStepperValuesEnum.NEEDED_HEAT_POWER]: "",
	[GrainDryerNotStepperValuesEnum.ELECTRIC_POWER]: "",
	[GrainDryerNotStepperValuesEnum.HEAT_POWER_CONSUMPTION]: "",

	// CONSTRUCTION SETTINGS
	[GrainDryerNotStepperValuesEnum.HEIGHT]: "",
	[GrainDryerNotStepperValuesEnum.WIDTH]: "",
	[GrainDryerNotStepperValuesEnum.LENGTH]: "",
	[GrainDryerNotStepperValuesEnum.WEIGHT]: "",

	// CONFIGURATION
	[GrainDryerStepperValuesEnum.HEAT_GENERATORS_COUNT]: 0,
	[GrainDryerStepperValuesEnum.GRAIN_DRYERS_COUNT]: 0,
	[GrainDryerStepperValuesEnum.LOADING_TANKS_TOP_COUNT]: 0,
	[GrainDryerStepperValuesEnum.ELECTRICAL_ENCLOSURES_COUNT]: 0,
	[GrainDryerStepperValuesEnum.HEATED_AIR_TEMPERATURE_SENSORS_COUNT]: 0,
	[GrainDryerStepperValuesEnum.SMOKE_TEMPERATURE_SENSORS_COUNT]: 0,
	[GrainDryerStepperValuesEnum.HEATED_GRAIN_TEMPERATURE_SENSORS_COUNT]: 0,
	[GrainDryerStepperValuesEnum.COOLED_GRAIN_TEMPERATURE_SENSORS_COUNT]: 0,
	[GrainDryerStepperValuesEnum.LOADING_TANK_ROTARY_LEVEL_SENSORS_COUNT]: 0,
	[GrainDryerStepperValuesEnum.DRYER_TOP_SECTION_ROTARY_LEVEL_SENSORS_COUNT]: 0,
	[GrainDryerStepperValuesEnum.WARRANTY_YEARS_COUNT]: 0,

	// GRAPHIC INFO
	[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]: "",
	[GrainDryerImageValuesEnum.CARD_IMAGE]: null,
	[GrainDryerImagesValuesEnum.PRODUCT_IMAGES]: [],

	checkboxes: {
		[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]: false,
	},
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
					field: GrainDryerStringValuesEnumType | GrainDryerImageValuesType;
				};
			},
		) {
			const { value, form, field } = action.payload;
			state[form][field] = value;
		},
		deleteImageArrayValue(
			state,
			action: {
				payload: {
					index: number;
					form: FormTypes;
					field: GrainDryerImagesValuesType;
				};
			},
		) {
			const { index, form, field } = action.payload;
			state[form][field].splice(index, 1);
		},
		pushImageArrayValues(
			state,
			action: {
				payload: {
					value: FormImageInputType[];
					form: FormTypes;
					field: GrainDryerImagesValuesType;
				};
			},
		) {
			const { value, form, field } = action.payload;
			state[form][field].push(...value);
		},
		setNotStepperValue(
			state,
			action: {
				payload: {
					value: NotStepperValue;
					form: FormTypes;
					field: GrainDryerNotStepperValuesType;
				};
			},
		) {
			const { value, form, field } = action.payload;
			state[form][field] = value;
		},
		setStepperValue(
			state,
			action: {
				payload: {
					value: number;
					form: FormTypes;
					field: GrainDryerStepperValuesType;
				};
			},
		) {
			const { value, form, field } = action.payload;
			state[form][field] = value;
		},
		handleCheckbox(
			state,
			action: {
				payload: {
					value: boolean;
					form: FormTypes;
					field: GrainDryerCheckboxesType;
				};
			},
		) {
			const { value, form, field } = action.payload;
			state[form].checkboxes[field] = value;
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
	deleteImageArrayValue,
	pushImageArrayValues,
	setNotStepperValue,
	setStepperValue,
	handleCheckbox,
	setInputErrorValue,
	clearForm,
} = grainDryerFormsSlice.actions;
export default grainDryerFormsSlice.reducer;
