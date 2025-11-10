import { InputContainerProps } from "@/app/common_ui/form_components/inputs/InputContainer/InputContainer";
import AnimatePresenceWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWithDynamicHeight/AnimatePresenceWithDynamicHeight";
import Checkbox from "@/app/common_ui/animated_components/Checkbox/Checkbox";
import styles from "./InputContainerWithCheckbox.module.scss";

export interface InputContainerWithCheckbox extends InputContainerProps {
	handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isChecked: boolean;
}

export default function InputContainerWithCheckbox({
	isChecked,
	label,
	inputId,
	error,
	handleCheckbox,
	changeEvent,
	value = "",
	type = "text",
	required,
	placeholder,
	className,
}: InputContainerWithCheckbox) {
	return (
		<div
			className={`${styles.inputContainer} ${className?.inputContainer || ""}`}
		>
			<Checkbox handleFunction={handleCheckbox} isChecked={isChecked} />

			<label
				className={`t4 bold ${className?.inputLabel || ""}`}
				htmlFor={inputId}
			>
				{label}
			</label>

			<AnimatePresenceWithDynamicHeight childrenIsRendered={isChecked}>
				<input
					className={`input ${error && !!error.message.length ? "err" : ""} ${className?.input || ""}`}
					id={inputId}
					type={type}
					onChange={changeEvent}
					value={value}
					placeholder={placeholder}
					required={required}
				/>

				{error && !!error.message.length && (
					<p className={`t5 error ${className?.error || ""}`}>
						{error.message as string}
					</p>
				)}
			</AnimatePresenceWithDynamicHeight>
		</div>
	);
}
