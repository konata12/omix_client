"use client";

import InputBlock from "@/app/admin/ui/sections/InputBlock/InputBlock";
import ErrorBlock from "@/app/common_ui/ErrorBlock/ErrorBlock";
import { ImageInputCarouselPreviewFromIndexedDB } from "@/app/common_ui/form_components/inputs/ImageInputContainer/ImageInputCarouselPreviewFromIndexedDB/ImageInputCarouselPreviewFromIndexedDB";
import { ImageInputContainer } from "@/app/common_ui/form_components/inputs/ImageInputContainer/ImageInputContainer";
import { ImageInputPreviewFromIndexedDB } from "@/app/common_ui/form_components/inputs/ImageInputContainer/ImageInputPreviewFromIndexedDB/ImageInputPreviewFromIndexedDB";
import InputContainer from "@/app/common_ui/form_components/inputs/InputContainer/InputContainer";
import InputContainerWithCheckbox from "@/app/common_ui/form_components/inputs/InputContainerWithCheckbox/InputContainerWithCheckbox";
import Stepper from "@/app/common_ui/form_components/inputs/Stepper/Stepper";
import Title from "@/app/common_ui/titles/Title";
import { getIndexedDBForForm } from "@/app/services/admin/indexedDB.service";
import { FormTypes } from "@/app/types/data/form.type";
import {
	GrainDryerImagesValuesEnum,
	GrainDryerImageValuesEnum,
	GrainDryerNotStepperValuesEnum,
	GrainDryerStepperValuesEnum,
	GrainDryerStringValuesEnum,
} from "@/app/types/data/products/grain_dryers/grain_dryers.type";
import { useGrainDryersForm } from "@/app/utils/hooks/admin/products/grain_dryers/useGrainDryersForm";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import React from "react";
import styles from "./GrainDryerForm.module.scss";

interface GrainDryerFormProps {
	formType: FormTypes;
}

const generalDataInputsArrays = [
	[
		{ lable: "Об’єм зерна (м³)", enum: GrainDryerNotStepperValuesEnum.GRAIN_VOLUME },
		{ lable: "Вага зерна (кг)", enum: GrainDryerNotStepperValuesEnum.GRAIN_WEIGHT },
	],
	[
		{ lable: "Продуктивність (т/доба)", enum: GrainDryerNotStepperValuesEnum.PRODUCTIVITY },
		{
			lable: "Кількість нагрітого повітря (м³/год)",
			enum: GrainDryerNotStepperValuesEnum.HEATED_AIR_VOLUME,
		},
		{ lable: "Температура повітря (°C)", enum: GrainDryerNotStepperValuesEnum.AIR_TEMPERATURE },
	],
];
const powerInputsArray = [
	{
		lable: "Необхідна теплова потужність (кВт)",
		enum: GrainDryerNotStepperValuesEnum.NEEDED_HEAT_POWER,
	},
	{ lable: "Електрична потужність (кВт)", enum: GrainDryerNotStepperValuesEnum.ELECTRIC_POWER },
	{
		lable: "Витрати теплової потужності на 1 т/% (кВт)",
		enum: GrainDryerNotStepperValuesEnum.HEAT_POWER_CONSUMPTION,
	},
];
const constructionSettingsInputsArray = [
	{ lable: "Висота (мм)", enum: GrainDryerNotStepperValuesEnum.HEIGHT },
	{ lable: "Ширина (мм)", enum: GrainDryerNotStepperValuesEnum.WIDTH },
	{ lable: "Довжина (мм)", enum: GrainDryerNotStepperValuesEnum.LENGTH },
	{ lable: "Вага (кг)", enum: GrainDryerNotStepperValuesEnum.WEIGHT },
];
const configurationInputsArrays = [
	[
		{ lable: "Теплогенератор (шт)", enum: GrainDryerStepperValuesEnum.HEAT_GENERATORS_COUNT },
		{ lable: "Зерносушарка у зборі (шт)", enum: GrainDryerStepperValuesEnum.GRAIN_DRYERS_COUNT },
		{
			lable: "Завантажувальний бак (зверху) (шт)",
			enum: GrainDryerStepperValuesEnum.LOADING_TANKS_TOP_COUNT,
		},
		{ lable: "Електрошафа (шт)", enum: GrainDryerStepperValuesEnum.ELECTRICAL_ENCLOSURES_COUNT },
		{
			lable: "Датчик температури нагрітого повітря (шт)",
			enum: GrainDryerStepperValuesEnum.HEATED_AIR_TEMPERATURE_SENSORS_COUNT,
		},
		{
			lable: "Датчик температури диму (шт)",
			enum: GrainDryerStepperValuesEnum.SMOKE_TEMPERATURE_SENSORS_COUNT,
		},
		{
			lable: "Датчик температури нагрітого зерна (шт)",
			enum: GrainDryerStepperValuesEnum.HEATED_GRAIN_TEMPERATURE_SENSORS_COUNT,
		},
		{
			lable: "Датчик температури охолодженого зерна (шт)",
			enum: GrainDryerStepperValuesEnum.COOLED_GRAIN_TEMPERATURE_SENSORS_COUNT,
		},
	],
	[
		{
			lable: "У завантажувальному баку (шт)",
			enum: GrainDryerStepperValuesEnum.LOADING_TANK_ROTARY_LEVEL_SENSORS_COUNT,
		},
		{
			lable: "У верхній секції сушарки (шт)",
			enum: GrainDryerStepperValuesEnum.DRYER_TOP_SECTION_ROTARY_LEVEL_SENSORS_COUNT,
		},
	],
];

