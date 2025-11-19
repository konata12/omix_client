import BasicInputContainer, {
	BasicInputContainerProps,
} from "@/app/common_ui/form_components/BasicInputContainer/BasicInputContainer";
import SelectDropdown, {
	SelectDropdownProps,
} from "@/app/common_ui/form_components/selects/SelectContainer/SelectDropdown/SelectDropdown";
import {
	InputContainerBasicStyles,
	InputContainerWithChangeEventProps,
	InputOptionalProps,
} from "@/app/types/ui/form_components/inputContainers.type";
import React, { InputHTMLAttributes } from "react";
import styles from "./SelectContainer.module.scss";

export interface SelectContainerStyles extends InputContainerBasicStyles {
	input?: string;
}

export interface SelectContainerProps
	extends Omit<BasicInputContainerProps, "children" | "changeEvent">,
		InputOptionalProps,
		InputContainerWithChangeEventProps<HTMLInputElement>,
		Omit<SelectDropdownProps, "open"> {
	value: string;
	className?: SelectContainerStyles;
}

export default function SelectContainer({
	label,
	inputId,
	error,
	value,
	options,
	handleSelect,
	className,
}: SelectContainerProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<BasicInputContainer label={label} inputId={inputId} error={error} className={className}>
			<div>
				<div className={styles.selectValueContainer}>
					<button
						className={`input ${styles.input} ${error && !!error.message.length ? "err" : ""} ${className?.input || ""}`}
						type="button"
						id={inputId}
						value={value}
						onClick={() => setOpen(!open)}
					>
						{value}
					</button>
					<svg
						className={`${styles.arrow} ${open ? styles.active : ""}`}
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="7"
						viewBox="0 0 12 7"
						fill="none"
					>
						<path d="M0.000647641 1.38997L5.61068 7L11.2207 1.38997L9.83073 0L5.61068 4.22005L1.39062 0L0.000647641 1.38997Z" />
					</svg>
				</div>
				<SelectDropdown open={open} options={options} handleSelect={handleSelect} />
			</div>
		</BasicInputContainer>
	);
}
