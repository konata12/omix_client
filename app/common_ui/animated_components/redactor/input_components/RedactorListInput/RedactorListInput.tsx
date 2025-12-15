import styles from "@/app/common_ui/animated_components/redactor/input_components/redactor_text_inputs_styles.module.scss";
import AutoResizingTextarea from "@/app/common_ui/form_components/textareas/AutoResizingTextarea/AutoResizingTextarea";
import ErrorWrapper from "@/app/common_ui/wrappers/ErrorWrapper/ErrorWrapper";
import { FormTypes } from "@/app/types/data/form.type";
import {
	RedactorListDataEnum,
	RedactorListFormComponent,
	RedactorSlicesNamesType,
} from "@/app/types/data/redactor/redactor";
import { useRedactorFormComponents } from "@/app/utils/hooks/admin/redactor/useRedactorFormComponents";
import useRedactorListKeyEvents from "@/app/utils/hooks/admin/redactor/useRedactorListKeyEvents";
import React from "react";

interface RedactorTitleInputProps {
	index: number;
	data: RedactorListFormComponent;

	// FOR HOOK
	sliceName: RedactorSlicesNamesType;
	form?: FormTypes;
}

export default function RedactorListInput({ index, data, sliceName, form }: RedactorTitleInputProps) {
	const { handleList } = useRedactorFormComponents(sliceName, form);
	const { handleKeyDown } = useRedactorListKeyEvents({ index, list: data, sliceName, form });

	const options = data.data[RedactorListDataEnum.OPTIONS];
	const errors = data.error[RedactorListDataEnum.OPTIONS];

	return (
		<div className={styles.list}>
			{options.map((option, i) => (
				<ErrorWrapper key={i} error={errors[i].message}>
					<div className={styles.option}>
						{data.data[RedactorListDataEnum.NUMERABLE] ? (
							<span>{i + 1 + "."}</span>
						) : (
							<span className={styles.not_numbered}>■</span>
						)}

						<AutoResizingTextarea
							className={`${styles.input} ${styles.text}`}
							placeholder={"Заповніть пункт"}
							value={option}
							onChange={(e) => {
								handleList({ e, index, oldData: data, optionIndex: i });
							}}
							onKeyDown={(e: React.KeyboardEvent) => {
								handleKeyDown(e, i);
							}}
						/>
					</div>
				</ErrorWrapper>
			))}
		</div>
	);
}
