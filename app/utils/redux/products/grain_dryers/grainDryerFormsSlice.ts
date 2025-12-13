import { parseGrainDryerResponse } from "@/app/services/admin/products/grain_dryers.service";
import { reduxSerializeError } from "@/app/services/admin/response.service";
import { FormImageInputType, FormTypes, NotStepperValue } from "@/app/types/data/form.type";
import {
	GrainDryer,
	GrainDryerArrayValuesType,
	GrainDryerCheckboxesType,
	GrainDryerFormErrors,
	GrainDryerFormsState,
	GrainDryerFormState,
	GrainDryerNotStepperValuesEnum,
	GrainDryerNotStepperValuesType,
	GrainDryerResponseData,
	GrainDryerStepperValuesEnum,
	GrainDryerStepperValuesType,
	GrainDryerStringArrayValuesEnum,
	GrainDryerStringArrayValuesType,
	GrainDryerStringValuesEnum,
	GrainDryerStringValuesEnumType,
	GrainDryerValuesEnumType,
} from "@/app/types/data/products/grain_dryers/grain_dryers.type";
import {
	ProductImagesValuesEnum,
	ProductImagesValuesType,
	ProductImageValuesEnum,
	ProductImageValuesType,
} from "@/app/types/data/products/product.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { baseUrlGrainDryers } from "@/app/utils/redux/products/grain_dryers/grainDryersSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

	// RECOMENDED HEAT GENERATORS
	[GrainDryerStringArrayValuesEnum.RECOMENDED_HEAT_GENERATORS]: { message: "" },

	// GRAPHIC INFO
	[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]: { message: "" },
	[ProductImageValuesEnum.CARD_IMAGE]: { message: "" },
	[ProductImagesValuesEnum.PRODUCT_IMAGES]: { message: "" },
};
const initData: Omit<GrainDryer, "id"> = {
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

	// RECOMENDED HEAT GENERATORS
	[GrainDryerStringArrayValuesEnum.RECOMENDED_HEAT_GENERATORS]: [],

	// GRAPHIC INFO
	[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]: "",
	[ProductImageValuesEnum.CARD_IMAGE]: null,
	[ProductImagesValuesEnum.PRODUCT_IMAGES]: [],
};
const initFormData: GrainDryerFormState = {
	data: initData,
	checkboxes: {
		[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]: false,
	},
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

export const initialState: GrainDryerFormsState = {
	create: structuredClone(initFormData),
	update: structuredClone(initFormData),
};

export const getGrainDryer = createAsyncThunk(
	"grainDryerForms/getGrainDryer",
	async (id: string, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance.get<GrainDryerResponseData>(
				`${baseUrlGrainDryers}/${id}`,
			);

			const parsedData = await parseGrainDryerResponse(data);
			console.log("parsedData", parsedData);

			return parsedData;
		} catch (error) {
			return rejectWithValue(reduxSerializeError(error));
		}
	},
);

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
					field: GrainDryerStringValuesEnumType | ProductImageValuesType;
				};
			},
		) {
			const { value, form, field } = action.payload;
			state[form].data[field] = value;
		},
		deleteArrayValue(
			state,
			action: {
				payload: {
					index: number;
					form: FormTypes;
					field: ProductImagesValuesType | GrainDryerArrayValuesType;
				};
			},
		) {
			const { index, form, field } = action.payload;
			state[form].data[field].splice(index, 1);
		},
		pushStringArrayValue(
			state,
			action: {
				payload: {
					value: string;
					form: FormTypes;
					field: GrainDryerStringArrayValuesType;
				};
			},
		) {
			const { value, form, field } = action.payload;
			if (state[form].data[field].includes(value)) return;
			state[form].data[field].push(value);
		},
		pushImageArrayValues(
			state,
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
			state[form].data[field] = value;
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
			state[form].data[field] = value;
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

		clearErrors(state, action: { payload: FormTypes }) {
			state[action.payload].error = initError;
		},
		clearForm(state, action: { payload: FormTypes }) {
			state[action.payload] = initFormData;
		},
	},
	extraReducers(builder) {
		builder
			// GET
			.addCase(getGrainDryer.pending, (state) => {
				state.update.fetching.status.getOne = "loading";
				state.update.fetching.error.getOne = null;
			})
			.addCase(getGrainDryer.fulfilled, (state, action) => {
				state.update.fetching.status.getOne = "succeeded";

				state.update.data = {
					...action.payload,
					[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]:
						action.payload[GrainDryerStringValuesEnum.YOUTUBE_REVIEW] || "",
				};
				state.update.checkboxes = {
					[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]:
						!!action.payload[GrainDryerStringValuesEnum.YOUTUBE_REVIEW],
				};
			})
			.addCase(getGrainDryer.rejected, (state, action) => {
				state.update.fetching.status.getOne = "failed";
				state.update.fetching.error.getOne = action.payload as ErrorResponse;
			});
	},
});

export const {
	setStringValue,
	deleteArrayValue,
	pushStringArrayValue,
	pushImageArrayValues,
	setNotStepperValue,
	setStepperValue,
	handleCheckbox,
	setInputErrorValue,
	clearErrors,
	clearForm,
} = grainDryerFormsSlice.actions;
export default grainDryerFormsSlice.reducer;
