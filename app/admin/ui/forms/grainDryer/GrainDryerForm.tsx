"use client";

import ErrorBlock from "@/app/common_ui/ErrorBlock/ErrorBlock";
import InputContainer from "@/app/common_ui/form_components/inputs/InputContainer/InputContainer";
import TextareaContainer from "@/app/common_ui/form_components/inputs/TextareaContainer/TextareaContainer";
import { FaqValuesEnum } from "@/app/types/data/faq.type";
import { FormTypes } from "@/app/types/data/form.type";
import { useFaqForm } from "@/app/utils/hooks/admin/general_info/faq/useFaqForm";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import styles from "./GrainDryerForm.module.scss";

interface GrainDryerFormProps {
	formType: FormTypes;
}

export default function GrainDryerForm({ formType }: GrainDryerFormProps) {
	const { error, ...data } = useAppSelector(
		(state: RootState) => state.faqForms[formType],
	);
	const requestError = useAppSelector((state: RootState) => state.faq.error);
	const { question, answer } = data;
	const { handleInputChange, handleSubmit } = useFaqForm(formType);

	return (
		<form
			className={`section admin container admin_form df fdc gap_24`}
			onSubmit={(e) => handleSubmit(e, data)}
		>
			<InputContainer
				label={"Заголовок (питання на яке потрібно розписати відповідь)"}
				inputId={FaqValuesEnum.QUESTION}
				value={question}
				changeEvent={(e) => handleInputChange(e, FaqValuesEnum.QUESTION)}
				error={error[FaqValuesEnum.QUESTION]}
				placeholder={"Напишіть запитання на яке будете давати відповідь"}
			/>
			<TextareaContainer
				label={"Відповідь на запитання"}
				inputId={FaqValuesEnum.ANSWER}
				value={answer}
				changeEvent={(e) => handleInputChange(e, FaqValuesEnum.ANSWER)}
				error={error[FaqValuesEnum.ANSWER]}
				placeholder={"Дайте відповідь на запитання (розгорнуто)"}
			/>
			<ErrorBlock
				title={`Виникла помилка при ${formType === "create" ? "створенні" : "збереженні"}:`}
				error={requestError[formType]}
				id={"submit_error"}
			/>
			<button className={`btn blue t4 ${styles.submit}`} type="submit">
				{formType === "create" ? "Створити " : "Зберегти зміни"}
			</button>
		</form>
	);
}
