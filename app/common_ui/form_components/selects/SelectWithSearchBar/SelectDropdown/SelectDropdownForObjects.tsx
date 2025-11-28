import AnimatePresenceWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWithDynamicHeight/AnimatePresenceWithDynamicHeight";
import React from "react";
import styles from "@/app/common_ui/form_components/selects/SelectContainer/SelectDropdown/SelectDropdown.module.scss";

interface SelectDropdownForObjectsOption {
	id: string;
	title: string;
}

export interface SelectDropdownForObjectsProps {
	open: boolean;
	options: SelectDropdownForObjectsOption[];
	handleSelect: (value: string) => void;
}

export default function SelectDropdownForObjects({
	open,
	options,
	handleSelect,
}: SelectDropdownForObjectsProps) {
	const maxLines = 6;
	const border = 1;
	const padding = 16;
	const height = 24;
	const maxHeight = `${border * 2 + padding * maxLines + height}px`;
	const overflowY = options.length > maxLines ? "auto" : "hidden";

	return (
		<AnimatePresenceWithDynamicHeight childrenIsRendered={open}>
			{!!options.length && (
				<div className={styles.droplist} style={{ maxHeight, overflowY }}>
					{options.map((option, index) => (
						<p className={styles.option} key={index} onClick={() => handleSelect(option.id)}>
							<span>{option.title}</span>
						</p>
					))}
				</div>
			)}
		</AnimatePresenceWithDynamicHeight>
	);
}
