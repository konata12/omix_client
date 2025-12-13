import { reduxSerializeError } from "@/app/services/admin/response.service";
import { FormTypes } from "@/app/types/data/form.type";
import {
	NewsFormData,
	NewsFormErrors,
	NewsFormsState,
	NewsFormState,
	NewsFormValuesEnumType,
	NewsImageValuesEnum,
	NewsImageValuesEnumType,
	NewsResponseData,
	NewsStringValuesEnum,
	NewsStringValuesEnumType,
} from "@/app/types/data/news";
import {
	RedactorFormComponentsType,
	RedactorFormDataErrorType,
	ReductorInFormEnum,
} from "@/app/types/data/redactor/redactor";
import axiosInstance from "@/app/utils/axios";
import { baseUrlGrainDryers } from "@/app/utils/redux/products/grain_dryers/grainDryersSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initError: NewsFormErrors = {
	[NewsImageValuesEnum.IMAGE]: { message: "" },
	[NewsStringValuesEnum.TITLE]: { message: "" },
	[NewsStringValuesEnum.DESCRIPTION]: { message: "" },
};
const initData: NewsFormData = {
	[NewsImageValuesEnum.IMAGE]: "",
	[NewsStringValuesEnum.TITLE]: "",
	[NewsStringValuesEnum.DESCRIPTION]: "",
	[ReductorInFormEnum.REDACTOR]: [],
};
const initFormData: NewsFormState = {
	data: initData,
	error: initError,
	fetching: {
		status: {
			getOne: null,
		},
		error: {
			getOne: null,
		},
	},
};

export const initialState: NewsFormsState = {
	create: structuredClone(initFormData),
	update: structuredClone(initFormData),
};

export const getNews = createAsyncThunk("newsForms/getNews", async (id: string, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.get<NewsResponseData>(`${baseUrlGrainDryers}/${id}`);

		// const parsedData = await parseGrainDryerResponse(data);
		// console.log("parsedData", parsedData);

		return data;
	} catch (error) {
		return rejectWithValue(reduxSerializeError(error));
	}
});

export const newsFormsSlice = createSlice({
	name: "newsForms",
	initialState,
	reducers: {
		setStringValue(
			state,
			action: {
				payload: {
					value: string;
					form: FormTypes;
					field: NewsStringValuesEnumType | NewsImageValuesEnumType;
				};
			},
		) {
			const { value, form, field } = action.payload;
			state[form].data[field] = value;
		},
		setInputErrorValue(
			state,
			action: {
				payload: {
					message: string;
					form: FormTypes;
					field: NewsFormValuesEnumType;
				};
			},
		) {
			const { message, form, field } = action.payload;
			state[form].error[field] = { message };
		},
		// REDACTOR
		addRedactorComponent(
			state,
			action: {
				payload: { data: RedactorFormComponentsType; form: FormTypes };
			},
		) {
			const { data, form } = action.payload;
			state[form].data[ReductorInFormEnum.REDACTOR].push(data);
		},
		removeRedactorComponent(
			state,
			action: {
				payload: { orderId: string; form: FormTypes };
			},
		) {
			const { orderId, form } = action.payload;
			state[form].data[ReductorInFormEnum.REDACTOR] = state[form].data[
				ReductorInFormEnum.REDACTOR
			].filter((component) => {
				return component.data.orderId !== orderId;
			});
		},
		updateRedactorComponent(
			state,
			action: {
				payload: {
					detailsComponent: RedactorFormComponentsType;
					index: number;
					form: FormTypes;
				};
			},
		) {
			const { detailsComponent, index, form } = action.payload;
			state[form].data[ReductorInFormEnum.REDACTOR][index] = detailsComponent;
		},
		setRedactorStateOrder(
			state,
			action: {
				payload: { data: RedactorFormComponentsType[]; form: FormTypes };
			},
		) {
			const { data, form } = action.payload;
			state[form].data[ReductorInFormEnum.REDACTOR] = data;
		},
		setRedactorComponentError(
			state,
			action: {
				payload: {
					error: RedactorFormDataErrorType;
					index: number;
					form: FormTypes;
				};
			},
		) {
			const { error, index, form } = action.payload;

			state[form].data[ReductorInFormEnum.REDACTOR][index].error = error;
		},

		clearErrors(state, action: { payload: FormTypes }) {
			state[action.payload].error = initError;
		},
		clearForm(state, action: { payload: FormTypes }) {
			state[action.payload] = initFormData;
		},
	},
	extraReducers(builder) {
		builder;
		// GET
		// .addCase(getNews.pending, (state) => {
		// 	state.update.fetching.status.getOne = "loading";
		// 	state.update.fetching.error.getOne = null;
		// })
		// .addCase(getNews.fulfilled, (state, action) => {
		// 	state.update.fetching.status.getOne = "succeeded";
		//
		// 	state.update.data = action.payload;
		// })
		// .addCase(getNews.rejected, (state, action) => {
		// 	state.update.fetching.status.getOne = "failed";
		// 	state.update.fetching.error.getOne = action.payload as ErrorResponse;
		// });
	},
});

export const {
	setStringValue,
	setInputErrorValue,
	// REDACTOR
	addRedactorComponent,
	removeRedactorComponent,
	updateRedactorComponent,
	setRedactorStateOrder,
	setRedactorComponentError,

	clearErrors,
	clearForm,
} = newsFormsSlice.actions;
export default newsFormsSlice.reducer;
