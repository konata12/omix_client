import { ErrorsResponses, Status } from "@/app/types/data/response.type";
import { AsFromInputError } from "@/app/types/generic.type";

export interface GrainDryer {
	id: string;
	// GENERAL
	[GrainDryerValuesEnum.TITLE]: string;
	[GrainDryerValuesEnum.HEATING_SECTIONS]: number;
	[GrainDryerValuesEnum.COOLING_SECTIONS]: number;
	[GrainDryerValuesEnum.GRAIN_VOLUME]: number;
	[GrainDryerValuesEnum.GRAIN_WEIGHT]: number;
	[GrainDryerValuesEnum.DRYING_METHOD]: string;
	[GrainDryerValuesEnum.PRODUCTIVITY]: number;
	[GrainDryerValuesEnum.HEATED_AIR_VOLUME]: number;
	[GrainDryerValuesEnum.AIR_TEMPERATURE]: number;
	// POWER
	[GrainDryerValuesEnum.NEEDED_HEAT_POWER]: number;
	[GrainDryerValuesEnum.ELECTRIC_POWER]: number;
	[GrainDryerValuesEnum.HEAT_POWER_CONSUMPTION]: number;
	// CONSTRUCTION SETTINGS
	[GrainDryerValuesEnum.HEIGHT]: number;
	[GrainDryerValuesEnum.WIDTH]: number;
	[GrainDryerValuesEnum.LENGTH]: number;
	[GrainDryerValuesEnum.WEIGHT]: number;
	// CONFIGURATION
	[GrainDryerValuesEnum.HEAT_GENERATORS_COUNT]: number;
	[GrainDryerValuesEnum.GRAIN_DRYERS_COUNT]: number;
	[GrainDryerValuesEnum.LOADING_TANKS_TOP_COUNT]: number;
	[GrainDryerValuesEnum.ELECTRICAL_ENCLOSURES_COUNT]: number;
	[GrainDryerValuesEnum.HEATED_AIR_TEMPERATURE_SENSORS_COUNT]: number;
	[GrainDryerValuesEnum.SMOKE_TEMPERATURE_SENSORS_COUNT]: number;
	[GrainDryerValuesEnum.HEATED_GRAIN_TEMPERATURE_SENSORS_COUNT]: number;
	[GrainDryerValuesEnum.COOLED_GRAIN_TEMPERATURE_SENSORS_COUNT]: number;
	[GrainDryerValuesEnum.LOADING_TANK_ROTARY_LEVEL_SENSORS_COUNT]: number;
	[GrainDryerValuesEnum.DRYER_TOP_SECTION_ROTARY_LEVEL_SENSORS_COUNT]: number;
	[GrainDryerValuesEnum.WARRANTY_YEARS_COUNT]: number;
	// GRAPHIC INFO
	[GrainDryerValuesEnum.YOUTUBE_REVIEW]: string;
	[GrainDryerValuesEnum.CARD_IMAGE]: string;
	[GrainDryerValuesEnum.PRODUCT_IMAGES]: string;
}

export interface GrainDryerData {
	grain_dryers: GrainDryer[];
	grain_dryers_modal_is_open: boolean[];
	error: ErrorsResponses;
	status: Status;
}

// FORMS
export type GrainDryerFormErrors = AsFromInputError<Omit<GrainDryer, "id">>;
export interface GrainDryerFormState extends Omit<GrainDryer, "id"> {
	error: GrainDryerFormErrors;
}
export interface GrainDryerFormsState {
	create: GrainDryerFormState;
	update: GrainDryerFormState;
}

// ENUMS
export enum GrainDryerValuesEnum {
	// GENERAL
	TITLE = "title",
	HEATING_SECTIONS = "heating_sections",
	COOLING_SECTIONS = "cooling_sections",
	GRAIN_VOLUME = "grain_volume",
	GRAIN_WEIGHT = "grain_weight",
	DRYING_METHOD = "drying_method",
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
	// GRAPHIC INFO
	YOUTUBE_REVIEW = "youtube_review",
	CARD_IMAGE = "card_image",
	PRODUCT_IMAGES = "product_images",
}
export enum GrainDryerNumberValuesEnum {
	// GENERAL
	HEATING_SECTIONS = "heating_sections",
	COOLING_SECTIONS = "cooling_sections",
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
export enum GrainDryerStringValuesEnum {
	// GENERAL
	TITLE = "title",
	DRYING_METHOD = "drying_method",
	// GRAPHIC INFO
	YOUTUBE_REVIEW = "youtube_review",
	CARD_IMAGE = "card_image",
	PRODUCT_IMAGES = "product_images",
}

// ENUM TYPES
export type GrainDryerValuesEnumType = `${GrainDryerValuesEnum}`;
export type GrainDryerNumberValuesEnumType = `${GrainDryerNumberValuesEnum}`;
export type GrainDryerStringValuesEnumType = `${GrainDryerStringValuesEnum}`;