export default function GrainDryerForm({ formType }: GrainDryerFormProps) {
	const { error, checkboxes, ...data } = useAppSelector(
		(state: RootState) => state.grainDryerForms[formType],
	);
	const requestError = useAppSelector((state: RootState) => state.faq.error);

	const store = getIndexedDBForForm("grain_dryers", formType);
	const {
		handleStringInputChange,
		handleNumberInputChange,
		handleStepperChange,
		handleImageInputChange,
		handleImageCarouselInputChange,
		handleImageCarouselDelete,
		handleCheckbox,
	} = useGrainDryersForm(formType, store);

	console.log(data);

	return (
		<form
			className={`section admin container df fdc gap_24`}
			// onSubmit={(e) => handleSubmit(e, data)}
		>
			<Title
				title={"Технічні характеристики"}
				description={"Введіть усі технічні параметри моделі"}
				type={"h3"}
			/>
			<div className={`df fdc gap_160`}>
				{/* BASIC INPUTS */}
				<div className={`df fdc gap_80`}>
					{/* GENERAL DATA */}
					<InputBlock title={"Основні"}>
						<InputContainer
							label={"Назва моделі зерносушильного комплексу"}
							inputId={GrainDryerStringValuesEnum.TITLE}
							value={data[GrainDryerStringValuesEnum.TITLE]}
							changeEvent={(e) =>
								handleStringInputChange(e, GrainDryerStringValuesEnum.TITLE)
							}
							error={error[GrainDryerStringValuesEnum.TITLE]}
							className={{ inputContainer: "flex_full" }}
						/>
						<div className={`df fdc gap_36`}>
							<p className={`t4 bold`}>Секції</p>
							<div className={`df gap_80`}>
								<Stepper
									label={"Нагрів (к-ть секцій)"}
									inputId={GrainDryerStepperValuesEnum.HEATING_SECTIONS}
									value={data[GrainDryerStepperValuesEnum.HEATING_SECTIONS]}
									changeEvent={handleStepperChange}
									error={error[GrainDryerStepperValuesEnum.HEATING_SECTIONS]}
									className={{ container: "flex_half" }}
								/>
								<Stepper
									label={"Охолодження (к-ть секцій)"}
									inputId={GrainDryerStepperValuesEnum.COOLING_SECTIONS}
									value={data[GrainDryerStepperValuesEnum.COOLING_SECTIONS]}
									changeEvent={handleStepperChange}
									error={error[GrainDryerStepperValuesEnum.COOLING_SECTIONS]}
									className={{ container: "flex_half" }}
								/>
							</div>
						</div>
						<div className={`df gap_24`}>
							{generalDataInputsArrays[0].map((item) => (
								<InputContainer
									key={item.enum}
									label={item.lable}
									inputId={item.enum}
									value={data[item.enum]}
									type={"number"}
									changeEvent={(e) => handleNumberInputChange(e, item.enum)}
									error={error[item.enum]}
									className={{ inputContainer: "flex_half" }}
								/>
							))}
						</div>
						<InputContainer
							label={"Метод сушіння"}
							inputId={GrainDryerStringValuesEnum.DRYING_METHOD}
							value={data[GrainDryerStringValuesEnum.DRYING_METHOD]}
							changeEvent={(e) =>
								handleStringInputChange(e, GrainDryerStringValuesEnum.DRYING_METHOD)
							}
							error={error[GrainDryerStringValuesEnum.DRYING_METHOD]}
							className={{ inputContainer: "flex_full" }}
						/>
						<div className={`df gap_24`}>
							{generalDataInputsArrays[1].map((item) => (
								<InputContainer
									key={item.enum}
									label={item.lable}
									inputId={item.enum}
									value={data[item.enum]}
									type={"number"}
									changeEvent={(e) => handleNumberInputChange(e, item.enum)}
									error={error[item.enum]}
									className={{ inputContainer: "flex_third" }}
								/>
							))}
						</div>
					</InputBlock>
					{/* POWER */}
					<InputBlock title={"Потужність"}>
						<div className={`df gap_24`}>
							{powerInputsArray.map((item) => (
								<InputContainer
									key={item.enum}
									label={item.lable}
									inputId={item.enum}
									value={data[item.enum]}
									type={"number"}
									changeEvent={(e) => handleNumberInputChange(e, item.enum)}
									error={error[item.enum]}
									className={{ inputContainer: "flex_third" }}
								/>
							))}
						</div>
					</InputBlock>
					{/* CONSTRUCTION SETTINGS*/}
					<InputBlock title={"Конструктивні характеристики"}>
						<div className={`df gap_24`}>
							{constructionSettingsInputsArray.map((item) => (
								<InputContainer
									key={item.enum}
									label={item.lable}
									inputId={item.enum}
									value={data[item.enum]}
									type={"number"}
									changeEvent={(e) => handleNumberInputChange(e, item.enum)}
									error={error[item.enum]}
									className={{ inputContainer: "flex_quarter" }}
								/>
							))}
						</div>
					</InputBlock>
					{/* CONFIGURATION */}
					<InputBlock title={"Комплектація"}>
						<div className={`df fdc gap_36`}>
							{configurationInputsArrays[0].map((item) => (
								<React.Fragment key={item.enum}>
									<Stepper
										label={item.lable}
										inputId={item.enum}
										value={data[item.enum]}
										changeEvent={handleStepperChange}
										error={error[item.enum]}
									/>
									<div className={`straight_dashed_line`}></div>
								</React.Fragment>
							))}
							<div className={`df fdc gap_36`}>
								<p className={`t4 bold`}>Датчики наповнення ротаційні</p>
								<div className={`df gap_80`}>
									{configurationInputsArrays[1].map((item) => (
										<Stepper
											key={item.enum}
											label={item.lable}
											inputId={item.enum}
											value={data[item.enum]}
											changeEvent={handleStepperChange}
											error={error[item.enum]}
											className={{ container: "flex_half" }}
										/>
									))}
								</div>
								<div className={`straight_dashed_line`}></div>
							</div>
							<Stepper
								label={"Гарантія (років)"}
								inputId={GrainDryerStepperValuesEnum.WARRANTY_YEARS_COUNT}
								value={data[GrainDryerStepperValuesEnum.WARRANTY_YEARS_COUNT]}
								changeEvent={handleStepperChange}
								error={error[GrainDryerStepperValuesEnum.WARRANTY_YEARS_COUNT]}
							/>
							<div className={`straight_dashed_line`}></div>
						</div>
					</InputBlock>
					{/*	RECOMMENDED HEAT GENERATORS */}
					{/*	TODO ADD HEAT GENERATORS SEARCHBAR */}
				</div>
				{/* GRAPHIC INFO */}
				<div className={`df fdc gap_48`}>
					<Title
						title={"Графічна інфрмація"}
						description={"Додайте зображення для цієї моделі"}
						type={"h3"}
					/>
					<InputBlock title={"YouTube відгук (опціонально)"}>
						<InputContainerWithCheckbox
							isChecked={checkboxes[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]}
							label={"Вставте посилання на відеоогляд цього продукту"}
							inputId={GrainDryerStringValuesEnum.YOUTUBE_REVIEW}
							value={data[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]}
							handleCheckbox={() =>
								handleCheckbox(
									GrainDryerStringValuesEnum.YOUTUBE_REVIEW,
									!checkboxes[GrainDryerStringValuesEnum.YOUTUBE_REVIEW],
								)
							}
							changeEvent={(e) =>
								handleStringInputChange(e, GrainDryerStringValuesEnum.YOUTUBE_REVIEW)
							}
							error={error[GrainDryerStringValuesEnum.YOUTUBE_REVIEW]}
							placeholder={"https://youtube.com/відео"}
						/>
					</InputBlock>
					<div className={`df fdc gap_80`}>
						<InputBlock title={"Фотокартка (фотографія картки)"}>
							<ImageInputContainer
								inputId={GrainDryerImageValuesEnum.CARD_IMAGE}
								changeEvent={(e) => {
									handleImageInputChange(e, GrainDryerImageValuesEnum.CARD_IMAGE);
								}}
							>
								<ImageInputPreviewFromIndexedDB
									inputId={GrainDryerImageValuesEnum.CARD_IMAGE}
									store={store}
									imageName={data[GrainDryerImageValuesEnum.CARD_IMAGE]}
									error={error[GrainDryerImageValuesEnum.CARD_IMAGE]}
								/>
							</ImageInputContainer>
						</InputBlock>
						<InputBlock title={"Фотоколаж (фотографії продукту)"}>
							<ImageInputContainer
								inputId={GrainDryerImagesValuesEnum.PRODUCT_IMAGES}
								multiple={true}
								changeEvent={(e) => {
									handleImageCarouselInputChange(
										e,
										GrainDryerImagesValuesEnum.PRODUCT_IMAGES,
									);
								}}
							>
								<ImageInputCarouselPreviewFromIndexedDB
									inputId={GrainDryerImagesValuesEnum.PRODUCT_IMAGES}
									store={store}
									imageNames={data[GrainDryerImagesValuesEnum.PRODUCT_IMAGES]}
									error={error[GrainDryerImagesValuesEnum.PRODUCT_IMAGES]}
									handleDelete={handleImageCarouselDelete}
								/>
							</ImageInputContainer>
						</InputBlock>
					</div>
				</div>
			</div>
			<ErrorBlock
				title={`Виникла помилка при ${formType === "create" ? "створенні" : "збереженні"}:`}
				error={requestError[formType]}
				id={"submit_error"}
			/>
			<button className={`btn blue t4 ${styles.submit}`} type="submit">
				{formType === "create" ? "Створити " : "Зберегти зміни"}
			</button>
			<p className={`t1 ${styles.bottom_text}`}>
				*Перед збереженням змін переконайтесь що УСІ ЗМІНЕНІ ПОЛЯ ЗАПОВНЕНІ ПРАВИЛЬНО
			</p>
		</form>
	);
}
