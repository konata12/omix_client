import BasicInputContainer, {
	BasicInputContainerProps,
} from "@/app/common_ui/form_components/BasicInputContainer/BasicInputContainer";
import { InputContainerStyles } from "@/app/common_ui/form_components/inputs/InputContainer/InputContainer";
import AutoResizingTextarea from "@/app/common_ui/form_components/textareas/AutoResizingTextarea/AutoResizingTextarea";
import {
	InputContainerWithChangeEventProps,
	InputOptionalProps,
} from "@/app/types/ui/form_components/inputContainers.type";

export interface TextareaContainerProps
	extends Omit<BasicInputContainerProps, "children">,
		InputOptionalProps,
		InputContainerWithChangeEventProps<HTMLTextAreaElement> {
	value: string;
	minRows?: number;
	className?: InputContainerStyles;
}

export default function TextareaContainer({
	label,
	inputId,
	error,
	changeEvent,
	value = "",
	minRows = 1,
	placeholder,
	className,
}: TextareaContainerProps) {
	return (
		<BasicInputContainer label={label} inputId={inputId} error={error} className={className}>
			<AutoResizingTextarea
				className={`input ${error && !!error.message.length ? "err" : ""} ${className?.input || ""}`}
				id={inputId}
				onChange={changeEvent}
				value={value}
				placeholder={placeholder}
				minRows={minRows}
			/>
		</BasicInputContainer>
	);
}
