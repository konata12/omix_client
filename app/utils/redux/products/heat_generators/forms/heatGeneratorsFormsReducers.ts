import { FormImageInputType, FormTypes } from "@/app/types/data/form.type";
import {
	HeatGeneratorCheckboxesType,
	HeatGeneratorFormsState,
	HeatGeneratorFormState,
	HeatGeneratorImagesValuesType,
	HeatGeneratorImageValuesType,
	HeatGeneratorNotStepperValuesType,
	HeatGeneratorStepperValuesType,
	HeatGeneratorStringValuesEnumType,
	HeatGeneratorValuesEnumType,
} from "@/app/types/data/products/heat_generators/heat_generators.type";
import { heatGeneratorsInitFormData } from "@/app/utils/redux/products/heat_generators/forms/heatGeneratorsFormsState";

export const heatGeneratorCommonReducers = {
	setStringValue(
		state: HeatGeneratorFormsState,
		action: {
			payload: {
				value: string;
				form: FormTypes;
				field: HeatGeneratorStringValuesEnumType | HeatGeneratorImageValuesType;
			};
		},
	) {
		const { value, form, field } = action.payload;
		state[form].data[field] = value;
	},

	deleteImageArrayValue(
		state: HeatGeneratorFormsState,
		action: {
			payload: {
				index: number;
				form: FormTypes;
				field: HeatGeneratorImagesValuesType;
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
				field: HeatGeneratorImagesValuesType;
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

	setFormValues(
		state: HeatGeneratorFormsState,
		action: {
			payload: {
				data: HeatGeneratorFormState;
				form: FormTypes;
			};
		},
	) {
		const { data, form } = action.payload;
		state[form].data = data.data;
	},
	clearForm(state: HeatGeneratorFormsState, action: { payload: FormTypes }) {
		state[action.payload] = heatGeneratorsInitFormData;
	},
};
