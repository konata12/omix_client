import AutoResizingTextarea from "@/app/common_ui/form_components/inputs/AutoResizingTextarea/AutoResizingTextarea";
import BasicInputContainer, {
	BasicInputContainerProps,
} from "@/app/common_ui/form_components/inputs/BasicInputContainer/BasicInputContainer";
import { InputContainerStyles } from "@/app/common_ui/form_components/inputs/InputContainer/InputContainer";
import {
	InputContainerWithChangeEventProps,
	InputOptionalProps,
} from "@/app/types/ui/form_components/inputContainers.type";

export interface TextareaContainerProps
	extends Omit<BasicInputContainerProps, "children">,
		InputOptionalProps,
		InputContainerWithChangeEventProps<HTMLTextAreaElement> {
	value: string;
	className?: InputContainerStyles;
}

export default function TextareaContainer({
	label,
	inputId,
	error,
	changeEvent,
	value = "",
	placeholder,
	className,
}: TextareaContainerProps) {
	return (
		<BasicInputContainer
			label={label}
			inputId={inputId}
			error={error}
			className={className}
		>
			<AutoResizingTextarea
				className={`input ${error && !!error.message.length ? "err" : ""} ${className?.input || ""}`}
				id={inputId}
				onChange={changeEvent}
				value={value}
				placeholder={placeholder}
				minRows={4}
			/>
		</BasicInputContainer>
	);
}
