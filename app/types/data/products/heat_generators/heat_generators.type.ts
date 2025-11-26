import { FormImageInputType, NotStepperValue } from "@/app/types/data/form.type";
import { ErrorResponse, ErrorsResponses, Status, StatusType } from "@/app/types/data/response.type";
import { AsFromInputError } from "@/app/types/generic.type";

export type HeatGeneratorsTypes = "household" | "industrial";

export interface HeatGenerator {
	id: string;
	// GENERAL
	[HeatGeneratorStringValuesEnum.TITLE]: string;
	// POWER
	[HeatGeneratorNotStepperValuesEnum.NOMINAL_POWER]: NotStepperValue;
	[HeatGeneratorNotStepperValuesEnum.MAX_POWER]: NotStepperValue;
	[HeatGeneratorNotStepperValuesEnum.ELECTRIC_POWER]: NotStepperValue;
	[HeatGeneratorStringValuesEnum.POWER_REGULATION_DIAPASON]: string;
	// FUEL
	[HeatGeneratorStringValuesEnum.FUEL_BURNING_TYPE]: string;
	[HeatGeneratorStringValuesEnum.FUEL_TYPE]: string;
	[HeatGeneratorStringValuesEnum.FUEL_MOISTURE]: string;
	[HeatGeneratorStringValuesEnum.FUEL_BURNING_TIME]: string;
	// CONSTRUCTION SETTINGS
	[HeatGeneratorNotStepperValuesEnum.HEIGHT]: NotStepperValue;
	[HeatGeneratorNotStepperValuesEnum.WIDTH]: NotStepperValue;
	[HeatGeneratorNotStepperValuesEnum.LENGTH]: NotStepperValue;
	[HeatGeneratorNotStepperValuesEnum.WEIGHT]: NotStepperValue;
	[HeatGeneratorStringValuesEnum.FURNACE_CROSS_SECTION]: string;
	[HeatGeneratorNotStepperValuesEnum.FURNACE_VOLUME]: NotStepperValue;
	[HeatGeneratorStringValuesEnum.FURNACE_MATERIAL]: string;
	[HeatGeneratorStringValuesEnum.FURNACE_HEAT_EXCHANGER_MATERIAL]: string;
	// CONFIGURATION
	[HeatGeneratorStepperValuesEnum.HEAT_GENERATORS_COUNT]: number;
	[HeatGeneratorStepperValuesEnum.EXHAUST_FANS_COUNT]: number;
	[HeatGeneratorStringValuesEnum.FAN_MODEL]: string;
	[HeatGeneratorStepperValuesEnum.FAN_MODELS_COUNT]: number;
	[HeatGeneratorStepperValuesEnum.WARRANTY_YEARS_COUNT]: number;
	// GRAPHIC INFO
	[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]: string;
	[HeatGeneratorImageValuesEnum.CARD_IMAGE]: FormImageInputType;
	[HeatGeneratorImagesValuesEnum.PRODUCT_IMAGES]: FormImageInputType[];
}
export interface HeatGeneratorListData {
	id: string;
	[HeatGeneratorStringValuesEnum.TITLE]: string;
}
export interface HeatGeneratorData {
	heat_generators: HeatGeneratorListData[];
	heat_generators_modal_is_open: boolean[];
	error: ErrorsResponses;
	status: Status;
}
export type HeatGeneratorSliceData = {
	[K in HeatGeneratorsTypes]: HeatGeneratorData;
};

// FETCHING
export interface HeatGeneratorsListResponseData {
	data: HeatGeneratorListData[];
	type: HeatGeneratorsTypes;
}
export interface HeatGeneratorResponseData
	extends Omit<
		HeatGenerator,
		HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW | HeatGeneratorStringValuesEnum.FAN_MODEL
	> {
	[HeatGeneratorStringValuesEnum.FAN_MODEL]?: string;
	[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]?: string;
	[HeatGeneratorImageValuesEnum.CARD_IMAGE]: string;
	[HeatGeneratorImagesValuesEnum.PRODUCT_IMAGES]: string[];
}
export interface HeatGeneratorsCreateData extends Partial<Omit<HeatGenerator, "id">> {
	type: HeatGeneratorsTypes;
}

