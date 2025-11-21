import { HEAT_GENERATOR_TYPES } from "@/app/admin/(provided_with_redux)/(pages)/products/heat_generators/constants";
import { createHeatGeneratorFormData } from "@/app/services/admin/products/heat_generators.service";
import { reduxSerializeError } from "@/app/services/admin/response.service";
import {
	HeatGeneratorData,
	HeatGeneratorsCreateData,
	HeatGeneratorSliceData,
	HeatGeneratorsResponseData,
	HeatGeneratorsTypes,
} from "@/app/types/data/products/heat_generators/heat_generators.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

const emptyHeatGeneratorData: HeatGeneratorData = {
	heat_generators: [],
	heat_generators_modal_is_open: [],
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

export const initialState: HeatGeneratorSliceData = Object.fromEntries(
	HEAT_GENERATOR_TYPES.map((type) => [type, _.cloneDeep(emptyHeatGeneratorData)]),
) as HeatGeneratorSliceData;

const baseUrl = "heat-generators";

export const getHeatGenerator = createAsyncThunk(
	"heatGenerator/getHeatGenerator",
	async (type: HeatGeneratorsTypes, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`${baseUrl}?type=${type}`);
			return { data: response.data, type };
		} catch (error) {
			return rejectWithValue(reduxSerializeError(error));
		}
	},
);

export const createHeatGenerator = createAsyncThunk(
	"heatGenerator/createHeatGenerator",
	async (props: HeatGeneratorsCreateData, { rejectWithValue }) => {
		try {
			const { type } = props;
			const formData = await createHeatGeneratorFormData(props);
			console.log("formData: ", Array.from(formData));
			console.log(props);
			const response = await axiosInstance.post(`${baseUrl}`, formData);
			console.log(response.data);
			return { data: response.data, type };
		} catch (error) {
			return rejectWithValue(reduxSerializeError(error));
		}
	},
);

// export const updateHeatGenerator = createAsyncThunk<HeatGenerator, HeatGenerator, { rejectValue: ErrorResponse }>(
// 	"heatGenerator/updateHeatGenerator",
// 	async (data: HeatGenerator, { rejectWithValue }) => {
// 		try {
// 			const { id, ...otherData } = data;
// 			await axiosInstance.put(`${baseUrl}/${id}`, otherData);
// 			return data;
// 		} catch (error) {
// 			return rejectWithValue(reduxSerializeError(error));
// 		}
// 	},
// );

export const deleteHeatGenerator = createAsyncThunk<
	{ id: string; type: HeatGeneratorsTypes },
	{ id: string; type: HeatGeneratorsTypes },
	{ rejectValue: ErrorResponse }
>("heatGenerator/deleteHeatGenerator", async (props, { rejectWithValue }) => {
	const { id, type } = props;
	try {
		await axiosInstance.delete(`${baseUrl}/${id}`);
		return { id, type };
	} catch (error) {
		return rejectWithValue({ ...reduxSerializeError(error), id });
	}
});

export const heatGeneratorSlice = createSlice({
	name: "heatGenerator",
	initialState,
	reducers: {
		handleHeatGeneratorModal(
			state,
			action: { payload: { i: number; value: boolean; type: HeatGeneratorsTypes } },
		) {
			const { i, value, type } = action.payload;
			state[type].heat_generators_modal_is_open[i] = value;
		},

		setUpdateError(
			state,
			action: { payload: { message: string | null; type: HeatGeneratorsTypes } },
		) {
			const { message, type } = action.payload;

			if (message) {
				state[type].error.update = { message, statusCode: 500 };
			} else if (!message) {
				state[type].error.update = null;
			}
		},
	},
	extraReducers(builder) {
		builder
			// GET
			.addCase(getHeatGenerator.pending, (state, action) => {
				const type = action.meta.arg;
				state[type].status.getAll = "loading";
				state[type].error.getAll = null;
			})
			.addCase(
				getHeatGenerator.fulfilled,
				(state, action: PayloadAction<HeatGeneratorsResponseData>) => {
					const { data, type } = action.payload;

					state[type].status.getAll = "succeeded";
					state[type].heat_generators = data;
					state[type].heat_generators_modal_is_open = new Array(data.length).fill(false);
					state[type].error.delete = new Array(data.length).fill(null);
				},
			)
			.addCase(getHeatGenerator.rejected, (state, action) => {
				const type = action.meta.arg;
				state[type].status.getAll = "failed";
				state[type].error.getAll = action.payload as ErrorResponse;
			})

			// CREATE
			.addCase(createHeatGenerator.pending, (state, action) => {
				const type = action.meta.arg.type;
				state[type].status.create = "loading";
				state[type].error.create = null;
			})
			.addCase(
				createHeatGenerator.fulfilled,
				(state, action: PayloadAction<HeatGeneratorsResponseData>) => {
					const { data, type } = action.payload;

					state[type].status.create = "succeeded";
					state[type].heat_generators = data;
					state[type].heat_generators_modal_is_open = new Array(data.length).fill(false);
					state[type].error.delete = new Array(data.length).fill(null);
				},
			)
			.addCase(createHeatGenerator.rejected, (state, action) => {
				const type = action.meta.arg.type;
				state[type].status.create = "failed";
				state[type].error.create = action.payload as ErrorResponse;
			})
			//
			// // UPDATE
			// .addCase(updateHeatGenerator.pending, (state) => {
			// 	state.status.update = "loading";
			// 	state.error.update = null;
			// })
			// .addCase(updateHeatGenerator.fulfilled, (state, action: PayloadAction<HeatGenerator>) => {
			// 	state.status.update = "succeeded";
			// 	const index = state.heatGenerators.findIndex(
			// 		(heatGenerator) => `${heatGenerator.id}` === action.payload.id,
			// 	);
			// 	state.heatGenerators[index] = action.payload;
			// })
			// .addCase(updateHeatGenerator.rejected, (state, action) => {
			// 	state.status.update = "failed";
			// 	state.error.update = action.payload as ErrorResponse;
			// })
			//
			// DELETE
			.addCase(deleteHeatGenerator.pending, (state, action) => {
				const { id, type } = action.meta.arg;
				state[type].status.delete = "loading";
				const index = state[type].heat_generators.findIndex(
					(grain_dryer) => grain_dryer.id === id,
				);
				if (index !== -1) {
					state[type].error.delete[index] = null;
				}
			})
			.addCase(deleteHeatGenerator.fulfilled, (state, action) => {
				const { id, type } = action.payload;

				state[type].status.delete = "succeeded";
				const index = state[type].heat_generators.findIndex((grain_dryer) => {
					console.log("state.heatGenerators", state[type].heat_generators);
					return grain_dryer.id === id;
				});
				if (index !== -1) {
					state[type].heat_generators.splice(index, 1);
					state[type].heat_generators_modal_is_open.splice(index, 1);
					state[type].error.delete.splice(index, 1);
				}
			})
			.addCase(deleteHeatGenerator.rejected, (state, action) => {
				const { type } = action.meta.arg;
				state[type].status.delete = "failed";

				if (action.payload) {
					const error = action.payload;
					const index = state[type].heat_generators.findIndex(
						(grain_dryer) => grain_dryer.id === error.id,
					);
					if (index !== -1) {
						state[type].error.delete[index] = error;
					}
				}
			});
	},
});

export const { handleHeatGeneratorModal, setUpdateError } = heatGeneratorSlice.actions;
export default heatGeneratorSlice.reducer;
