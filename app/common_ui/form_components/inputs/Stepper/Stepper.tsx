import ArrowBtn from "@/app/common_ui/buttons/ArrowBtn/ArrowBtn";
import { InputContainerProps } from "@/app/common_ui/form_components/inputs/InputContainer/InputContainer";
import { InputContainerBasicStyles } from "@/app/types/ui/form_components/inputContainers.type";
import { ChangeEvent, useCallback } from "react";
import styles from "./Stepper.module.scss";

interface StepperStyles extends InputContainerBasicStyles {
	container?: string;
}

interface StepperProps<F extends string> extends Omit<InputContainerProps, "changeEvent"> {
	value: number;
	changeEvent: (value: number, field: F) => void;
	inputId: F;
	className?: StepperStyles;
}

export default function Stepper<F extends string>({
	label,
	inputId, // also is redux field
	error,
	changeEvent,
	value,
	className,
}: StepperProps<F>) {
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const value = Number(e.target.value);

			changeEvent(value, inputId);
		},
		[changeEvent, inputId],
	);
	const handleClick = (increment: boolean) => {
		increment ? value++ : value--;
		changeEvent(value, inputId);
	};

	return (
		<div className={`${styles.container} ${className?.container || ""}`}>
			<label className={`t1`} htmlFor={inputId}>
				{label}
			</label>

			<div className={styles.input_container}>
				<ArrowBtn directionLeft={true} handleFunc={() => handleClick(false)} />
				<input
					className={`input`}
					id={inputId}
					type={"number"}
					value={value}
					onChange={handleChange}
				/>
				<ArrowBtn handleFunc={() => handleClick(true)} />
			</div>

			{error && !!error.message.length && (
				<p className={`t5 error ${className?.error || ""}`}>{error.message as string}</p>
			)}
		</div>
	);
}
