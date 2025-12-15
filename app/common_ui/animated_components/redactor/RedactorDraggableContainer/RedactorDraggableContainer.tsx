import { RedactorDataEnumType } from "@/app/types/data/redactor/redactor";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";

export interface DraggableComponent {
	orderId: string;
}

interface RedactorDraggableContainerProps {
	children: React.ReactNode;
	id: string;
	elementType: RedactorDataEnumType;
}

export default function RedactorDraggableContainer({
	id,
	children,
	elementType,
}: RedactorDraggableContainerProps) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id,
	});

	return (
		<div
			// className={`${styles.container} ${(componentIsTitleNotForstInOrder && styles.titleNotForstInOrder) || ""}`}
			ref={setNodeRef}
			// style={style}
			{...attributes}
			{...listeners}
		>
			{/*<CloseButton*/}
			{/*	handleClick={handleDelete}*/}
			{/*	hoverCrossColor="#FFF"*/}
			{/*	style={buttonPosition}*/}
			{/*	className={styles.deleteBtn}*/}
			{/*/>*/}
			{children}
		</div>
	);
}
