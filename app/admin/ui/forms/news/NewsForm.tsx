"use client";

import InputBlock from "@/app/admin/ui/sections/InputBlock/InputBlock";
import Accordeon from "@/app/common_ui/animated_components/accordeons/Accordeon/Accordeon";
import ErrorBlock from "@/app/common_ui/ErrorBlock/ErrorBlock";
import { ImageInputContainer } from "@/app/common_ui/form_components/inputs/ImageInputContainer/ImageInputContainer";
import { ImageInputPreviewFromIndexedDB } from "@/app/common_ui/form_components/inputs/ImageInputContainer/ImageInputPreviewFromIndexedDB/ImageInputPreviewFromIndexedDB";
import InputContainer from "@/app/common_ui/form_components/inputs/InputContainer/InputContainer";
import TextareaContainer from "@/app/common_ui/form_components/textareas/TextareaContainer/TextareaContainer";
import Title from "@/app/common_ui/titles/Title";
import { getIndexedDBForForm } from "@/app/services/admin/indexedDB.service";
import { FormTypes } from "@/app/types/data/form.type";
import { NewsImageValuesEnum, NewsStringValuesEnum } from "@/app/types/data/news";
import { useNewsForm } from "@/app/utils/hooks/admin/news/useNewsForm";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import React from "react";

interface NewsFormProps {
	formType: FormTypes;
}

export default function NewsForm({ formType }: NewsFormProps) {
	const { error, data } = useAppSelector((state: RootState) => state.newsForms[formType]);
	const requestError = useAppSelector((state: RootState) => state.news.error);

	const store = getIndexedDBForForm("news", formType);
	const { handleStringInputChange, handleImageInputChange } = useNewsForm(formType, store);

	return (
		<form className={`section admin container df fdc gap_48`}>
			{/* IMAGE */}
			<div className={`df fdc gap_48`}>
				<Title
					title={"Графічна інфрмація"}
					description={"Додайте зображення для цієї новини"}
					type={"h3"}
				/>

				<InputBlock title={"Обгортка новини (головна фотографія)"}>
					<ImageInputContainer
						inputId={NewsImageValuesEnum.IMAGE}
						changeEvent={(e) => {
							handleImageInputChange(e, NewsImageValuesEnum.IMAGE);
						}}
					>
						<ImageInputPreviewFromIndexedDB
							inputId={NewsImageValuesEnum.IMAGE}
							size={"big"}
							store={store}
							imageName={data[NewsImageValuesEnum.IMAGE]}
							error={error[NewsImageValuesEnum.IMAGE]}
						/>
					</ImageInputContainer>
				</InputBlock>
			</div>
			<div className={`df fdc gap_48`}>
				<Title
					title={"Текстова форма"}
					description={"Заповніть весь текст новини у наступних формах:"}
					type={"h3"}
				/>
				{/* REDACTOR INSTRUCTIONS */}
				<Accordeon title={"Як заповнювати текстову форму? (Довідник)"}>123</Accordeon>
				{/* TEXT */}
				<InputBlock>
					<InputContainer
						label={"Назва новини"}
						inputId={NewsStringValuesEnum.TITLE}
						value={data[NewsStringValuesEnum.TITLE]}
						changeEvent={(e) => handleStringInputChange(e, NewsStringValuesEnum.TITLE)}
						error={error[NewsStringValuesEnum.TITLE]}
						className={{ inputContainer: "flex_full" }}
					/>
					<TextareaContainer
						key={NewsStringValuesEnum.DESCRIPTION}
						label={"Короткий опис (до 3 речень)"}
						inputId={NewsStringValuesEnum.DESCRIPTION}
						value={data[NewsStringValuesEnum.DESCRIPTION]}
						minRows={2}
						changeEvent={(e) => handleStringInputChange(e, NewsStringValuesEnum.DESCRIPTION)}
						error={error[NewsStringValuesEnum.DESCRIPTION]}
						className={{ inputContainer: "flex_half" }}
					/>
				</InputBlock>
				{/*	REDACTOR */}
			</div>
			<div className={`df fdc gap_48 admin_cont`}>
				<ErrorBlock
					title={`Виникла помилка при ${formType === "create" ? "створенні" : "збереженні"}:`}
					error={requestError[formType]}
					id={"submit_error"}
				/>
				<button className={`btn blue t4`} type="submit">
					{formType === "create" ? "Створити " : "Зберегти зміни"}
				</button>
			</div>
		</form>
	);
}
