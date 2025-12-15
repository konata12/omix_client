import { FormTypes } from "@/app/types/data/form.type";
import {
	RedactorDataEnum,
	RedactorDataEnumType,
	RedactorFormComponentsType,
	RedactorSlicesNamesType,
} from "@/app/types/data/redactor/redactor";
import { useRedactorSliceReducers } from "@/app/utils/hooks/admin/redactor/useRedactorSliceReducers";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { useCallback } from "react";
import { v4 as uuid } from "uuid";

export default function useRedactorControlInputs(
	sliceName: RedactorSlicesNamesType,
	allovedComponents: RedactorDataEnumType[],
	formType?: FormTypes,
) {
	const { addRedactorComponent, removeRedactorComponent } = useRedactorSliceReducers(
		sliceName,
		formType,
	);
	const dispatch = useAppDispatch();

	const createInput = useCallback(
		({
			componentType,
			numerable = false,
		}: {
			componentType: RedactorDataEnumType;
			numerable?: boolean;
		}) => {
			const orderId = uuid();
			let newComponent: RedactorFormComponentsType;

			// create input
			switch (componentType) {
				case RedactorDataEnum.TITLES:
					newComponent = {
						type: RedactorDataEnum.TITLES,
						data: {
							orderId,
							title: "",
						},
						error: {
							title: { message: "" },
						},
					};
					break;

				case RedactorDataEnum.PARAGRAPHS:
					newComponent = {
						type: RedactorDataEnum.PARAGRAPHS,
						data: {
							orderId,
							text: "",
						},
						error: {
							text: { message: "" },
						},
					};
					break;

				case RedactorDataEnum.LISTS:
					newComponent = {
						type: RedactorDataEnum.LISTS,
						data: {
							orderId,
							options: [""],
							numerable: numerable,
						},
						error: {
							options: [{ message: "" }],
						},
					};
					break;

				case RedactorDataEnum.IMAGES:
					newComponent = {
						type: RedactorDataEnum.IMAGES,
						data: {
							orderId,
							image: null,
							description: "",
						},
						error: {
							image: { message: "" },
							description: { message: "" },
						},
					};
					break;

				default:
					throw new Error(`Unknown element type: ${componentType}`);
			}

			// add input to redux state
			dispatch(addRedactorComponent(newComponent));
		},
		[],
	);

	const deleteInput = useCallback((element: RedactorFormComponentsType) => {
		// remove ordered component from redux
		dispatch(removeRedactorComponent(element.data.orderId));
	}, []);

	const redactorInputsToRender = [
		{
			label: "Заголовок",
			type: RedactorDataEnum.TITLES,
			createInputHandler: () => createInput({ componentType: RedactorDataEnum.TITLES }),
		},
		{
			label: "Абзац",
			type: RedactorDataEnum.PARAGRAPHS,
			createInputHandler: () => createInput({ componentType: RedactorDataEnum.PARAGRAPHS }),
		},
		{
			label: "Нумерований список",
			type: RedactorDataEnum.LISTS,
			createInputHandler: () =>
				createInput({
					componentType: RedactorDataEnum.LISTS,
					numerable: true,
				}),
		},
		{
			label: "Маркований список",
			type: RedactorDataEnum.LISTS,
			createInputHandler: () =>
				createInput({
					componentType: RedactorDataEnum.LISTS,
					numerable: false,
				}),
		},
		{
			label: "Фото",
			type: RedactorDataEnum.IMAGES,
			createInputHandler: () =>
				createInput({
					componentType: RedactorDataEnum.IMAGES,
				}),
		},
	].filter((input) => allovedComponents.includes(input.type));

	return {
		deleteInput,
		redactorInputsToRender,
	};
}
