import AnimatePresenceWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWithDynamicHeight/AnimatePresenceWithDynamicHeight";
import React from "react";
import styles from "./SelectDropdown.module.scss";

export interface SelectDropdownProps {
	open: boolean;
	options: string[];
	handleSelect: (value: string) => void;
}

export default function SelectDropdown({ open, options, handleSelect }: SelectDropdownProps) {
	const maxLines = 6;
	const border = 1;
	const padding = 16;
	const height = 24;
	const maxHeight = `${border * 2 + (padding * 2 + height) * maxLines}px`;
	const overflowY = options.length > maxLines ? "auto" : "hidden";

	return (
		<AnimatePresenceWithDynamicHeight childrenIsRendered={open}>
			<div className={styles.droplist} style={{ maxHeight, overflowY }}>
				{options.map((option, index) => (
					<p className={styles.option} key={index} onClick={() => handleSelect(option)}>
						<span>{option}</span>
					</p>
				))}
			</div>
		</AnimatePresenceWithDynamicHeight>
	);
}
