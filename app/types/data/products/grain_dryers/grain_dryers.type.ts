import { NotStepperValue } from "@/app/types/data/form.type";
import { ErrorsResponses, Status } from "@/app/types/data/response.type";
import { AsFromInputError } from "@/app/types/generic.type";

export interface GrainDryer {
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
	// GRAPHIC INFO
	[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]: string;
	[GrainDryerStringValuesEnum.CARD_IMAGE]: string;
	[GrainDryerStringValuesEnum.PRODUCT_IMAGES]: string;
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
export enum GrainDryerStringValuesEnum {
	// GENERAL
	TITLE = "title",
	DRYING_METHOD = "drying_method",
	// GRAPHIC INFO
	YOUTUBE_REVIEW = "youtube_review",
	CARD_IMAGE = "card_image",
	PRODUCT_IMAGES = "product_images",
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

// ENUM TYPES
export type GrainDryerValuesEnumType = GrainDryerNumberValuesEnumType | GrainDryerStringValuesEnumType;
export type GrainDryerStringValuesEnumType = `${GrainDryerStringValuesEnum}`;

export type GrainDryerNumberValuesEnumType =
	| GrainDryerNotStepperValuesType
	| GrainDryerStepperValuesType;
export type GrainDryerNotStepperValuesType = `${GrainDryerNotStepperValuesEnum}`;
export type GrainDryerStepperValuesType = `${GrainDryerStepperValuesEnum}`;

// export enum GrainDryerNumberValuesEnum {
// 	// GENERAL
// 	HEATING_SECTIONS = "heating_sections",
// 	COOLING_SECTIONS = "cooling_sections",
// 	GRAIN_VOLUME = "grain_volume",
// 	GRAIN_WEIGHT = "grain_weight",
// 	PRODUCTIVITY = "productivity",
// 	HEATED_AIR_VOLUME = "heated_air_volume",
// 	AIR_TEMPERATURE = "air_temperature",
// 	// POWER
// 	NEEDED_HEAT_POWER = "needed_heat_power",
// 	ELECTRIC_POWER = "electric_power",
// 	HEAT_POWER_CONSUMPTION = "heat_power_consumption",
// 	// CONSTRUCTION SETTINGS
// 	HEIGHT = "height",
// 	WIDTH = "width",
// 	LENGTH = "length",
// 	WEIGHT = "weight",
// 	// CONFIGURATION
// 	HEAT_GENERATORS_COUNT = "heat_generators_count",
// 	GRAIN_DRYERS_COUNT = "grain_dryers_count",
// 	LOADING_TANKS_TOP_COUNT = "loading_tanks_top_count",
// 	ELECTRICAL_ENCLOSURES_COUNT = "electrical_enclosures_count",
// 	HEATED_AIR_TEMPERATURE_SENSORS_COUNT = "heated_air_temperature_sensors_count",
// 	SMOKE_TEMPERATURE_SENSORS_COUNT = "smoke_temperature_sensors_count",
// 	HEATED_GRAIN_TEMPERATURE_SENSORS_COUNT = "heated_grain_temperature_sensors_count",
// 	COOLED_GRAIN_TEMPERATURE_SENSORS_COUNT = "cooled_grain_temperature_sensors_count",
// 	LOADING_TANK_ROTARY_LEVEL_SENSORS_COUNT = "loading_tank_rotary_level_sensors_count",
// 	DRYER_TOP_SECTION_ROTARY_LEVEL_SENSORS_COUNT = "dryer_top_section_rotary_level_sensors_count",
// 	WARRANTY_YEARS_COUNT = "warranty_years_count",
// }
