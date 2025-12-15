import { RedactorFormComponentsType } from "@/app/types/data/redactor/redactor";
import {
	DndContext,
	DragEndEvent,
	PointerSensor,
	useDroppable,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import React from "react";

interface DraggableAreaContainerForRedactorProps {
	handleDragEnd: (event: DragEndEvent, order: RedactorFormComponentsType[]) => void;
	dndContextId: string;
	components: RedactorFormComponentsType[];
	children: React.ReactNode;
	droppableAreaClassName?: string;
}

export function DraggableAreaContainerForRedactor({
	handleDragEnd,
	dndContextId,
	components,
	children,
	droppableAreaClassName,
}: DraggableAreaContainerForRedactorProps) {
	const { setNodeRef } = useDroppable({
		id: dndContextId,
	});
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8, // Require 8px movement to start dragging
			},
		}),
	);

	return (
		<DndContext
			sensors={sensors}
			onDragEnd={(e) => handleDragEnd(e, components)}
			modifiers={[restrictToVerticalAxis, restrictToParentElement]}
		>
			<SortableContext
				items={components.map((element) => element.data.orderId)}
				strategy={verticalListSortingStrategy}
			>
				{/* DROPPABLE AREA */}
				<div ref={setNodeRef} className={droppableAreaClassName || ""}>
					{children}
				</div>
			</SortableContext>
		</DndContext>
	);
}
