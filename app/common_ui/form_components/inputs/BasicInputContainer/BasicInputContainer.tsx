import { FormInputError } from "@/app/types/data/form.type";
import { InputContainerBasicStyles } from "@/app/types/ui/form_components/inputContainers.type";
import { JSX } from "react";
import styles from "./BasicInputContainer.module.scss";

export interface BasicInputContainerProps {
	label: string;
	inputId: string;
	children: JSX.Element;
	error?: FormInputError;
	className?: InputContainerBasicStyles;
}

export default function BasicInputContainer({
	label,
	inputId,
	children,
	error,
	className,
}: BasicInputContainerProps) {
	return (
		<div className={`${styles.inputContainer} ${className?.inputContainer || ""}`}>
			<label className={`t4 bold ${className?.label || ""}`} htmlFor={inputId}>
				{label}
			</label>

			{children}

			{error && !!error.message.length && (
				<p className={`t5 error ${className?.error || ""}`}>{error.message as string}</p>
			)}
		</div>
	);
}
