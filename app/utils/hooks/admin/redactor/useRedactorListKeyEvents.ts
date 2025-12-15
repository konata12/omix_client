import { FormTypes } from "@/app/types/data/form.type";
import { RedactorListFormComponent, RedactorSlicesNamesType } from "@/app/types/data/redactor/redactor";
import { useRedactorSliceReducers } from "@/app/utils/hooks/admin/redactor/useRedactorSliceReducers";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import React, { useCallback } from "react";

interface useRedactorListKeyEventsProps {
	index: number;
	list: RedactorListFormComponent;

	// FOR HOOK
	sliceName: RedactorSlicesNamesType;
	form?: FormTypes;
}

export default function useRedactorListKeyEvents({
	index,
	list,
	sliceName,
	form,
}: useRedactorListKeyEventsProps) {
	const { updateRedactorComponent } = useRedactorSliceReducers(sliceName, form);
	const dispatch = useAppDispatch();

	const detailsComponent = structuredClone(list); // new list
	const listData = list.data;
	const listErrors = list.error;

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent, i: number) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();

				// HANDLE OPTIONS
				const newOptions = [...listData.options];
				// Insert empty string at the next position
				newOptions.splice(i + 1, 0, "");
				detailsComponent.data.options = newOptions;

				// HANDLE ERRORS
				const newErrors = [...listErrors.options];
				// Insert empty string at the next position
				newErrors.splice(i + 1, 0, { message: "" });
				detailsComponent.error.options = newErrors;

				// Properly typed setValue call
				dispatch(
					updateRedactorComponent({
						index,
						detailsComponent,
					}),
				);
			}

			if (e.key === "Backspace" && listData.options[i] === "" && i > 0) {
				e.preventDefault();

				// HANDLE OPTIONS
				const newOptions = [...listData.options];
				// Remove the current option
				newOptions.splice(i, 1);
				detailsComponent.data.options = newOptions;

				// HANDLE ERRORS
				const newErrors = [...listErrors.options];
				// Insert empty string at the next position
				newErrors.splice(i, 1);
				detailsComponent.error.options = newErrors;

				// Properly typed setValue call
				dispatch(
					updateRedactorComponent({
						index,
						detailsComponent,
					}),
				);
			}
		},
		[sliceName, form, listData],
	);

	return {
		handleKeyDown,
	};
}
