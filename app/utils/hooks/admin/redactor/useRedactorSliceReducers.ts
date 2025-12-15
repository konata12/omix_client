import { FormTypes } from "@/app/types/data/form.type";
import {
	RedactorFormComponentsType,
	RedactorFormDataErrorType,
	RedactorSlicesNamesType,
} from "@/app/types/data/redactor/redactor";
import {
	addRedactorComponent,
	removeRedactorComponent,
	setRedactorComponentError,
	setRedactorStateOrder as setNewsRedactorStateOrder,
	updateRedactorComponent,
} from "@/app/utils/redux/news/newsFormsSlice";
import { useMemo } from "react";

export function useRedactorSliceReducers(sliceName: RedactorSlicesNamesType, formType?: FormTypes) {
	const form = formType ? formType : "create"; // need this to not use 'form' value in other forms than news

	// SET STATE AND REDUCERS FOR EVERY REDACTOR
	return useMemo(() => {
		switch (sliceName) {
			// NEWS
			case "newsForms":
				return {
					addRedactorComponent: (data: RedactorFormComponentsType) =>
						addRedactorComponent({
							form,
							data,
						}),
					removeRedactorComponent: (orderId: string) =>
						removeRedactorComponent({
							form,
							orderId,
						}),
					updateRedactorComponent: ({
						detailsComponent,
						index,
					}: {
						detailsComponent: RedactorFormComponentsType;
						index: number;
					}) =>
						updateRedactorComponent({
							form,
							detailsComponent,
							index,
						}),
					setRedactorStateOrder: (data: RedactorFormComponentsType[]) =>
						setNewsRedactorStateOrder({
							form,
							data,
						}),
					setRedactorComponentError: ({
						error,
						index,
					}: {
						error: RedactorFormDataErrorType;
						index: number;
					}) =>
						setRedactorComponentError({
							form,
							error,
							index,
						}),
				};
		}
	}, [sliceName, form]);
}
