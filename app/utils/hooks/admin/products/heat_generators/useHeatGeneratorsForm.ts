import { giveFileUniqNameKeepExtension } from "@/app/services/admin/files.service";
import {
	checkCheckboxInputValuesToValidate,
	filterRequestDataByCheckboxes,
	parseNumberInput,
} from "@/app/services/admin/forms.service";
import { fulfilled } from "@/app/services/admin/response.service";
import { FormTypes } from "@/app/types/data/form.type";
import {
	HeatGenerator,
	HeatGeneratorCheckboxesType,
	HeatGeneratorCompareType,
	HeatGeneratorNotStepperValuesType,
	HeatGeneratorStepperValuesType,
	HeatGeneratorStringValuesEnum,
	HeatGeneratorStringValuesEnumType,
	HeatGeneratorsTypes,
	HeatGeneratorValuesEnumType,
} from "@/app/types/data/products/heat_generators/heat_generators.type";
import { ProductImagesValuesType, ProductImageValuesType } from "@/app/types/data/products/product.type";
import { useHeatGeneratorsFormReducers } from "@/app/utils/hooks/admin/products/heat_generators/useHeatGeneratorsFormReducers";
import { useFormChangeCheck } from "@/app/utils/hooks/common/form/useFormChangeCheck";
import { formValidateErrorsData, useFormValidate } from "@/app/utils/hooks/common/form/useFormValidate";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { FUEL_BURNING_TYPE_DEFAULT_VALUE } from "@/app/utils/redux/products/heat_generators/forms/heatGeneratorsFormsState";
import {
	createHeatGenerator,
	setUpdateError,
	updateHeatGenerator,
} from "@/app/utils/redux/products/heat_generators/heatGeneratorsSlice";
import { RootState } from "@/app/utils/redux/store";
import { del, set, UseStore } from "idb-keyval";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef } from "react";

const formValidationSkipValues = [HeatGeneratorStringValuesEnum.FAN_MODEL];

