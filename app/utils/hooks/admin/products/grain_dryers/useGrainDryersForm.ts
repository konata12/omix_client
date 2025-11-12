import { FormTypes } from "@/app/types/data/form.type";
import {
	GrainDryerNotStepperValuesType,
	GrainDryerStepperValuesType,
	GrainDryerStringValuesEnumType,
	GrainDryerValuesEnumType,
} from "@/app/types/data/products/grain_dryers/grain_dryers.type";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import {
	setInputErrorValue,
	setNotStepperValue,
	setStepperValue,
	setStringValue,
} from "@/app/utils/redux/products/grain_dryers/grainDryerFormsSlice";
import { setUpdateError } from "@/app/utils/redux/products/grain_dryers/grainDryersSlice";
import { RootState } from "@/app/utils/redux/store";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useCallback } from "react";

export function useGrainDryersForm(form: FormTypes) {
	const { grain_dryers } = useAppSelector((state: RootState) => state.grainDryer);
	const { error, ...data } = useAppSelector(
		(state: RootState) => state.grainDryerForms[form],
	);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { id } = useParams<{ id: string }>();

	// INPUTS
	const handleStringInputChange = useCallback(
		<T extends HTMLInputElement | HTMLTextAreaElement>(
			e: ChangeEvent<T>,
			field: GrainDryerStringValuesEnumType,
		) => {
			const value = e.target.value;
			dispatch(setStringValue({ value, form, field }));
			clearInputError(field);
		},
		[dispatch, form],
	);

	const handleNumberInputChange = useCallback(
		<T extends HTMLInputElement | HTMLTextAreaElement>(
			e: ChangeEvent<T>,
			field: GrainDryerNotStepperValuesType,
		) => {
			const targetValue = e.target.value;
			const value = parseNumberInput(targetValue);
			dispatch(setNotStepperValue({ value, form, field }));
			clearInputError(field);
		},
		[dispatch, form],
	);

	const handleStepperChange = useCallback(
		(value: number, field: GrainDryerStepperValuesType) => {
			if (value < 0) value = 0;
			dispatch(setStepperValue({ value, form, field }));
			clearInputError(field);
		},
		[dispatch, form],
	);

	// HELPER
	function clearInputError(field: GrainDryerValuesEnumType) {
		dispatch(
			setInputErrorValue({
				message: "",
				form,
				field,
			}),
		);
		dispatch(setUpdateError(null));
	}
	function parseNumberInput(value: string) {
		if (value === "") return value;
		return Number(value);
	}

	return {
		handleStringInputChange,
		handleNumberInputChange,
		handleStepperChange,
	};
}
