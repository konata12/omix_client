import React, { ChangeEvent } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxStyles {
	label?: string;
	input?: string;
	span?: string;
	i?: string;
}

export interface CheckboxProps {
	handleFunction: (e: ChangeEvent<HTMLInputElement>) => void;
	isChecked: boolean;
	elemId?: string;
	className?: CheckboxStyles;
	[key: string]: any;
}

export default function Checkbox({
	handleFunction,
	isChecked,
	elemId,
	className,
	...props
}: CheckboxProps) {
	return (
		<label className={`${styles.checkbox} ${className?.label || ""}`}>
			<input
				className={className?.input || ""}
				checked={isChecked}
				onChange={handleFunction}
				type="checkbox"
				id={elemId}
				{...props}
			/>
			<span className={className?.span || ""}>
				<span className={`t6 semibold ${className?.i || ""}`}>
					В{isChecked ? "" : "и"}кл
				</span>
			</span>
		</label>
	);
}
