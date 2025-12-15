import AutoResizingTextarea from "@/app/common_ui/form_components/textareas/AutoResizingTextarea/AutoResizingTextarea";
import ErrorWrapper from "@/app/common_ui/wrappers/ErrorWrapper/ErrorWrapper";
import { FormTypes } from "@/app/types/data/form.type";
import {
	RedactorSlicesNamesType,
	RedactorTitleDataEnum,
	RedactorTitleFormComponent,
} from "@/app/types/data/redactor/redactor";
import { useRedactorFormComponents } from "@/app/utils/hooks/admin/redactor/useRedactorFormComponents";
import styles from "../redactor_text_inputs_styles.module.scss";

interface RedactorTitleInputProps {
	index: number;
	data: RedactorTitleFormComponent;

	// FOR HOOK
	sliceName: RedactorSlicesNamesType;
	form?: FormTypes;
}

export default function RedactorTitleInput({ index, data, sliceName, form }: RedactorTitleInputProps) {
	const { handleTitle } = useRedactorFormComponents(sliceName, form);
	const value = data.data[RedactorTitleDataEnum.TITLE];
	const error = data.error[RedactorTitleDataEnum.TITLE].message;

	return (
		<ErrorWrapper error={error}>
			<AutoResizingTextarea
				className={`${styles.input} ${styles.title}`}
				placeholder={"Заповніть заголовок"}
				value={value}
				onChange={(e) => {
					handleTitle({ e, index, oldData: data });
				}}
			/>
		</ErrorWrapper>
	);
}
