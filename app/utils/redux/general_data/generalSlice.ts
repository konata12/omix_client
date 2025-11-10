import { reduxSerializeError } from "@/app/services/admin/response.service";
import {
	GeneralData,
	GeneralDataOptionalValuesEnumType,
	GeneralDataRequestValues,
	GeneralDataStringValuesEnum,
	GeneralDataValuesEnumType,
} from "@/app/types/data/general_data.type";
import { ErrorResponse, StatusType } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GeneralData = {
	phone_number: "",
	email: "",
	address: "",
	google_maps_url: "",
	youtube: "",
	facebook: "",
	instagram: "",
	checkboxes: {
		youtube: false,
		facebook: false,
		instagram: false,
	},
	error: {
		// data
		phone_number: { message: "" },
		email: { message: "" },
		address: { message: "" },
		google_maps_url: { message: "" },
		youtube: { message: "" },
		facebook: { message: "" },
		instagram: { message: "" },
		// requests
		get: null,
		update: null,
	},
	status: {
		get: null,
		update: null,
	},
};

export const updateGeneral = createAsyncThunk(
	"generalData/updateGeneral",
	async (data: GeneralDataRequestValues, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put("general/main", data);
			console.log(response);
			return response.data;
		} catch (error) {
			return rejectWithValue(reduxSerializeError(error));
		}
	},
);

export const getGeneral = createAsyncThunk(
	"generalData/getGeneral",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get("general/main");
			return response.data;
		} catch (error) {
			return rejectWithValue(reduxSerializeError(error));
		}
	},
);

export const generalDataSlice = createSlice({
	name: "generalData",
	initialState,
	reducers: {
		setStringValue(
			state,
			action: {
				payload: {
					value: string;
					field: GeneralDataValuesEnumType;
				};
			},
		) {
			const { value, field } = action.payload;
			state[field] = value;
		},
		handleCheckbox(
			state,
			action: {
				payload: {
					value: boolean;
					field: GeneralDataOptionalValuesEnumType;
				};
			},
		) {
			const { value, field } = action.payload;
			state.checkboxes[field] = value;
		},
		setInputErrorValue(
			state,
			action: {
				payload: {
					message: string;
					field: GeneralDataValuesEnumType;
				};
			},
		) {
			const { message, field } = action.payload;
			state.error[field] = { message };
		},
		updateStatus(
			state,
			action: {
				payload: {
					status: StatusType;
					field: "get" | "update";
				};
			},
		) {
			const { status, field } = action.payload;
			state.status[field] = status;
		},
	},
	extraReducers(builder) {
		builder
			// UPDATE
			.addCase(updateGeneral.pending, (state) => {
				state.status.update = "loading";
				state.error.update = null;
			})
			.addCase(updateGeneral.fulfilled, (state) => {
				state.status.update = "succeeded";
			})
			.addCase(updateGeneral.rejected, (state, action) => {
				state.status.update = "failed";
				state.error.update = action.payload as ErrorResponse;
			})

			// GET
			.addCase(getGeneral.pending, (state) => {
				state.status.get = "loading";
				state.error.get = null;
			})
			.addCase(
				getGeneral.fulfilled,
				(state, action: PayloadAction<GeneralDataRequestValues>) => {
					state.status.get = "succeeded";
					const {
						phone_number,
						email,
						address,
						google_maps_url,
						...social
					} = action.payload;

					// SET NEW STRING DATA
					state[GeneralDataStringValuesEnum.PHONE_NUMBER] = phone_number;
					state[GeneralDataStringValuesEnum.EMAIL] = email;
					state[GeneralDataStringValuesEnum.ADDRESS] = address;
					state[GeneralDataStringValuesEnum.GOOGLE_MAPS_URL] =
						google_maps_url;

					// SET NEW OPTIONAL DATA
					for (const key in social) {
						const field = key as GeneralDataOptionalValuesEnumType;
						state[field] = social[field] ? social[field] : "";
						state.checkboxes[field] = !!social[field];
					}
				},
			)
			.addCase(getGeneral.rejected, (state, action) => {
				state.status.get = "failed";
				state.error.get = action.payload as ErrorResponse;

				// Reset other state properties if needed
				state.phone_number = "";
				state.email = "";
				state.address = "";
				state.google_maps_url = "";
				state.youtube = "";
				state.facebook = "";
				state.instagram = "";
				state.checkboxes = {
					youtube: false,
					facebook: false,
					instagram: false,
				};
			});
	},
});

export const { setStringValue, handleCheckbox, setInputErrorValue, updateStatus } =
	generalDataSlice.actions;

export default generalDataSlice.reducer;
