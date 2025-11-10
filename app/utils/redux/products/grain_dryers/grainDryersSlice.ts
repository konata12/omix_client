import { reduxSerializeError } from "@/app/services/admin/response.service";
import {
	GrainDryer,
	GrainDryerData,
} from "@/app/types/data/products/grain_dryers/grain_dryers.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GrainDryerData = {
	grain_dryers: [],
	grain_dryers_modal_is_open: [],
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

const baseUrl = "products";

export const getGrainDryer = createAsyncThunk(
	"grainDryer/getGrainDryer",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`${baseUrl}/grainDryer`);
			return response.data;
		} catch (error) {
			return rejectWithValue(reduxSerializeError(error));
		}
	},
);

export const createGrainDryer = createAsyncThunk(
	"grainDryer/createGrainDryer",
	async (data: Omit<GrainDryer, "id">, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post(`${baseUrl}/grainDryer`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(reduxSerializeError(error));
		}
	},
);

// export const updateGrainDryer = createAsyncThunk<GrainDryer, GrainDryer, { rejectValue: ErrorResponse }>(
// 	"grainDryer/updateGrainDryer",
// 	async (data: GrainDryer, { rejectWithValue }) => {
// 		try {
// 			const { id, ...otherData } = data;
// 			await axiosInstance.put(`${baseUrl}/grainDryer/${id}`, otherData);
// 			return data;
// 		} catch (error) {
// 			return rejectWithValue(reduxSerializeError(error));
// 		}
// 	},
// );
//
export const deleteGrainDryer = createAsyncThunk<
	string,
	string,
	{ rejectValue: ErrorResponse }
>("grainDryer/deleteGrainDryer", async (id: string, { rejectWithValue }) => {
	try {
		await axiosInstance.delete(`${baseUrl}/grainDryer/${id}`);
		return id;
	} catch (error) {
		return rejectWithValue({ ...reduxSerializeError(error), id });
	}
});

export const grainDryerSlice = createSlice({
	name: "grainDryer",
	initialState,
	reducers: {
		handleGrainDryerModal(
			state,
			action: { payload: { i: number; value: boolean } },
		) {
			const { i, value } = action.payload;
			state.grain_dryers_modal_is_open[i] = value;
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
			.addCase(getGrainDryer.pending, (state) => {
				state.status.getAll = "loading";
				state.error.getAll = null;
			})
			.addCase(
				getGrainDryer.fulfilled,
				(state, action: PayloadAction<GrainDryer[]>) => {
					state.status.getAll = "succeeded";
					state.grain_dryers = action.payload;
					state.grain_dryers_modal_is_open = new Array(
						state.grain_dryers.length,
					).fill(false);
					state.error.delete = new Array(state.grain_dryers.length).fill(
						null,
					);
				},
			)
			.addCase(getGrainDryer.rejected, (state, action) => {
				state.status.getAll = "failed";
				console.log(action.payload);
				state.error.getAll = action.payload as ErrorResponse;
			})

			// CREATE
			.addCase(createGrainDryer.pending, (state) => {
				state.status.create = "loading";
				state.error.create = null;
			})
			.addCase(
				createGrainDryer.fulfilled,
				(state, action: PayloadAction<GrainDryer[]>) => {
					state.status.create = "succeeded";
					state.grain_dryers = action.payload;
					state.grain_dryers_modal_is_open = new Array(
						state.grain_dryers.length,
					).fill(false);
					state.error.delete = new Array(state.grain_dryers.length).fill(
						null,
					);
				},
			)
			.addCase(createGrainDryer.rejected, (state, action) => {
				state.status.create = "failed";
				state.error.create = action.payload as ErrorResponse;
			})
			//
			// // UPDATE
			// .addCase(updateGrainDryer.pending, (state) => {
			// 	state.status.update = "loading";
			// 	state.error.update = null;
			// })
			// .addCase(updateGrainDryer.fulfilled, (state, action: PayloadAction<GrainDryer>) => {
			// 	state.status.update = "succeeded";
			// 	const index = state.grainDryers.findIndex(
			// 		(grainDryer) => `${grainDryer.id}` === action.payload.id,
			// 	);
			// 	state.grainDryers[index] = action.payload;
			// })
			// .addCase(updateGrainDryer.rejected, (state, action) => {
			// 	state.status.update = "failed";
			// 	state.error.update = action.payload as ErrorResponse;
			// })
			//
			// DELETE
			.addCase(
				deleteGrainDryer.pending,
				(state, action: PayloadAction<string | undefined>) => {
					state.status.delete = "loading";
					const index = state.grain_dryers.findIndex(
						(grain_dryer) => grain_dryer.id === action.payload,
					);
					if (index !== -1) {
						state.error.delete[index] = null;
					}
				},
			)
			.addCase(
				deleteGrainDryer.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.status.delete = "succeeded";
					const index = state.grain_dryers.findIndex((grain_dryer) => {
						console.log("state.grainDryers", state.grain_dryers);
						return grain_dryer.id === action.payload;
					});
					if (index !== -1) {
						state.grain_dryers.splice(index, 1);
						state.grain_dryers_modal_is_open.splice(index, 1);
						state.error.delete.splice(index, 1);
					}
				},
			)
			.addCase(deleteGrainDryer.rejected, (state, action) => {
				state.status.delete = "failed";

				if (action.payload) {
					const error = action.payload;
					const index = state.grain_dryers.findIndex(
						(grain_dryer) => grain_dryer.id === error.id,
					);
					if (index !== -1) {
						state.error.delete[index] = error;
					}
				}
			});
	},
});

export const { handleGrainDryerModal, setUpdateError } = grainDryerSlice.actions;
export default grainDryerSlice.reducer;
