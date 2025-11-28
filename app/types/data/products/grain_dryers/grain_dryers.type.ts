import { NotStepperValue } from "@/app/types/data/form.type";
import {
	ProductImages,
	ProductImagesValuesEnum,
	ProductImagesValuesType,
	ProductImageValuesEnum,
	ProductImageValuesType,
} from "@/app/types/data/products/product.type";
import { ErrorsResponses, Status } from "@/app/types/data/response.type";
import { AsFromInputError } from "@/app/types/generic.type";

export interface GrainDryer extends ProductImages {
	id: string;
	// GENERAL
	[GrainDryerStringValuesEnum.TITLE]: string;
	[GrainDryerStepperValuesEnum.HEATING_SECTIONS]: number;
	[GrainDryerStepperValuesEnum.COOLING_SECTIONS]: number;
	[GrainDryerNotStepperValuesEnum.GRAIN_VOLUME]: NotStepperValue;
	[GrainDryerNotStepperValuesEnum.GRAIN_WEIGHT]: NotStepperValue;
	[GrainDryerStringValuesEnum.DRYING_METHOD]: string;
	[GrainDryerNotStepperValuesEnum.PRODUCTIVITY]: NotStepperValue;
	[GrainDryerNotStepperValuesEnum.HEATED_AIR_VOLUME]: NotStepperValue;
	[GrainDryerNotStepperValuesEnum.AIR_TEMPERATURE]: NotStepperValue;
	// POWER
	[GrainDryerNotStepperValuesEnum.NEEDED_HEAT_POWER]: NotStepperValue;
	[GrainDryerNotStepperValuesEnum.ELECTRIC_POWER]: NotStepperValue;
	[GrainDryerNotStepperValuesEnum.HEAT_POWER_CONSUMPTION]: NotStepperValue;
	// CONSTRUCTION SETTINGS
	[GrainDryerNotStepperValuesEnum.HEIGHT]: NotStepperValue;
	[GrainDryerNotStepperValuesEnum.WIDTH]: NotStepperValue;
	[GrainDryerNotStepperValuesEnum.LENGTH]: NotStepperValue;
	[GrainDryerNotStepperValuesEnum.WEIGHT]: NotStepperValue;
	// CONFIGURATION
	[GrainDryerStepperValuesEnum.HEAT_GENERATORS_COUNT]: number;
	[GrainDryerStepperValuesEnum.GRAIN_DRYERS_COUNT]: number;
	[GrainDryerStepperValuesEnum.LOADING_TANKS_TOP_COUNT]: number;
	[GrainDryerStepperValuesEnum.ELECTRICAL_ENCLOSURES_COUNT]: number;
	[GrainDryerStepperValuesEnum.HEATED_AIR_TEMPERATURE_SENSORS_COUNT]: number;
	[GrainDryerStepperValuesEnum.SMOKE_TEMPERATURE_SENSORS_COUNT]: number;
	[GrainDryerStepperValuesEnum.HEATED_GRAIN_TEMPERATURE_SENSORS_COUNT]: number;
	[GrainDryerStepperValuesEnum.COOLED_GRAIN_TEMPERATURE_SENSORS_COUNT]: number;
	[GrainDryerStepperValuesEnum.LOADING_TANK_ROTARY_LEVEL_SENSORS_COUNT]: number;
	[GrainDryerStepperValuesEnum.DRYER_TOP_SECTION_ROTARY_LEVEL_SENSORS_COUNT]: number;
	[GrainDryerStepperValuesEnum.WARRANTY_YEARS_COUNT]: number;
	// RECOMENDED HEAT GENERATORS
	[GrainDryerStringArrayValuesEnum.RECOMENDED_HEAT_GENERATORS]: string[];
	// GRAPHIC INFO
	[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]: string;
}
export interface GrainDryerListData {
	id: string;
	[GrainDryerStringValuesEnum.TITLE]: string;
}
export interface GrainDryerData {
	grain_dryers: GrainDryerListData[];
	grain_dryers_modal_is_open: boolean[];
	error: ErrorsResponses;
	status: Status;
}