export function useHeatGeneratorsForm(
	form: FormTypes,
	heat_generator_type: HeatGeneratorsTypes,
	store: UseStore,
) {
	const { checkboxes, data } = useAppSelector(
		(state: RootState) => state[`${heat_generator_type}HeatGeneratorForms`][form],
	);
	const defaultValue = useRef<HeatGeneratorCompareType | undefined>(undefined);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { id } = useParams<{ id: string }>();
	const {
		deleteArrayValue,
		handleCheckboxAction,
		pushImageArrayValues,
		setInputErrorValue,
		setNotStepperValue,
		setStepperValue,
		setStringValue,
		clearForm,
		clearErrors,
		getHeatGenerator,
	} = useHeatGeneratorsFormReducers(heat_generator_type);

	const newFormDataToCheck: HeatGeneratorCompareType = {
		...data,
		[HeatGeneratorStringValuesEnum.FAN_MODEL]:
			data[HeatGeneratorStringValuesEnum.FAN_MODEL] !== ""
				? data[HeatGeneratorStringValuesEnum.FAN_MODEL]
				: undefined,
		[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]: checkboxes[
			HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW
		]
			? data[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]
			: undefined,
	};

	// SET UPDATE FORM DEFAULT VALUES
	useEffect(() => {
		dispatch(clearErrors(form));
	}, [dispatch]);
	useEffect(() => {
		if (form === "update" && id) {
			(async () => {
				const response = dispatch(getHeatGenerator(id));
				const data = await response.unwrap();
				const status = (await response).meta.requestStatus;
				const isFulfilled = fulfilled(status);

				if (isFulfilled) {
					defaultValue.current = {
						...data,
						[HeatGeneratorStringValuesEnum.FAN_MODEL]:
							data[HeatGeneratorStringValuesEnum.FAN_MODEL] || undefined,
						[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]:
							data[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW] || undefined,
					};
				}
			})();
		}
	}, [dispatch, heat_generator_type, id]);
	if (form === "update") {
		useFormChangeCheck(defaultValue.current, newFormDataToCheck);
	}

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
		async (e: ChangeEvent<HTMLInputElement>, field: ProductImageValuesType) => {
			const value = e.target.files;
			const oldValue = data[field];
			if (!value) return;

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

			const image = giveFileUniqNameKeepExtension(value[0]);

			// DELETE OLD IMAGE FROM INDEXEDDB
			if (oldValue) {
				await del(oldValue, store);
			}

			// SAVE NEW IMAGE TO INDEXEDDB
			await set(image.name, image, store);

			// SET NEW IMAGE NAME IN REDUX, IT WILL BE KEY TO FILE IN INDEXEDDB
			dispatch(
				setStringValue({
					value: image.name,
					form,
					field,
				}),
			);
			clearInputError(field);
		},
		[dispatch, form, data, store],
	);
	const handleImageCarouselInputChange = useCallback(
		async (e: ChangeEvent<HTMLInputElement>, field: ProductImagesValuesType) => {
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

					const image = giveFileUniqNameKeepExtension(value);
					await set(image.name, image, store);
					imageNames.push(image.name);
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
		async (index: number, field: ProductImagesValuesType) => {
			if (data[field][index]) {
				await del(data[field][index], store);
			}

			dispatch(deleteArrayValue({ index, form, field }));
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
	const handleCreate = useCallback(
		async (data: Partial<Omit<HeatGenerator, "id">>) => {
			const response = await dispatch(createHeatGenerator({ ...data, type: heat_generator_type }));
			const isFulfilled = fulfilled(response.meta.requestStatus);
			if (isFulfilled) {
				dispatch(clearForm(form));
				router.push(`/admin/products/heat_generators/${heat_generator_type}`);
			} else {
				(document.querySelector(`#submit_error`) as HTMLInputElement).scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
		},
		[dispatch, form],
	);
	const handleUpdate = useCallback(
		async (data: Partial<Omit<HeatGenerator, "id">>) => {
			const response = await dispatch(
				updateHeatGenerator({ ...data, id, type: heat_generator_type }),
			);
			const isFulfilled = fulfilled(response.meta.requestStatus);
			if (isFulfilled) {
				dispatch(clearForm(form));
				router.push(`/admin/products/heat_generators/${heat_generator_type}`);
			} else {
				(document.querySelector(`#submit_error`) as HTMLInputElement).scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
		},
		[dispatch, form, id],
	);
	const validateUpdateSameData = useCallback(
		(errorsData: formValidateErrorsData) => {
			if (form === "update") {
				if (_.isEqual(defaultValue.current, newFormDataToCheck)) {
					dispatch(
						setUpdateError({
							message: "Дані ті самі, спочатку змініть значення",
							type: heat_generator_type,
						}),
					);
					errorsData.push({ id: "submit_error" });
				}
			}
		},
		[dispatch, defaultValue, newFormDataToCheck, checkboxes],
	);
	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const { errorsData, scrollToError } = useFormValidate();
			const entries = Object.entries(data);

			// VALIDATE DATA
			entries.forEach((entry) => {
				const field = entry[0] as HeatGeneratorValuesEnumType;
				let message = "Введіть значення";
				let err = false;

				// check checkboxes
				if (checkCheckboxInputValuesToValidate(checkboxes, field)) return;

				// SKIP VALIDATION FOR SET VALUES
				if (formValidationSkipValues.some((value) => value === entry[0])) return;

				// for images
				if (entry[1] === null || (Array.isArray(entry[1]) && !entry[1].length)) {
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

			// VALIDATE CHANGE IN UPDATE
			validateUpdateSameData(errorsData);

			// SCROLL TO ERROR INPUT AND FINISH EXECUTING
			if (scrollToError()) return;

			const requestData: Partial<Omit<HeatGenerator, "id">> = filterRequestDataByCheckboxes(
				checkboxes,
				data,
			);

			switch (form) {
				case "create":
					await handleCreate(requestData);
					break;

				case "update":
					await handleUpdate(requestData);
					break;
			}
		},
		[dispatch, form, id, data, checkboxes],
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
		dispatch(
			setUpdateError({
				message: null,
				type: heat_generator_type,
			}),
		);
	}

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