// FORMS
export interface HeatGeneratorCheckboxes extends Record<string, boolean> {
	[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]: boolean;
}
export type HeatGeneratorFormErrors = AsFromInputError<Omit<HeatGenerator, "id">>;
export interface HeatGeneratorFormState {
	data: Omit<HeatGenerator, "id">;
	checkboxes: HeatGeneratorCheckboxes;
	error: HeatGeneratorFormErrors;
	fetching: {
		status: {
			getOne: StatusType;
		};
		error: {
			getOne: ErrorResponse | null;
		};
	};
}
export interface HeatGeneratorFormsState {
	create: HeatGeneratorFormState;
	update: HeatGeneratorFormState;
}

export interface HeatGeneratorCompareType
	extends Omit<
		HeatGenerator,
		"id" | HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW | HeatGeneratorStringValuesEnum.FAN_MODEL
	> {
	[HeatGeneratorStringValuesEnum.FAN_MODEL]?: string;
	[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]?: string;
}

// ENUMS
export enum HeatGeneratorStringValuesEnum {
	// GENERAL
	TITLE = "title",
	// POWER
	POWER_REGULATION_DIAPASON = "power_regulation_diapason",
	// FUEL
	FUEL_BURNING_TYPE = "fuel_burning_type",
	FUEL_TYPE = "fuel_type",
	FUEL_MOISTURE = "fuel_moisture",
	FUEL_BURNING_TIME = "fuel_burning_time",
	// CONSTRUCTION SETTINGS
	FURNACE_CROSS_SECTION = "furnace_cross_section",
	FURNACE_MATERIAL = "furnace_material",
	FURNACE_HEAT_EXCHANGER_MATERIAL = "furnace_heat_exchanger_material",
	// CONFIGURATION
	FAN_MODEL = "fan_model",
	// GRAPHIC INFO
	YOUTUBE_REVIEW = "youtube_review",
}
// number enums
export enum HeatGeneratorNotStepperValuesEnum {
	// POWER
	NOMINAL_POWER = "nominal_power",
	MAX_POWER = "max_power",
	ELECTRIC_POWER = "electric_power",
	// CONSTRUCTION SETTINGS
	HEIGHT = "height",
	WIDTH = "width",
	LENGTH = "length",
	WEIGHT = "weight",
	FURNACE_VOLUME = "furnace_volume",
}
export enum HeatGeneratorStepperValuesEnum {
	// CONFIGURATION
	HEAT_GENERATORS_COUNT = "heat_generators_count",
	EXHAUST_FANS_COUNT = "exhaust_fans_count",
	FAN_MODELS_COUNT = "fan_models_count",
	WARRANTY_YEARS_COUNT = "warranty_years_count",
}
// images enums
export enum HeatGeneratorImageValuesEnum {
	CARD_IMAGE = "card_image",
}
export enum HeatGeneratorImagesValuesEnum {
	PRODUCT_IMAGES = "product_images",
}

// ENUM TYPES
export type HeatGeneratorValuesEnumType =
	| HeatGeneratorNumberValuesEnumType
	| HeatGeneratorStringValuesEnumType
	| HeatGeneratorImageValuesType
	| HeatGeneratorImagesValuesType;
export type HeatGeneratorStringValuesEnumType = `${HeatGeneratorStringValuesEnum}`;
// number
export type HeatGeneratorNumberValuesEnumType =
	| HeatGeneratorNotStepperValuesType
	| HeatGeneratorStepperValuesType;
export type HeatGeneratorNotStepperValuesType = `${HeatGeneratorNotStepperValuesEnum}`;
export type HeatGeneratorStepperValuesType = `${HeatGeneratorStepperValuesEnum}`;
// graphic
export type HeatGeneratorImageValuesType = `${HeatGeneratorImageValuesEnum}`;
export type HeatGeneratorImagesValuesType = `${HeatGeneratorImagesValuesEnum}`;

// OTHER TYPES
export type HeatGeneratorCheckboxesType = HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW;
