import { FormImageInputType, FormTypes, NotStepperValue } from "@/app/types/data/form.type";
import {
	HeatGeneratorCheckboxesType,
	HeatGeneratorFormErrors,
	HeatGeneratorFormsState,
	HeatGeneratorFormState,
	HeatGeneratorImagesValuesEnum,
	HeatGeneratorImagesValuesType,
	HeatGeneratorImageValuesEnum,
	HeatGeneratorImageValuesType,
	HeatGeneratorNotStepperValuesEnum,
	HeatGeneratorNotStepperValuesType,
	HeatGeneratorStepperValuesEnum,
	HeatGeneratorStepperValuesType,
	HeatGeneratorStringValuesEnum,
	HeatGeneratorStringValuesEnumType,
	HeatGeneratorValuesEnumType,
} from "@/app/types/data/products/heat_generators/heat_generators.type";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initError: HeatGeneratorFormErrors = {
	// GENERAL
	[HeatGeneratorStringValuesEnum.TITLE]: { message: "" },

	// POWER
	[HeatGeneratorNotStepperValuesEnum.NOMINAL_POWER]: { message: "" },
	[HeatGeneratorNotStepperValuesEnum.MAX_POWER]: { message: "" },
	[HeatGeneratorNotStepperValuesEnum.ELECTRIC_POWER]: { message: "" },
	[HeatGeneratorStringValuesEnum.POWER_REGULATION_DIAPASON]: { message: "" },

	// FUEL
	[HeatGeneratorStringValuesEnum.FUEL_BURNING_TYPE]: { message: "" },
	[HeatGeneratorStringValuesEnum.FUEL_TYPE]: { message: "" },
	[HeatGeneratorStringValuesEnum.FUEL_MOISTURE]: { message: "" },
	[HeatGeneratorStringValuesEnum.FUEL_BURNING_TIME]: { message: "" },

	// CONSTRUCTION SETTINGS
	[HeatGeneratorNotStepperValuesEnum.HEIGHT]: { message: "" },
	[HeatGeneratorNotStepperValuesEnum.WIDTH]: { message: "" },
	[HeatGeneratorNotStepperValuesEnum.LENGTH]: { message: "" },
	[HeatGeneratorNotStepperValuesEnum.WEIGHT]: { message: "" },
	[HeatGeneratorStringValuesEnum.FURNACE_CROSS_SECTION]: { message: "" },
	[HeatGeneratorNotStepperValuesEnum.FURNACE_VOLUME]: { message: "" },
	[HeatGeneratorStringValuesEnum.FURNACE_MATERIAL]: { message: "" },
	[HeatGeneratorStringValuesEnum.FURNACE_HEAT_EXCHANGER_MATERIAL]: { message: "" },

	// CONFIGURATION
	[HeatGeneratorStepperValuesEnum.HEAT_GENERATORS_COUNT]: { message: "" },
	[HeatGeneratorStepperValuesEnum.EXHAUST_FANS_COUNT]: { message: "" },
	[HeatGeneratorStringValuesEnum.FAN_MODEL]: { message: "" },
	[HeatGeneratorStepperValuesEnum.FAN_MODELS_COUNT]: { message: "" },
	[HeatGeneratorStepperValuesEnum.WARRANTY_YEARS_COUNT]: { message: "" },

	// GRAPHIC INFO
	[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]: { message: "" },
	[HeatGeneratorImageValuesEnum.CARD_IMAGE]: { message: "" },
	[HeatGeneratorImagesValuesEnum.PRODUCT_IMAGES]: { message: "" },
};
const initFormData: HeatGeneratorFormState = {
	// GENERAL
	[HeatGeneratorStringValuesEnum.TITLE]: "",

	// POWER
	[HeatGeneratorNotStepperValuesEnum.NOMINAL_POWER]: "",
	[HeatGeneratorNotStepperValuesEnum.MAX_POWER]: "",
	[HeatGeneratorNotStepperValuesEnum.ELECTRIC_POWER]: "",
	[HeatGeneratorStringValuesEnum.POWER_REGULATION_DIAPASON]: "",

	// FUEL
	[HeatGeneratorStringValuesEnum.FUEL_BURNING_TYPE]: "",
	[HeatGeneratorStringValuesEnum.FUEL_TYPE]: "",
	[HeatGeneratorStringValuesEnum.FUEL_MOISTURE]: "",
	[HeatGeneratorStringValuesEnum.FUEL_BURNING_TIME]: "",

	// CONSTRUCTION SETTINGS
	[HeatGeneratorNotStepperValuesEnum.HEIGHT]: "",
	[HeatGeneratorNotStepperValuesEnum.WIDTH]: "",
	[HeatGeneratorNotStepperValuesEnum.LENGTH]: "",
	[HeatGeneratorNotStepperValuesEnum.WEIGHT]: "",
	[HeatGeneratorStringValuesEnum.FURNACE_CROSS_SECTION]: "",
	[HeatGeneratorNotStepperValuesEnum.FURNACE_VOLUME]: "",
	[HeatGeneratorStringValuesEnum.FURNACE_MATERIAL]: "",
	[HeatGeneratorStringValuesEnum.FURNACE_HEAT_EXCHANGER_MATERIAL]: "",

	// CONFIGURATION
	[HeatGeneratorStepperValuesEnum.HEAT_GENERATORS_COUNT]: 0,
	[HeatGeneratorStepperValuesEnum.EXHAUST_FANS_COUNT]: 0,
	[HeatGeneratorStringValuesEnum.FAN_MODEL]: "",
	[HeatGeneratorStepperValuesEnum.FAN_MODELS_COUNT]: 0,
	[HeatGeneratorStepperValuesEnum.WARRANTY_YEARS_COUNT]: 0,

	// GRAPHIC INFO
	[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]: "",
	[HeatGeneratorImageValuesEnum.CARD_IMAGE]: null,
	[HeatGeneratorImagesValuesEnum.PRODUCT_IMAGES]: [],

	checkboxes: {
		[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]: false,
	},
	error: initError,
};

export const initialState: HeatGeneratorFormsState = {
	create: _.cloneDeep(initFormData),
	update: _.cloneDeep(initFormData),
};

export const householdHeatGeneratorFormsSlice = createSlice({
	name: "householdHeatGeneratorForms",
	initialState,
	reducers: {
		setStringValue(
			state,
			action: {
				payload: {
					value: string;
					form: FormTypes;
					field: HeatGeneratorStringValuesEnumType | HeatGeneratorImageValuesType;
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
					field: HeatGeneratorImagesValuesType;
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
					field: HeatGeneratorImagesValuesType;
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
					field: HeatGeneratorNotStepperValuesType;
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
					field: HeatGeneratorStepperValuesType;
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
					field: HeatGeneratorCheckboxesType;
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
					field: HeatGeneratorValuesEnumType;
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
					data: HeatGeneratorFormState;
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
} = householdHeatGeneratorFormsSlice.actions;
export default householdHeatGeneratorFormsSlice.reducer;
