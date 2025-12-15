import { FormTypes } from "@/app/types/data/form.type";
import {
	RedactorFormComponentsType,
	RedactorListDataEnum,
	RedactorListFormComponent,
	RedactorParagraphDataEnum,
	RedactorParagraphFormComponent,
	RedactorSlicesNamesType,
	RedactorTitleDataEnum,
	RedactorTitleFormComponent,
} from "@/app/types/data/redactor/redactor";
import { useRedactorSliceReducers } from "@/app/utils/hooks/admin/redactor/useRedactorSliceReducers";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import React, { useCallback } from "react";

interface BasicRedactorInputProps<
	T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
	N extends RedactorFormComponentsType,
> {
	e: React.ChangeEvent<T>;
	oldData: N;
	index: number;
}

interface RedactorListProps
	extends BasicRedactorInputProps<HTMLTextAreaElement, RedactorListFormComponent> {
	optionIndex: number;
}

export function useRedactorFormComponents(sliceName: RedactorSlicesNamesType, form?: FormTypes) {
	const { updateRedactorComponent } = useRedactorSliceReducers(sliceName, form);
	const dispatch = useAppDispatch();

	const handleTitle = useCallback(
		({
			e,
			oldData,
			index,
		}: BasicRedactorInputProps<HTMLTextAreaElement, RedactorTitleFormComponent>) => {
			const value = e.target.value;
			const detailsComponent = structuredClone(oldData);

			// CLEAR ERROR ON INPUT
			if (value.length) {
				detailsComponent.error[RedactorTitleDataEnum.TITLE].message = "";
			}

			detailsComponent.data[RedactorTitleDataEnum.TITLE] = value;
			dispatch(updateRedactorComponent({ detailsComponent, index }));
		},
		[sliceName, form],
	);

	const handleParagraph = useCallback(
		({
			e,
			oldData,
			index,
		}: BasicRedactorInputProps<HTMLTextAreaElement, RedactorParagraphFormComponent>) => {
			const value = e.target.value;
			const detailsComponent = structuredClone(oldData);

			// CLEAR ERROR ON INPUT
			if (value.length) {
				detailsComponent.error[RedactorParagraphDataEnum.TEXT].message = "";
			}

			detailsComponent.data[RedactorParagraphDataEnum.TEXT] = value;
			dispatch(updateRedactorComponent({ detailsComponent, index }));
		},
		[sliceName, form],
	);

	const handleList = useCallback(
		({ e, oldData, index, optionIndex }: RedactorListProps) => {
			const value = e.target.value;
			const detailsComponent = structuredClone(oldData);

			// CLEAR ERROR ON INPUT
			if (value.length) {
				detailsComponent.error[RedactorListDataEnum.OPTIONS][optionIndex].message = "";
			}

			detailsComponent.data[RedactorListDataEnum.OPTIONS][optionIndex] = value;
			dispatch(updateRedactorComponent({ detailsComponent, index }));
		},
		[sliceName, form],
	);

	return {
		handleTitle,
		handleParagraph,
		handleList,
	};
}
