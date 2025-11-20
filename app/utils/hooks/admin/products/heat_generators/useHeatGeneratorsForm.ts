import { parseNumberInput } from "@/app/services/admin/forms.service";
import { FormTypes } from "@/app/types/data/form.type";
import {
	HeatGeneratorCheckboxesType,
	HeatGeneratorImagesValuesType,
	HeatGeneratorImageValuesType,
	HeatGeneratorNotStepperValuesType,
	HeatGeneratorStepperValuesType,
	HeatGeneratorStringValuesEnumType,
	HeatGeneratorsTypes,
	HeatGeneratorValuesEnumType,
} from "@/app/types/data/products/heat_generators/heat_generators.type";
import { useHeatGeneratorsFormReducers } from "@/app/utils/hooks/admin/products/heat_generators/useHeatGeneratorsFormReducers";
import { useFormValidate } from "@/app/utils/hooks/common/form/useFormValidate";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { setUpdateError } from "@/app/utils/redux/products/grain_dryers/grainDryersSlice";
import { FUEL_BURNING_TYPE_DEFAULT_VALUE } from "@/app/utils/redux/products/heat_generators/forms/heatGeneratorsFormsState";
import { RootState } from "@/app/utils/redux/store";
import { del, set, UseStore } from "idb-keyval";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback } from "react";
import { v4 as uuid } from "uuid";

