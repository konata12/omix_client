import { HeatGeneratorsTypes } from "@/app/types/data/products/heat_generators/heat_generators.type";
import {
	clearForm as clearFormStringValueHousehold,
	deleteImageArrayValue as deleteImageArrayValueHousehold,
	getHeatGenerator as getHeatGeneratorHousehold,
	handleCheckbox as handleCheckboxActionHousehold,
	pushImageArrayValues as pushImageArrayValuesHousehold,
	setInputErrorValue as setInputErrorValueHousehold,
	setNotStepperValue as setNotStepperValueHousehold,
	setStepperValue as setStepperValueHousehold,
	setStringValue as setStringValueHousehold,
} from "@/app/utils/redux/products/heat_generators/forms/householdHeatGeneratorFormsSlice";
import {
	clearForm as clearFormStringValueIndustrial,
	deleteImageArrayValue as deleteImageArrayValueIndustrial,
	getHeatGenerator as getHeatGeneratorIndustrial,
	handleCheckbox as handleCheckboxActionIndustrial,
	pushImageArrayValues as pushImageArrayValuesIndustrial,
	setInputErrorValue as setInputErrorValueIndustrial,
	setNotStepperValue as setNotStepperValueIndustrial,
	setStepperValue as setStepperValueIndustrial,
	setStringValue as setStringValueIndustrial,
} from "@/app/utils/redux/products/heat_generators/forms/industrialHeatGeneratorFormsSlice";

export function useHeatGeneratorsFormReducers(heat_generators_type: HeatGeneratorsTypes) {
	switch (heat_generators_type) {
		case "household":
			return {
				deleteImageArrayValue: deleteImageArrayValueHousehold,
				handleCheckboxAction: handleCheckboxActionHousehold,
				pushImageArrayValues: pushImageArrayValuesHousehold,
				setInputErrorValue: setInputErrorValueHousehold,
				setNotStepperValue: setNotStepperValueHousehold,
				setStepperValue: setStepperValueHousehold,
				setStringValue: setStringValueHousehold,
				clearForm: clearFormStringValueHousehold,
				getHeatGenerator: getHeatGeneratorHousehold,
			};

		case "industrial":
			return {
				deleteImageArrayValue: deleteImageArrayValueIndustrial,
				handleCheckboxAction: handleCheckboxActionIndustrial,
				pushImageArrayValues: pushImageArrayValuesIndustrial,
				setInputErrorValue: setInputErrorValueIndustrial,
				setNotStepperValue: setNotStepperValueIndustrial,
				setStepperValue: setStepperValueIndustrial,
				setStringValue: setStringValueIndustrial,
				clearForm: clearFormStringValueIndustrial,
				getHeatGenerator: getHeatGeneratorIndustrial,
			};
	}
}
