import { reduxSerializeError } from "@/app/services/admin/response.service";
import { Faq, FaqData } from "@/app/types/data/faq.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FaqData = {
	faqs: [],
	faqs_modal_is_open: [],
	error: {
		getAll: null,
		update: null,
		create: null,
		delete: [],
	},
	status: {
		getAll: null,
		update: null,
		create: null,
		delete: null,
	},
};
const baseUrl = "general";

export const getFaq = createAsyncThunk(
	"faq/getFaq",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`${baseUrl}/faq`);
			return response.data;
		} catch (error) {
			return rejectWithValue(reduxSerializeError(error));
		}
	},
);

export const createFaq = createAsyncThunk(
	"faq/createFaq",
	async (data: Omit<Faq, "id">, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post(`${baseUrl}/faq`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(reduxSerializeError(error));
		}
	},
);

export const updateFaq = createAsyncThunk<Faq, Faq, { rejectValue: ErrorResponse }>(
	"faq/updateFaq",
	async (data: Faq, { rejectWithValue }) => {
		try {
			const { id, ...otherData } = data;
			await axiosInstance.put(`${baseUrl}/faq/${id}`, otherData);
			return data;
		} catch (error) {
			return rejectWithValue(reduxSerializeError(error));
		}
	},
);

export const deleteFaq = createAsyncThunk<
	string,
	string,
	{ rejectValue: ErrorResponse }
>("faq/deleteFaq", async (id: string, { rejectWithValue }) => {
	try {
		await axiosInstance.delete(`${baseUrl}/faq/${id}`);
		return id;
	} catch (error) {
		return rejectWithValue({ ...reduxSerializeError(error), id });
	}
});

export const faqSlice = createSlice({
	name: "faq",
	initialState,
	reducers: {
		handleFaqModal(state, action: { payload: { i: number; value: boolean } }) {
			const { i, value } = action.payload;
			state.faqs_modal_is_open[i] = value;
		},

		setUpdateError(state, action: { payload: string | null }) {
			if (action.payload) {
				state.error.update = { message: action.payload, statusCode: 500 };
			} else if (!action.payload) {
				state.error.update = null;
			}
		},
	},
	extraReducers(builder) {
		builder
			// GET
			.addCase(getFaq.pending, (state) => {
				state.status.getAll = "loading";
				state.error.getAll = null;
			})
			.addCase(getFaq.fulfilled, (state, action: PayloadAction<Faq[]>) => {
				state.status.getAll = "succeeded";
				state.faqs = action.payload;
				state.faqs_modal_is_open = new Array(state.faqs.length).fill(false);
				state.error.delete = new Array(state.faqs.length).fill(null);
			})
			.addCase(getFaq.rejected, (state, action) => {
				state.status.getAll = "failed";
				console.log(action.payload);
				state.error.getAll = action.payload as ErrorResponse;
			})

			// CREATE
			.addCase(createFaq.pending, (state) => {
				state.status.create = "loading";
				state.error.create = null;
			})
			.addCase(createFaq.fulfilled, (state, action: PayloadAction<Faq[]>) => {
				state.status.create = "succeeded";
				state.faqs = action.payload;
				state.faqs_modal_is_open = new Array(state.faqs.length).fill(false);
				state.error.delete = new Array(state.faqs.length).fill(null);
			})
			.addCase(createFaq.rejected, (state, action) => {
				state.status.create = "failed";
				state.error.create = action.payload as ErrorResponse;
			})

			// UPDATE
			.addCase(updateFaq.pending, (state) => {
				state.status.update = "loading";
				state.error.update = null;
			})
			.addCase(updateFaq.fulfilled, (state, action: PayloadAction<Faq>) => {
				state.status.update = "succeeded";
				const index = state.faqs.findIndex(
					(faq) => `${faq.id}` === action.payload.id,
				);
				state.faqs[index] = action.payload;
			})
			.addCase(updateFaq.rejected, (state, action) => {
				state.status.update = "failed";
				state.error.update = action.payload as ErrorResponse;
			})

			// DELETE
			.addCase(
				deleteFaq.pending,
				(state, action: PayloadAction<string | undefined>) => {
					state.status.delete = "loading";
					const index = state.faqs.findIndex(
						(faq) => faq.id === action.payload,
					);
					if (index !== -1) {
						state.error.delete[index] = null;
					}
				},
			)
			.addCase(deleteFaq.fulfilled, (state, action: PayloadAction<string>) => {
				state.status.delete = "succeeded";
				console.log("action.payload", action.payload);

				const index = state.faqs.findIndex((faq) => {
					console.log("state.faqs", state.faqs);
					return faq.id === action.payload;
				});
				if (index !== -1) {
					state.faqs.splice(index, 1);
					state.faqs_modal_is_open.splice(index, 1);
					state.error.delete.splice(index, 1);
				}
			})
			.addCase(deleteFaq.rejected, (state, action) => {
				state.status.delete = "failed";

				if (action.payload) {
					const error = action.payload;
					const index = state.faqs.findIndex((faq) => faq.id === error.id);
					if (index !== -1) {
						state.error.delete[index] = error;
					}
				}
			});
	},
});

export const { handleFaqModal, setUpdateError } = faqSlice.actions;
export default faqSlice.reducer;