export function useHeatGeneratorsForm(
	form: FormTypes,
	heat_generators_type: HeatGeneratorsTypes,
	store: UseStore,
) {
	const { heat_generators } = useAppSelector(
		(state: RootState) => state.heatGenerator[heat_generators_type],
	);
	const { error, checkboxes, ...data } = useAppSelector(
		(state: RootState) => state[`${heat_generators_type}HeatGeneratorForms`][form],
	);

	const {
		deleteImageArrayValue,
		handleCheckboxAction,
		pushImageArrayValues,
		setInputErrorValue,
		setNotStepperValue,
		setStepperValue,
		setStringValue,
	} = useHeatGeneratorsFormReducers(heat_generators_type);

	const dispatch = useAppDispatch();
	const router = useRouter();
	const { id } = useParams<{ id: string }>();

	// INPUTS
	// string
	const handleStringInputChange = useCallback(
		<T extends HTMLInputElement | HTMLTextAreaElement>(
			e: ChangeEvent<T>,
			field: HeatGeneratorStringValuesEnumType,
		) => {
			const value = e.target.value;
			dispatch(setStringValue({ value, form, field }));
			clearInputError(field);
		},
		[dispatch, form],
	);
	const handleSelectChange = useCallback(
		(value: string, field: HeatGeneratorStringValuesEnumType) => {
			dispatch(setStringValue({ value, form, field }));
			clearInputError(field);
		},
		[dispatch, form],
	);
	// numbers
	const handleNumberInputChange = useCallback(
		<T extends HTMLInputElement | HTMLTextAreaElement>(
			e: ChangeEvent<T>,
			field: HeatGeneratorNotStepperValuesType,
		) => {
			const targetValue = e.target.value;
			const value = parseNumberInput(targetValue);
			dispatch(setNotStepperValue({ value, form, field }));
			clearInputError(field);
		},
		[dispatch, form],
	);
	const handleStepperChange = useCallback(
		(value: number, field: HeatGeneratorStepperValuesType) => {
			if (value < 0) value = 0;
			dispatch(setStepperValue({ value, form, field }));
			clearInputError(field);
		},
		[dispatch, form],
	);
	// media
	const handleImageInputChange = useCallback(
		async (e: ChangeEvent<HTMLInputElement>, field: HeatGeneratorImageValuesType) => {
			const value = e.target.files;
			const oldValue = data[field];
			if (!value) return;

			const imageName = uuid();
			const image = value[0];

			// IF IMAGE IS NOT PNG SHOW ERROR
			if (value[0].type !== "image/png") {
				dispatch(
					setInputErrorValue({
						form,
						field,
						message: "Зображення повинно бути в форматі PNG",
					}),
				);
				(document.querySelector(`#${field}`) as HTMLInputElement).scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
				return;
			}

			// DELETE OLD IMAGE FROM INDEXEDDB
			if (oldValue) {
				await del(oldValue, store);
			}

			// SAVE NEW IMAGE TO INDEXEDDB
			await set(imageName, image, store);

			// SET NEW IMAGE NAME IN REDUX, IT WILL BE KEY TO FILE IN INDEXEDDB
			dispatch(
				setStringValue({
					value: imageName,
					form,
					field,
				}),
			);
			clearInputError(field);
		},
		[dispatch, form, data, store],
	);
	const handleImageCarouselInputChange = useCallback(
		async (e: ChangeEvent<HTMLInputElement>, field: HeatGeneratorImagesValuesType) => {
			const values = Array.from(e.target.files || []);
			const imageNames: string[] = [];
			const errors: string[] = []; // need this to check if to show error when uploaded many images
			if (!values.length) return;

			await Promise.all(
				values.map(async (value) => {
					if (value.type !== "image/png") {
						const message = "Зображення повинно бути в форматі PNG";
						dispatch(
							setInputErrorValue({
								form,
								field,
								message,
							}),
						);
						errors.push(message);
						(document.querySelector(`#${field}`) as HTMLInputElement).scrollIntoView({
							behavior: "smooth",
							block: "center",
						});
						return;
					}

					const imageName = uuid();
					await set(imageName, value, store);
					imageNames.push(imageName);
				}),
			);

			dispatch(pushImageArrayValues({ value: imageNames, form, field }));
			if (!errors.length) {
				clearInputError(field);
			}
		},
		[dispatch, form, data, store],
	);
	const handleImageCarouselDelete = useCallback(
		async (index: number, field: HeatGeneratorImagesValuesType) => {
			if (data[field][index]) {
				await del(data[field][index], store);
			}

			dispatch(deleteImageArrayValue({ index, form, field }));
		},
		[dispatch, form, data, store],
	);
	// checkboxes
	const handleCheckbox = useCallback(
		(field: HeatGeneratorCheckboxesType, value: boolean) => {
			dispatch(
				handleCheckboxAction({
					value,
					form,
					field,
				}),
			);
		},
		[dispatch, form],
	);

	// SUBMIT
	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const { errorsData, scrollToError } = useFormValidate();
			const entries = Object.entries(data);
			console.log(entries);

			// VALIDATE DATA
			entries.forEach((entry) => {
				const field = entry[0] as HeatGeneratorValuesEnumType;
				let message = "Введіть значення";
				let err = false;
				// for images
				if (entry[1] === null || (typeof entry[1] === "object" && !entry[1].length)) {
					err = true;
					message = "Оберіть зображення";
				}
				// for select
				else if (entry[1] === FUEL_BURNING_TYPE_DEFAULT_VALUE) {
					err = true;
					message = "Оберіть значення";
				}
				// for empty string and numbers inputs
				else if (entry[1] === "") {
					err = true;
				}
				// validate number inputs
				else if (!isNaN(+entry[1]) && +entry[1] < 0) {
					err = true;
					message = "Значення має бути більше нуля";
				}

				if (err) {
					dispatch(
						setInputErrorValue({
							message,
							form,
							field,
						}),
					);
					errorsData.push({ id: field });
				}
			});

			// // VALIDATE CHANGE IN UPDATE
			// validateUpdateSameData(data, errorsData);

			// // SCROLL TO ERROR INPUT AND FINISH EXECUTING
			if (scrollToError()) return;

			console.log(data);

			// switch (form) {
			// 	case "industrial":
			// 		await handleCreate(data);
			// 		break;
			//
			// 	case "update":
			// 		await handleUpdate(data);
			// 		break;
			// }
		},
		[dispatch, form, id, data],
	);

	// HELPER
	function clearInputError(field: HeatGeneratorValuesEnumType) {
		dispatch(
			setInputErrorValue({
				message: "",
				form,
				field,
			}),
		);
		dispatch(setUpdateError(null));
	}
	// const validateUpdateSameData = useCallback(
	// 	(data: Omit<Faq, "id">, errorsData: formValidateErrorsData) => {
	// 		if (form === "update") {
	// 			const index = faqs.findIndex((faq) => `${faq.id}` === id);
	// 			const { id: x, ...oldData } = faqs[index];
	//
	// 			if (_.isEqual(oldData, data)) {
	// 				dispatch(setUpdateError("Дані ті самі, спочатку змініть значення"));
	// 				errorsData.push({ id: "submit_error" });
	// 			}
	// 		}
	// 	},
	// 	[dispatch, form],
	// );

	return {
		// INPUTS
		handleStringInputChange,
		handleSelectChange,
		handleNumberInputChange,
		handleStepperChange,
		handleImageInputChange,
		handleImageCarouselInputChange,
		handleImageCarouselDelete,
		handleCheckbox,
		handleSubmit,
	};
}
