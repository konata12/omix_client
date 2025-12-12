import { FormImageInputType, FormTypes } from "@/app/types/data/form.type";
import {
	HeatGeneratorCheckboxesType,
	HeatGeneratorFormsState,
	HeatGeneratorNotStepperValuesType,
	HeatGeneratorStepperValuesType,
	HeatGeneratorStringValuesEnumType,
	HeatGeneratorValuesEnumType,
} from "@/app/types/data/products/heat_generators/heat_generators.type";
import { ProductImagesValuesType, ProductImageValuesType } from "@/app/types/data/products/product.type";
import {
	heatGeneratorFormInitError,
	heatGeneratorsInitFormData,
} from "@/app/utils/redux/products/heat_generators/forms/heatGeneratorsFormsState";

export const heatGeneratorCommonReducers = {
	setStringValue(
		state: HeatGeneratorFormsState,
		action: {
			payload: {
				value: string;
				form: FormTypes;
				field: HeatGeneratorStringValuesEnumType | ProductImageValuesType;
			};
		},
	) {
		const { value, form, field } = action.payload;
		state[form].data[field] = value;
	},

	deleteArrayValue(
		state: HeatGeneratorFormsState,
		action: {
			payload: {
				index: number;
				form: FormTypes;
				field: ProductImagesValuesType;
			};
		},
	) {
		const { index, form, field } = action.payload;
		state[form].data[field].splice(index, 1);
	},

	pushImageArrayValues(
		state: HeatGeneratorFormsState,
		action: {
			payload: {
				value: FormImageInputType[];
				form: FormTypes;
				field: ProductImagesValuesType;
			};
		},
	) {
		const { value, form, field } = action.payload;
		state[form].data[field].push(...value);
	},

	setNotStepperValue(
		state: HeatGeneratorFormsState,
		action: {
			payload: {
				value: any;
				form: FormTypes;
				field: HeatGeneratorNotStepperValuesType;
			};
		},
	) {
		const { value, form, field } = action.payload;
		state[form].data[field] = value;
	},

	setStepperValue(
		state: HeatGeneratorFormsState,
		action: {
			payload: {
				value: number;
				form: FormTypes;
				field: HeatGeneratorStepperValuesType;
			};
		},
	) {
		const { value, form, field } = action.payload;
		state[form].data[field] = value;
	},

	handleCheckbox(
		state: HeatGeneratorFormsState,
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
		state: HeatGeneratorFormsState,
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

	clearErrors(state: HeatGeneratorFormsState, action: { payload: FormTypes }) {
		state[action.payload].error = heatGeneratorFormInitError;
	},
	clearForm(state: HeatGeneratorFormsState, action: { payload: FormTypes }) {
		state[action.payload] = heatGeneratorsInitFormData;
	},
};
