import { fulfilled } from "@/app/services/admin/response.service";
import {
	GeneralDataOptionalValuesEnum,
	GeneralDataOptionalValuesEnumType,
	GeneralDataRequestValues,
	GeneralDataValues,
	GeneralDataValuesEnumType,
} from "@/app/types/data/general_data.type";
import { useFormChangeCheck } from "@/app/utils/hooks/common/form/useFormChangeCheck";
import { useFormValidate } from "@/app/utils/hooks/common/form/useFormValidate";
import {
	getGeneral,
	handleCheckbox as handleCheckboxAction,
	setInputErrorValue,
	setStringValue,
	updateGeneral as updateDataAction,
	updateStatus,
} from "@/app/utils/redux/general_data/generalSlice";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";

export function useGeneralInfoForm() {
	const [defaultValues, setDefaultValues] = useState<GeneralDataValues | undefined>(undefined);
	const { status, error, checkboxes, ...data } = useAppSelector(
		(state: RootState) => state.generalData,
	);
	const dispatch = useAppDispatch();

	const newFormDataToCheck = {
		...data,
		[GeneralDataOptionalValuesEnum.YOUTUBE]: checkboxes[GeneralDataOptionalValuesEnum.YOUTUBE]
			? data[GeneralDataOptionalValuesEnum.YOUTUBE]
			: undefined,
		[GeneralDataOptionalValuesEnum.FACEBOOK]: checkboxes[GeneralDataOptionalValuesEnum.FACEBOOK]
			? data[GeneralDataOptionalValuesEnum.FACEBOOK]
			: undefined,
		[GeneralDataOptionalValuesEnum.INSTAGRAM]: checkboxes[GeneralDataOptionalValuesEnum.INSTAGRAM]
			? data[GeneralDataOptionalValuesEnum.INSTAGRAM]
			: undefined,
	};

	// LOAD NEW DATA
	useEffect(() => {
		(async () => {
			const response = await dispatch(getGeneral());
			const isFulfilled = fulfilled(response.meta.requestStatus);

			if (isFulfilled)
				setDefaultValues({
					...response.payload,
					[GeneralDataOptionalValuesEnum.YOUTUBE]:
						response.payload[GeneralDataOptionalValuesEnum.YOUTUBE] || undefined,
					[GeneralDataOptionalValuesEnum.FACEBOOK]:
						response.payload[GeneralDataOptionalValuesEnum.FACEBOOK] || undefined,
					[GeneralDataOptionalValuesEnum.INSTAGRAM]:
						response.payload[GeneralDataOptionalValuesEnum.INSTAGRAM] || undefined,
				});
		})();
	}, [dispatch, status.update]);
	useFormChangeCheck(defaultValues, newFormDataToCheck);

	// FORM
	const handleCheckbox = (field: GeneralDataOptionalValuesEnumType, value: boolean) => {
		dispatch(
			handleCheckboxAction({
				value,
				field,
			}),
		);
	};
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: GeneralDataValuesEnumType) => {
		dispatch(
			setStringValue({
				value: e.target.value,
				field,
			}),
		);
		// disable input error
		dispatch(
			setInputErrorValue({
				message: "",
				field,
			}),
		);
	};
	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const { errorsData, scrollToError } = useFormValidate();
			const entries = Object.entries(data);

			// VALIDATE DATA
			entries.forEach((entry) => {
				// check checkboxes
				if (
					entry[0] === GeneralDataOptionalValuesEnum.YOUTUBE &&
					!checkboxes[GeneralDataOptionalValuesEnum.YOUTUBE]
				)
					return;
				if (
					entry[0] === GeneralDataOptionalValuesEnum.FACEBOOK &&
					!checkboxes[GeneralDataOptionalValuesEnum.FACEBOOK]
				)
					return;
				if (
					entry[0] === GeneralDataOptionalValuesEnum.INSTAGRAM &&
					!checkboxes[GeneralDataOptionalValuesEnum.INSTAGRAM]
				)
					return;

				// for strings
				if (!entry[1].length) {
					const field = entry[0] as GeneralDataValuesEnumType;

					dispatch(
						setInputErrorValue({
							message: "Введіть значення",
							field,
						}),
					);
					errorsData.push({ id: field });
				}
			});

			// SCROLL TO ERROR INPUT AND FINISH EXECUTING
			if (scrollToError()) return;

			const requestData: GeneralDataRequestValues = {
				...data,
				youtube: checkboxes[GeneralDataOptionalValuesEnum.YOUTUBE]
					? data[GeneralDataOptionalValuesEnum.YOUTUBE]
					: undefined,
				facebook: checkboxes[GeneralDataOptionalValuesEnum.FACEBOOK]
					? data[GeneralDataOptionalValuesEnum.FACEBOOK]
					: undefined,
				instagram: checkboxes[GeneralDataOptionalValuesEnum.INSTAGRAM]
					? data[GeneralDataOptionalValuesEnum.INSTAGRAM]
					: undefined,
			};

			const response = await dispatch(updateDataAction(requestData));
			const isFulfilled = fulfilled(response.meta.requestStatus);
			if (!isFulfilled) {
				(document.querySelector(`#submit_error`) as HTMLInputElement).scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
		},
		[data, dispatch, setInputErrorValue],
	);
	// MODAL
	const modalCloseHandler = () => {
		dispatch(
			updateStatus({
				status: null,
				field: "update",
			}),
		);
	};

	return { handleCheckbox, handleInputChange, handleSubmit, modalCloseHandler };
}
