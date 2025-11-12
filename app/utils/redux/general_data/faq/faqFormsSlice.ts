import {
	FaqFormsState,
	FaqFormState,
	FaqFormValuesEnumType,
	FaqValuesEnum,
} from "@/app/types/data/faq.type";
import { FormTypes } from "@/app/types/data/form.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: FaqFormsState = {
	create: {
		[FaqValuesEnum.QUESTION]: "",
		[FaqValuesEnum.ANSWER]: "",
		error: {
			[FaqValuesEnum.QUESTION]: { message: "" },
			[FaqValuesEnum.ANSWER]: { message: "" },
		},
	},
	update: {
		[FaqValuesEnum.QUESTION]: "",
		[FaqValuesEnum.ANSWER]: "",
		error: {
			[FaqValuesEnum.QUESTION]: { message: "" },
			[FaqValuesEnum.ANSWER]: { message: "" },
		},
	},
};

export const faqFormsSlice = createSlice({
	name: "faqForms",
	initialState,
	reducers: {
		setStringValue(
			state,
			action: {
				payload: {
					value: string;
					form: FormTypes;
					field: FaqFormValuesEnumType;
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
					field: FaqFormValuesEnumType;
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
					data: FaqFormState;
					form: FormTypes;
				};
			},
		) {
			const { data, form } = action.payload;
			state[form] = data;
		},
		clearForm(state, action: { payload: FormTypes }) {
			state[action.payload] = {
				question: "",
				answer: "",
				error: {
					question: { message: "" },
					answer: { message: "" },
				},
			};
		},
	},
});

export const { setFormValues, setStringValue, setInputErrorValue, clearForm } = faqFormsSlice.actions;
export default faqFormsSlice.reducer;