// FETCHING
export interface GrainDryerResponseData
	extends Omit<GrainDryer, GrainDryerStringValuesEnum.YOUTUBE_REVIEW> {
	[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]?: string;
	[ProductImageValuesEnum.CARD_IMAGE]: string;
	[ProductImagesValuesEnum.PRODUCT_IMAGES]: string[];
}

// FORMS
export interface GrainDryerCheckboxes extends Record<string, boolean> {
	[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]: boolean;
}
export type GrainDryerFormErrors = AsFromInputError<Omit<GrainDryer, "id">>;
export interface GrainDryerFormState {
	data: Omit<GrainDryer, "id">;
	checkboxes: GrainDryerCheckboxes;
	error: GrainDryerFormErrors;
}
export interface GrainDryerFormsState {
	create: GrainDryerFormState;
	update: GrainDryerFormState;
}

// ENUMS
export enum GrainDryerStringValuesEnum {
	// GENERAL
	TITLE = "title",
	DRYING_METHOD = "drying_method",
	// GRAPHIC INFO
	YOUTUBE_REVIEW = "youtube_review",
}
// number enums
export enum GrainDryerNotStepperValuesEnum {
	// GENERAL
	GRAIN_VOLUME = "grain_volume",
	GRAIN_WEIGHT = "grain_weight",
	PRODUCTIVITY = "productivity",
	HEATED_AIR_VOLUME = "heated_air_volume",
	AIR_TEMPERATURE = "air_temperature",
	// POWER
	NEEDED_HEAT_POWER = "needed_heat_power",
	ELECTRIC_POWER = "electric_power",
	HEAT_POWER_CONSUMPTION = "heat_power_consumption",
	// CONSTRUCTION SETTINGS
	HEIGHT = "height",
	WIDTH = "width",
	LENGTH = "length",
	WEIGHT = "weight",
}
export enum GrainDryerStepperValuesEnum {
	// GENERAL
	HEATING_SECTIONS = "heating_sections",
	COOLING_SECTIONS = "cooling_sections",
	// CONFIGURATION
	HEAT_GENERATORS_COUNT = "heat_generators_count",
	GRAIN_DRYERS_COUNT = "grain_dryers_count",
	LOADING_TANKS_TOP_COUNT = "loading_tanks_top_count",
	ELECTRICAL_ENCLOSURES_COUNT = "electrical_enclosures_count",
	HEATED_AIR_TEMPERATURE_SENSORS_COUNT = "heated_air_temperature_sensors_count",
	SMOKE_TEMPERATURE_SENSORS_COUNT = "smoke_temperature_sensors_count",
	HEATED_GRAIN_TEMPERATURE_SENSORS_COUNT = "heated_grain_temperature_sensors_count",
	COOLED_GRAIN_TEMPERATURE_SENSORS_COUNT = "cooled_grain_temperature_sensors_count",
	LOADING_TANK_ROTARY_LEVEL_SENSORS_COUNT = "loading_tank_rotary_level_sensors_count",
	DRYER_TOP_SECTION_ROTARY_LEVEL_SENSORS_COUNT = "dryer_top_section_rotary_level_sensors_count",
	WARRANTY_YEARS_COUNT = "warranty_years_count",
}
// array enums
export enum GrainDryerStringArrayValuesEnum {
	RECOMENDED_HEAT_GENERATORS = "recomended_heat_generators",
}

// ENUM TYPES
export type GrainDryerValuesEnumType =
	| GrainDryerNumberValuesEnumType
	| GrainDryerStringValuesEnumType
	| ProductImageValuesType
	| ProductImagesValuesType
	| GrainDryerStringArrayValuesType;
export type GrainDryerStringValuesEnumType = `${GrainDryerStringValuesEnum}`;
// number
export type GrainDryerNumberValuesEnumType =
	| GrainDryerNotStepperValuesType
	| GrainDryerStepperValuesType;
export type GrainDryerNotStepperValuesType = `${GrainDryerNotStepperValuesEnum}`;
export type GrainDryerStepperValuesType = `${GrainDryerStepperValuesEnum}`;
// array
export type GrainDryerArrayValuesType = GrainDryerStringArrayValuesType;
export type GrainDryerStringArrayValuesType = `${GrainDryerStringArrayValuesEnum}`;

// OTHER TYPES
export type GrainDryerCheckboxesType = GrainDryerStringValuesEnum.YOUTUBE_REVIEW;
