import styles from "@/app/common_ui/animated_components/redactor/input_components/redactor_text_inputs_styles.module.scss";
import AutoResizingTextarea from "@/app/common_ui/form_components/textareas/AutoResizingTextarea/AutoResizingTextarea";
import ErrorWrapper from "@/app/common_ui/wrappers/ErrorWrapper/ErrorWrapper";
import { FormTypes } from "@/app/types/data/form.type";
import {
	RedactorImageDataEnum,
	RedactorImageFormComponent,
	RedactorSlicesNamesType,
} from "@/app/types/data/redactor/redactor";
import { useRedactorFormComponents } from "@/app/utils/hooks/admin/redactor/useRedactorFormComponents";
import { UseStore } from "idb-keyval";
import React from "react";

interface RedactorImageInputProps {
	index: number;
	data: RedactorImageFormComponent;
	store: UseStore;

	// FOR HOOK
	sliceName: RedactorSlicesNamesType;
	form?: FormTypes;
}

export default function RedactorImageInput({
	index,
	data,
	store,
	sliceName,
	form,
}: RedactorImageInputProps) {
	const { handleImage } = useRedactorFormComponents(sliceName, form);

	const image = data.data[RedactorImageDataEnum.IMAGE];
	const description = data.data[RedactorImageDataEnum.DESCRIPTION];
	const imageError = data.error[RedactorImageDataEnum.IMAGE].message;
	const descriptionError = data.error[RedactorImageDataEnum.DESCRIPTION].message;

	return (
		<div>
			<ErrorWrapper error={imageError}>
				<input
					className={styles.input_image}
					type="file"
					onChange={(e) => {
						handleImage({
							e,
							oldData: data,
							index,
							key: RedactorImageDataEnum.IMAGE,
							store,
						});
					}}
				/>
			</ErrorWrapper>

			<ErrorWrapper error={descriptionError}>
				<AutoResizingTextarea
					className={`${styles.input} ${styles.title}`}
					placeholder={"Заповніть заголовок"}
					value={description}
					onChange={(e) => {
						handleImage({
							e,
							oldData: data,
							index,
							key: RedactorImageDataEnum.DESCRIPTION,
							store,
						});
					}}
				/>
			</ErrorWrapper>
		</div>
	);
}
