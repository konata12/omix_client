"use client";

import {
	FUEL_BURNING_TYPES,
	HEAT_GENERATOR_TYPES,
} from "@/app/admin/(provided_with_redux)/(pages)/products/heat_generators/constants";
import InputBlock from "@/app/admin/ui/sections/InputBlock/InputBlock";
import ErrorBlock from "@/app/common_ui/ErrorBlock/ErrorBlock";
import { ImageInputCarouselPreviewFromIndexedDB } from "@/app/common_ui/form_components/inputs/ImageInputContainer/ImageInputCarouselPreviewFromIndexedDB/ImageInputCarouselPreviewFromIndexedDB";
import { ImageInputContainer } from "@/app/common_ui/form_components/inputs/ImageInputContainer/ImageInputContainer";
import { ImageInputPreviewFromIndexedDB } from "@/app/common_ui/form_components/inputs/ImageInputContainer/ImageInputPreviewFromIndexedDB/ImageInputPreviewFromIndexedDB";
import InputContainer from "@/app/common_ui/form_components/inputs/InputContainer/InputContainer";
import InputContainerWithCheckbox from "@/app/common_ui/form_components/inputs/InputContainerWithCheckbox/InputContainerWithCheckbox";
import Stepper from "@/app/common_ui/form_components/inputs/Stepper/Stepper";
import SelectContainer from "@/app/common_ui/form_components/selects/SelectContainer/SelectContainer";
import Title from "@/app/common_ui/titles/Title";
import { getIndexedDBForForm } from "@/app/services/admin/indexedDB.service";
import { FormTypes } from "@/app/types/data/form.type";
import {
	HeatGeneratorImagesValuesEnum,
	HeatGeneratorImageValuesEnum,
	HeatGeneratorNotStepperValuesEnum,
	HeatGeneratorStepperValuesEnum,
	HeatGeneratorStringValuesEnum,
	HeatGeneratorsTypes,
} from "@/app/types/data/products/heat_generators/heat_generators.type";
import { useHeatGeneratorsForm } from "@/app/utils/hooks/admin/products/heat_generators/useHeatGeneratorsForm";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import React from "react";
import styles from "./HeatGeneratorForm.module.scss";

interface HeatGeneratorFormProps {
	formType: FormTypes;
	heatGeneratorType: HeatGeneratorsTypes;
}

// DATA FOR INPUTS GENERATION
const powerInputsArrayFirstLine = [
	{
		lable: "Номінальна теплова потужність (кВт)",
		enum: HeatGeneratorNotStepperValuesEnum.NOMINAL_POWER,
	},
	{
		lable: "Максимальна теплова потужність (кВт)",
		enum: HeatGeneratorNotStepperValuesEnum.MAX_POWER,
	},
];
const fuelInputsArray = [
	{
		lable: "Вид палива",
		enum: HeatGeneratorStringValuesEnum.FUEL_TYPE,
	},
	{
		lable: "Вологість палива",
		enum: HeatGeneratorStringValuesEnum.FUEL_MOISTURE,
	},
	{
		lable: "Тривалість горіння однієї закладки",
		enum: HeatGeneratorStringValuesEnum.FUEL_BURNING_TIME,
	},
];
const constructionSettingsInputsArray = {
	firstLine: [
		{ lable: "Висота (мм)", enum: HeatGeneratorNotStepperValuesEnum.HEIGHT },
		{ lable: "Ширина (мм)", enum: HeatGeneratorNotStepperValuesEnum.WIDTH },
		{ lable: "Довжина (мм)", enum: HeatGeneratorNotStepperValuesEnum.LENGTH },
		{ lable: "Вага (кг)", enum: HeatGeneratorNotStepperValuesEnum.WEIGHT },
	],
	secondLine: [
		{ lable: "Січення топки (мм)", enum: HeatGeneratorStringValuesEnum.FURNACE_CROSS_SECTION },
		{ lable: "Матеріал топки", enum: HeatGeneratorStringValuesEnum.FURNACE_MATERIAL },
		{
			lable: "Матеріал теплообмінника",
			enum: HeatGeneratorStringValuesEnum.FURNACE_HEAT_EXCHANGER_MATERIAL,
		},
	],
};
const configurationInputsArrays = [
	{ lable: "Теплогенератор (шт)", enum: HeatGeneratorStepperValuesEnum.HEAT_GENERATORS_COUNT },
	{ lable: "Вентилятор-димотяг (шт)", enum: HeatGeneratorStepperValuesEnum.EXHAUST_FANS_COUNT },
	{ lable: "Гарантія (років)", enum: HeatGeneratorStepperValuesEnum.WARRANTY_YEARS_COUNT },
];

