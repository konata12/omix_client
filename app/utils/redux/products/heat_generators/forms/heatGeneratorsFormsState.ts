import {
	HeatGenerator,
	HeatGeneratorCheckboxes,
	HeatGeneratorFormErrors,
	HeatGeneratorFormsState,
	HeatGeneratorFormState,
	HeatGeneratorImagesValuesEnum,
	HeatGeneratorImageValuesEnum,
	HeatGeneratorNotStepperValuesEnum,
	HeatGeneratorStepperValuesEnum,
	HeatGeneratorStringValuesEnum,
} from "@/app/types/data/products/heat_generators/heat_generators.type";
import _ from "lodash";

export const FUEL_BURNING_TYPE_DEFAULT_VALUE = "Оберіть спосіб горіння";

const initError: HeatGeneratorFormErrors = {
	// GENERAL
	[HeatGeneratorStringValuesEnum.TITLE]: { message: "" },

	// POWER
	[HeatGeneratorNotStepperValuesEnum.NOMINAL_POWER]: { message: "" },
	[HeatGeneratorNotStepperValuesEnum.MAX_POWER]: { message: "" },
	[HeatGeneratorNotStepperValuesEnum.ELECTRIC_POWER]: { message: "" },
	[HeatGeneratorStringValuesEnum.POWER_REGULATION_DIAPASON]: { message: "" },

	// FUEL
	[HeatGeneratorStringValuesEnum.FUEL_BURNING_TYPE]: { message: "" },
	[HeatGeneratorStringValuesEnum.FUEL_TYPE]: { message: "" },
	[HeatGeneratorStringValuesEnum.FUEL_MOISTURE]: { message: "" },
	[HeatGeneratorStringValuesEnum.FUEL_BURNING_TIME]: { message: "" },

	// CONSTRUCTION SETTINGS
	[HeatGeneratorNotStepperValuesEnum.HEIGHT]: { message: "" },
	[HeatGeneratorNotStepperValuesEnum.WIDTH]: { message: "" },
	[HeatGeneratorNotStepperValuesEnum.LENGTH]: { message: "" },
	[HeatGeneratorNotStepperValuesEnum.WEIGHT]: { message: "" },
	[HeatGeneratorStringValuesEnum.FURNACE_CROSS_SECTION]: { message: "" },
	[HeatGeneratorNotStepperValuesEnum.FURNACE_VOLUME]: { message: "" },
	[HeatGeneratorStringValuesEnum.FURNACE_MATERIAL]: { message: "" },
	[HeatGeneratorStringValuesEnum.FURNACE_HEAT_EXCHANGER_MATERIAL]: { message: "" },

	// CONFIGURATION
	[HeatGeneratorStepperValuesEnum.HEAT_GENERATORS_COUNT]: { message: "" },
	[HeatGeneratorStepperValuesEnum.EXHAUST_FANS_COUNT]: { message: "" },
	[HeatGeneratorStringValuesEnum.FAN_MODEL]: { message: "" },
	[HeatGeneratorStepperValuesEnum.FAN_MODELS_COUNT]: { message: "" },
	[HeatGeneratorStepperValuesEnum.WARRANTY_YEARS_COUNT]: { message: "" },

	// GRAPHIC INFO
	[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]: { message: "" },
	[HeatGeneratorImageValuesEnum.CARD_IMAGE]: { message: "" },
	[HeatGeneratorImagesValuesEnum.PRODUCT_IMAGES]: { message: "" },
};
const initFormData: Omit<HeatGenerator, "id"> = {
	// GENERAL
	[HeatGeneratorStringValuesEnum.TITLE]: "",

	// POWER
	[HeatGeneratorNotStepperValuesEnum.NOMINAL_POWER]: "",
	[HeatGeneratorNotStepperValuesEnum.MAX_POWER]: "",
	[HeatGeneratorNotStepperValuesEnum.ELECTRIC_POWER]: "",
	[HeatGeneratorStringValuesEnum.POWER_REGULATION_DIAPASON]: "",

	// FUEL
	[HeatGeneratorStringValuesEnum.FUEL_BURNING_TYPE]: FUEL_BURNING_TYPE_DEFAULT_VALUE,
	[HeatGeneratorStringValuesEnum.FUEL_TYPE]: "",
	[HeatGeneratorStringValuesEnum.FUEL_MOISTURE]: "",
	[HeatGeneratorStringValuesEnum.FUEL_BURNING_TIME]: "",

	// CONSTRUCTION SETTINGS
	[HeatGeneratorNotStepperValuesEnum.HEIGHT]: "",
	[HeatGeneratorNotStepperValuesEnum.WIDTH]: "",
	[HeatGeneratorNotStepperValuesEnum.LENGTH]: "",
	[HeatGeneratorNotStepperValuesEnum.WEIGHT]: "",
	[HeatGeneratorStringValuesEnum.FURNACE_CROSS_SECTION]: "",
	[HeatGeneratorNotStepperValuesEnum.FURNACE_VOLUME]: "",
	[HeatGeneratorStringValuesEnum.FURNACE_MATERIAL]: "",
	[HeatGeneratorStringValuesEnum.FURNACE_HEAT_EXCHANGER_MATERIAL]: "",

	// CONFIGURATION
	[HeatGeneratorStepperValuesEnum.HEAT_GENERATORS_COUNT]: 0,
	[HeatGeneratorStepperValuesEnum.EXHAUST_FANS_COUNT]: 0,
	[HeatGeneratorStringValuesEnum.FAN_MODEL]: "",
	[HeatGeneratorStepperValuesEnum.FAN_MODELS_COUNT]: 0,
	[HeatGeneratorStepperValuesEnum.WARRANTY_YEARS_COUNT]: 0,

	// GRAPHIC INFO
	[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]: "",
	[HeatGeneratorImageValuesEnum.CARD_IMAGE]: null,
	[HeatGeneratorImagesValuesEnum.PRODUCT_IMAGES]: [],
};
const checkboxesInitData: HeatGeneratorCheckboxes = {
	[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]: false,
};

export const heatGeneratorsInitFormData: HeatGeneratorFormState = {
	data: initFormData,
	checkboxes: checkboxesInitData,
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
export const heatGeneratorsFormsInitialState: HeatGeneratorFormsState = {
	create: _.cloneDeep(heatGeneratorsInitFormData),
	update: _.cloneDeep(heatGeneratorsInitFormData),
};
