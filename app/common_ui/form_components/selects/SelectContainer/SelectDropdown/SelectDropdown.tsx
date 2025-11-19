import AnimatePresenceWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWithDynamicHeight/AnimatePresenceWithDynamicHeight";
import React from "react";
import styles from "./SelectDropdown.module.scss";

export interface SelectDropdownProps {
	open: boolean;
	options: string[];
	handleSelect: (value: string) => void;
}

export default function SelectDropdown({ open, options, handleSelect }: SelectDropdownProps) {
	return (
		<AnimatePresenceWithDynamicHeight childrenIsRendered={open}>
			<div className={styles.droplist}>
				{options.map((option, index) => (
					<p className={styles.option} key={index} onClick={() => handleSelect(option)}>
						<span>{option}</span>
					</p>
				))}
			</div>
		</AnimatePresenceWithDynamicHeight>
	);
}
