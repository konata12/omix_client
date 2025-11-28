import BasicInputContainer, {
	BasicInputContainerProps,
} from "@/app/common_ui/form_components/BasicInputContainer/BasicInputContainer";
import SelectDropdownForObjects, {
	SelectDropdownForObjectsProps,
} from "@/app/common_ui/form_components/selects/SelectWithSearchBar/SelectDropdown/SelectDropdownForObjects";
import {
	InputContainerBasicStyles,
	InputContainerWithChangeEventProps,
	InputOptionalProps,
} from "@/app/types/ui/form_components/inputContainers.type";
import glass from "@/public/svg/magnifying_glass.svg";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./SelectWithSearchBar.module.scss";

export interface SelectWithSearchBarStyles extends InputContainerBasicStyles {
	input?: string;
}

export interface SelectWithSearchBarProps
	extends Omit<BasicInputContainerProps, "children" | "changeEvent">,
		InputOptionalProps,
		InputContainerWithChangeEventProps<HTMLInputElement>,
		Omit<SelectDropdownForObjectsProps, "open"> {
	className?: SelectWithSearchBarStyles;
}

export default function SelectWithSearchBar({
	label,
	inputId,
	error,
	options,
	handleSelect,
	className,
}: SelectWithSearchBarProps) {
	const [query, setQuery] = useState("");
	const [open, setOpen] = React.useState(false);
	const filteredOptions = options.filter((option) => {
		return option.title.match(query);
	});

	const handleSelectAction = (value: string) => {
		handleSelect(value);
	};

	return (
		<BasicInputContainer label={label} inputId={inputId} error={error} className={className}>
			<div>
				<div className={styles.selectValueContainer} onClick={() => setOpen(!open)}>
					<input
						className={`input ${styles.input} ${error && !!error.message.length ? "err" : ""} ${className?.input || ""}`}
						id={inputId}
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
							setOpen(true);
						}}
					/>
					<Image src={glass} alt={"magnifying_glass"} className={styles.glass} />
				</div>
				<SelectDropdownForObjects
					open={open}
					options={filteredOptions}
					handleSelect={handleSelectAction}
				/>
			</div>
		</BasicInputContainer>
	);
}
