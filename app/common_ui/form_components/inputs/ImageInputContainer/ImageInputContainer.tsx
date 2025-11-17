import { InputContainerStyles } from "@/app/common_ui/form_components/inputs/InputContainer/InputContainer";
import { InputContainerWithChangeEventProps } from "@/app/types/ui/form_components/inputContainers.type";
import React from "react";
import styles from "./ImageInputContainer.module.scss";

interface ImageInputContainer extends InputContainerWithChangeEventProps<HTMLInputElement> {
	label?: string;
	inputId: string;
	multiple?: boolean;
	children: React.ReactNode;
	className?: InputContainerStyles;
}

export function ImageInputContainer({
	label = "Завантажити нове фото",
	inputId,
	multiple,
	changeEvent,
	children,
	className,
}: ImageInputContainer) {
	return (
		<div className={`df fdc gap_24`}>
			<p className={`t4 bold`}>Завантажте фотографії у форматі .png (без фону)</p>
			<input
				className={className?.input || ""}
				id={inputId}
				type="file"
				hidden
				multiple={multiple}
				onChange={changeEvent}
			/>
			<label
				className={`btn blue t4 2 fc ${styles.label} ${className?.label || ""}`}
				htmlFor={inputId}
			>
				{label}
			</label>

			{children}
		</div>
	);
}
