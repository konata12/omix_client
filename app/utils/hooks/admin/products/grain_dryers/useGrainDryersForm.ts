import { parseNumberInput } from "@/app/services/admin/forms.service";
import { Faq, FaqFormValuesEnumType } from "@/app/types/data/faq.type";
import { FormTypes } from "@/app/types/data/form.type";
import {
	GrainDryerCheckboxesType,
	GrainDryerImagesValuesType,
	GrainDryerImageValuesType,
	GrainDryerNotStepperValuesType,
	GrainDryerStepperValuesType,
	GrainDryerStringValuesEnumType,
	GrainDryerValuesEnumType,
} from "@/app/types/data/products/grain_dryers/grain_dryers.type";
import { formValidateErrorsData, useFormValidate } from "@/app/utils/hooks/common/form/useFormValidate";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import {
	handleCheckbox as handleCheckboxAction,
	pushImageArrayValues,
	deleteImageArrayValue,
	setInputErrorValue,
	setNotStepperValue,
	setStepperValue,
	setStringValue,
} from "@/app/utils/redux/products/grain_dryers/grainDryerFormsSlice";
import { setUpdateError } from "@/app/utils/redux/products/grain_dryers/grainDryersSlice";
import { RootState } from "@/app/utils/redux/store";
import { del, set, UseStore } from "idb-keyval";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback } from "react";
import { v4 as uuid } from "uuid";

export function useGrainDryersForm(form: FormTypes, store: UseStore) {
	const { grain_dryers } = useAppSelector((state: RootState) => state.grainDryer);
	const { error, ...data } = useAppSelector((state: RootState) => state.grainDryerForms[form]);

	const dispatch = useAppDispatch();
	const router = useRouter();
	const { id } = useParams<{ id: string }>();

	// INPUTS
	// string
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
	// numbers
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
	// media
	const handleImageInputChange = useCallback(
		async (e: ChangeEvent<HTMLInputElement>, field: GrainDryerImageValuesType) => {
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
				// todo fix scroll to image on error
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
		async (e: ChangeEvent<HTMLInputElement>, field: GrainDryerImagesValuesType) => {
			const values = Array.from(e.target.files || []);
			const imageNames: string[] = [];
			if (!values.length) return;

			await Promise.all(
				values.map(async (value) => {
					if (value.type !== "image/png") {
						dispatch(
							setInputErrorValue({
								form,
								field,
								message: "Зображення повинно бути в форматі PNG",
							}),
						);
						// todo fix scroll to image on error
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
			clearInputError(field);
		},
		[dispatch, form, data, store],
	);
	const handleImageCarouselDelete = useCallback(
		async (index: number, field: GrainDryerImagesValuesType) => {
			if (data[field][index]) {
				await del(data[field][index], store);
			}

			dispatch(deleteImageArrayValue({ index, form, field }));
		},
		[dispatch, form, data, store],
	);
	// checkboxes
	const handleCheckbox = useCallback(
		(field: GrainDryerCheckboxesType, value: boolean) => {
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

			// VALIDATE DATA
			// entries.forEach((entry) => {
			// 	// for strings
			// 	if (!entry[1].length) {
			// 		const field = entry[0] as FaqFormValuesEnumType;
			//
			// 		dispatch(
			// 			setInputErrorValue({
			// 				message: "Введіть значення",
			// 				form,
			// 				field,
			// 			}),
			// 		);
			// 		errorsData.push({ id: field });
			// 	}
			// });
			//
			// // VALIDATE CHANGE IN UPDATE
			// validateUpdateSameData(data, errorsData);
			//
			// // SCROLL TO ERROR INPUT AND FINISH EXECUTING
			// if (scrollToError()) return;
			//
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
		handleNumberInputChange,
		handleStepperChange,
		handleImageInputChange,
		handleImageCarouselInputChange,
		handleImageCarouselDelete,
		handleCheckbox,
	};
}