export default function HeatGeneratorForm({ formType, heatGeneratorType }: HeatGeneratorFormProps) {
	const { error, checkboxes, ...data } = useAppSelector(
		(state: RootState) => state[`${heatGeneratorType}HeatGeneratorForms`][formType],
	);
	const requestError = useAppSelector(
		(state: RootState) => state.heatGenerator[heatGeneratorType].error,
	);

	const store = getIndexedDBForForm(`${heatGeneratorType}_heat_generators`, formType);
	const {
		handleStringInputChange,
		handleSelectChange,
		handleNumberInputChange,
		handleStepperChange,
		handleImageInputChange,
		handleImageCarouselInputChange,
		handleImageCarouselDelete,
		handleCheckbox,
		handleSubmit,
	} = useHeatGeneratorsForm(formType, heatGeneratorType, store);
	const fuelBurningTypesOptions =
		heatGeneratorType === HEAT_GENERATOR_TYPES[0] ? [FUEL_BURNING_TYPES[0]] : FUEL_BURNING_TYPES;

	return (
		<form className={`section admin container df fdc gap_24`} onSubmit={(e) => handleSubmit(e)}>
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
							inputId={HeatGeneratorStringValuesEnum.TITLE}
							value={data[HeatGeneratorStringValuesEnum.TITLE]}
							changeEvent={(e) =>
								handleStringInputChange(e, HeatGeneratorStringValuesEnum.TITLE)
							}
							error={error[HeatGeneratorStringValuesEnum.TITLE]}
							className={{ inputContainer: "flex_full" }}
						/>
					</InputBlock>
					{/* POWER */}
					<InputBlock title={"Потужність"}>
						<div className={`df gap_24`}>
							{powerInputsArrayFirstLine.map((item) => (
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
						<div className={`df gap_24`}>
							<InputContainer
								label={"Електрична потужність (кВт)"}
								inputId={HeatGeneratorNotStepperValuesEnum.ELECTRIC_POWER}
								value={data[HeatGeneratorNotStepperValuesEnum.ELECTRIC_POWER]}
								type={"number"}
								changeEvent={(e) =>
									handleNumberInputChange(
										e,
										HeatGeneratorNotStepperValuesEnum.ELECTRIC_POWER,
									)
								}
								error={error[HeatGeneratorNotStepperValuesEnum.ELECTRIC_POWER]}
								className={{ inputContainer: "flex_half" }}
							/>
							<InputContainer
								label={"Діапазон регулювання потужності (від – до%)"}
								inputId={HeatGeneratorStringValuesEnum.POWER_REGULATION_DIAPASON}
								value={data[HeatGeneratorStringValuesEnum.POWER_REGULATION_DIAPASON]}
								changeEvent={(e) =>
									handleStringInputChange(
										e,
										HeatGeneratorStringValuesEnum.POWER_REGULATION_DIAPASON,
									)
								}
								error={error[HeatGeneratorStringValuesEnum.POWER_REGULATION_DIAPASON]}
								className={{ inputContainer: "flex_half" }}
							/>
						</div>
					</InputBlock>
					{/* FUEL */}
					<InputBlock title={"Горіння та паливо"}>
						<>
							{/* TODO ADD SELECT FOR FUEL BURNING TYPE */}
							<SelectContainer
								label={"Спосіб горіння"}
								inputId={HeatGeneratorStringValuesEnum.FUEL_BURNING_TYPE}
								value={data[HeatGeneratorStringValuesEnum.FUEL_BURNING_TYPE]}
								options={fuelBurningTypesOptions}
								handleSelect={(value: string) =>
									handleSelectChange(
										value,
										HeatGeneratorStringValuesEnum.FUEL_BURNING_TYPE,
									)
								}
								error={error[HeatGeneratorStringValuesEnum.FUEL_BURNING_TYPE]}
								className={{ inputContainer: "flex_full" }}
							/>
							<div className={`df gap_24`}>
								{fuelInputsArray.map((item) => (
									<InputContainer
										key={item.enum}
										label={item.lable}
										inputId={item.enum}
										value={data[item.enum]}
										changeEvent={(e) => handleStringInputChange(e, item.enum)}
										error={error[item.enum]}
										className={{ inputContainer: "flex_half" }}
									/>
								))}
							</div>
						</>
					</InputBlock>
					{/* CONSTRUCTION SETTINGS*/}
					<InputBlock title={"Конструктивні характеристики"}>
						<div className={`df gap_24`}>
							{constructionSettingsInputsArray.firstLine.map((item) => (
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
						<div className={`df gap_24`}>
							<InputContainer
								label={"Об’єм топки (м³)"}
								inputId={HeatGeneratorNotStepperValuesEnum.FURNACE_VOLUME}
								value={data[HeatGeneratorNotStepperValuesEnum.FURNACE_VOLUME]}
								type={"number"}
								changeEvent={(e) =>
									handleNumberInputChange(
										e,
										HeatGeneratorNotStepperValuesEnum.FURNACE_VOLUME,
									)
								}
								error={error[HeatGeneratorNotStepperValuesEnum.FURNACE_VOLUME]}
								className={{ inputContainer: `flex_quarter ${styles.furnace_volume}` }}
							/>
							{constructionSettingsInputsArray.secondLine.map((item) => (
								<InputContainer
									key={item.enum}
									label={item.lable}
									inputId={item.enum}
									value={data[item.enum]}
									changeEvent={(e) => handleStringInputChange(e, item.enum)}
									error={error[item.enum]}
									className={{
										inputContainer: `flex_quarter ${styles[item.enum]}`,
									}}
								/>
							))}
						</div>
					</InputBlock>
					{/* CONFIGURATION */}
					<InputBlock title={"Комплектація"}>
						<div className={`df fdc gap_36`}>
							{configurationInputsArrays.map((item) => (
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
								<div className={`df gap_80`}>
									<InputContainer
										label={"Модель вентилятора"}
										inputId={HeatGeneratorStringValuesEnum.FAN_MODEL}
										value={data[HeatGeneratorStringValuesEnum.FAN_MODEL]}
										changeEvent={(e) =>
											handleStringInputChange(
												e,
												HeatGeneratorStringValuesEnum.FAN_MODEL,
											)
										}
										error={error[HeatGeneratorStringValuesEnum.FAN_MODEL]}
										className={{ inputContainer: "flex_half" }}
									/>
									<Stepper
										label={"К-ть вентиляторів (шт)"}
										inputId={HeatGeneratorStepperValuesEnum.FAN_MODELS_COUNT}
										value={data[HeatGeneratorStepperValuesEnum.FAN_MODELS_COUNT]}
										changeEvent={handleStepperChange}
										error={error[HeatGeneratorStepperValuesEnum.FAN_MODELS_COUNT]}
										className={{ container: "flex_half" }}
									/>
								</div>
								<div className={`straight_dashed_line`}></div>
							</div>
							<Stepper
								label={"Гарантія (років)"}
								inputId={HeatGeneratorStepperValuesEnum.WARRANTY_YEARS_COUNT}
								value={data[HeatGeneratorStepperValuesEnum.WARRANTY_YEARS_COUNT]}
								changeEvent={handleStepperChange}
								error={error[HeatGeneratorStepperValuesEnum.WARRANTY_YEARS_COUNT]}
							/>
							<div className={`straight_dashed_line`}></div>
						</div>
					</InputBlock>
				</div>
				{/* GRAPHIC INFO */}
				<div className={`df fdc gap_48`}>
					<Title
						title={"Графічна  інфрмація"}
						description={"Додайте зображення для цієї моделі"}
						type={"h3"}
					/>
					<InputBlock title={"YouTube відгук (опціонально)"}>
						<InputContainerWithCheckbox
							isChecked={checkboxes[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]}
							label={"Вставте посилання на відеоогляд цього продукту"}
							inputId={HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW}
							value={data[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]}
							handleCheckbox={() =>
								handleCheckbox(
									HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW,
									!checkboxes[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW],
								)
							}
							changeEvent={(e) =>
								handleStringInputChange(e, HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW)
							}
							error={error[HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW]}
							placeholder={"https://youtube.com/відео"}
						/>
					</InputBlock>
					<div className={`df fdc gap_80`}>
						<InputBlock title={"Фотокартка (фотографія картки)"}>
							<ImageInputContainer
								inputId={HeatGeneratorImageValuesEnum.CARD_IMAGE}
								changeEvent={(e) => {
									handleImageInputChange(e, HeatGeneratorImageValuesEnum.CARD_IMAGE);
								}}
							>
								<ImageInputPreviewFromIndexedDB
									inputId={HeatGeneratorImageValuesEnum.CARD_IMAGE}
									store={store}
									imageName={data[HeatGeneratorImageValuesEnum.CARD_IMAGE]}
									error={error[HeatGeneratorImageValuesEnum.CARD_IMAGE]}
								/>
							</ImageInputContainer>
						</InputBlock>
						<InputBlock title={"Фотоколаж (фотографії продукту)"}>
							<ImageInputContainer
								inputId={HeatGeneratorImagesValuesEnum.PRODUCT_IMAGES}
								multiple={true}
								changeEvent={(e) => {
									handleImageCarouselInputChange(
										e,
										HeatGeneratorImagesValuesEnum.PRODUCT_IMAGES,
									);
								}}
							>
								<ImageInputCarouselPreviewFromIndexedDB
									inputId={HeatGeneratorImagesValuesEnum.PRODUCT_IMAGES}
									store={store}
									imageNames={data[HeatGeneratorImagesValuesEnum.PRODUCT_IMAGES]}
									error={error[HeatGeneratorImagesValuesEnum.PRODUCT_IMAGES]}
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
