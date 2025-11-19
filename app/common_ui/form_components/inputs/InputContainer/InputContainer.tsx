import BasicInputContainer, {
	BasicInputContainerProps,
} from "@/app/common_ui/form_components/BasicInputContainer/BasicInputContainer";
import {
	InputContainerBasicStyles,
	InputContainerWithChangeEventProps,
	InputOptionalProps,
} from "@/app/types/ui/form_components/inputContainers.type";
import React, { InputHTMLAttributes } from "react";

export interface InputContainerStyles extends InputContainerBasicStyles {
	input?: string;
}

export interface InputContainerProps
	extends Omit<BasicInputContainerProps, "children">,
		InputOptionalProps,
		InputContainerWithChangeEventProps<HTMLInputElement> {
	value: InputHTMLAttributes<HTMLInputElement>["value"];
	type?: React.HTMLInputTypeAttribute;
	className?: InputContainerStyles;
}

export default function InputContainer({
	label,
	inputId,
	error,
	changeEvent,
	value = "",
	type = "text",
	required,
	placeholder,
	className,
}: InputContainerProps) {
	return (
		<BasicInputContainer label={label} inputId={inputId} error={error} className={className}>
			<input
				className={`input ${error && !!error.message.length ? "err" : ""} ${className?.input || ""}`}
				id={inputId}
				type={type}
				onChange={changeEvent}
				value={value}
				placeholder={placeholder}
				required={required}
			/>
		</BasicInputContainer>
	);
}
