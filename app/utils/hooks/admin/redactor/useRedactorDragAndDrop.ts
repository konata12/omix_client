import { FormTypes } from "@/app/types/data/form.type";
import { RedactorFormComponentsType, RedactorSlicesNamesType } from "@/app/types/data/redactor/redactor";
import { useRedactorSliceReducers } from "@/app/utils/hooks/admin/redactor/useRedactorSliceReducers";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useCallback } from "react";

export function useRedactorDragAndDrop(sliceName: RedactorSlicesNamesType, form?: FormTypes) {
	const { setRedactorStateOrder } = useRedactorSliceReducers(sliceName, form);

	const dispatch = useAppDispatch();

	const handleDragEnd = useCallback((event: DragEndEvent, order: RedactorFormComponentsType[]) => {
		const { active, over } = event;

		if (!over) return;
		if (active.id === over.id) return;

		// Find the actual items in the order array
		const activeItemIndex = order.findIndex((item) => item.data.orderId === active.id);
		const overItemIndex = order.findIndex((item) => item.data.orderId === over.id);

		if (activeItemIndex === -1 || overItemIndex === -1) return;

		// Create the new ordered array
		const newOrder = arrayMove(order, activeItemIndex, overItemIndex);

		// Dispatch the update
		dispatch(setRedactorStateOrder(newOrder));
	}, []);

	return {
		handleDragEnd,
	};
}
