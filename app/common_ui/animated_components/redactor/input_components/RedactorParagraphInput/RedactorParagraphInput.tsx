import AutoResizingTextarea from "@/app/common_ui/form_components/textareas/AutoResizingTextarea/AutoResizingTextarea";
import ErrorWrapper from "@/app/common_ui/wrappers/ErrorWrapper/ErrorWrapper";
import { FormTypes } from "@/app/types/data/form.type";
import {
	RedactorParagraphDataEnum,
	RedactorParagraphFormComponent,
	RedactorSlicesNamesType,
} from "@/app/types/data/redactor/redactor";
import { useRedactorFormComponents } from "@/app/utils/hooks/admin/redactor/useRedactorFormComponents";
import styles from "../redactor_text_inputs_styles.module.scss";

interface RedactorTitleInputProps {
	index: number;
	data: RedactorParagraphFormComponent;

	// FOR HOOK
	sliceName: RedactorSlicesNamesType;
	form?: FormTypes;
}

export default function RedactorParagraphInput({
	index,
	data,
	sliceName,
	form,
}: RedactorTitleInputProps) {
	const { handleParagraph } = useRedactorFormComponents(sliceName, form);
	const value = data.data[RedactorParagraphDataEnum.TEXT];
	const error = data.error[RedactorParagraphDataEnum.TEXT].message;

	return (
		<ErrorWrapper error={error}>
			<AutoResizingTextarea
				className={`${styles.input} ${styles.text}`}
				placeholder={"Заповніть абзац"}
				value={value}
				onChange={(e) => {
					handleParagraph({ e, index, oldData: data });
				}}
			/>
		</ErrorWrapper>
	);
}
