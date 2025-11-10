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
import React, {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useState,
} from "react";

export function useGeneralInfoForm() {
	const [defaultValues, setDefaultValues] = useState<
		GeneralDataValues | undefined
	>(undefined);
	const { status, error, checkboxes, ...data } = useAppSelector(
		(state: RootState) => state.generalData,
	);
	const dispatch = useAppDispatch();

	const { youtube, facebook, instagram } = data;
	const {
		youtube: youtubeCheckbox,
		facebook: facebookCheckbox,
		instagram: instagramCheckbox,
	} = checkboxes;
	const newFormDataToCheck = {
		...data,
		youtube: youtubeCheckbox
			? data[GeneralDataOptionalValuesEnum.YOUTUBE]
			: undefined,
		facebook: facebookCheckbox
			? data[GeneralDataOptionalValuesEnum.FACEBOOK]
			: undefined,
		instagram: instagramCheckbox
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
					youtube:
						response.payload[GeneralDataOptionalValuesEnum.YOUTUBE] ||
						undefined,
					facebook:
						response.payload[GeneralDataOptionalValuesEnum.FACEBOOK] ||
						undefined,
					instagram:
						response.payload[GeneralDataOptionalValuesEnum.INSTAGRAM] ||
						undefined,
				});
		})();
	}, [dispatch, status.update]);
	useFormChangeCheck(defaultValues, newFormDataToCheck);

	// FORM
	const handleCheckbox = (
		field: GeneralDataOptionalValuesEnumType,
		value: boolean,
	) => {
		dispatch(
			handleCheckboxAction({
				value,
				field,
			}),
		);
	};
	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement>,
		field: GeneralDataValuesEnumType,
	) => {
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
					!youtubeCheckbox
				)
					return;
				if (
					entry[0] === GeneralDataOptionalValuesEnum.FACEBOOK &&
					!facebookCheckbox
				)
					return;
				if (
					entry[0] === GeneralDataOptionalValuesEnum.INSTAGRAM &&
					!instagramCheckbox
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
				youtube: youtubeCheckbox ? youtube : undefined,
				facebook: facebookCheckbox ? facebook : undefined,
				instagram: instagramCheckbox ? instagram : undefined,
			};

			const response = await dispatch(updateDataAction(requestData));
			const isFulfilled = fulfilled(response.meta.requestStatus);
			if (!isFulfilled) {
				(
					document.querySelector(`#submit_error`) as HTMLInputElement
				).scrollIntoView({
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
