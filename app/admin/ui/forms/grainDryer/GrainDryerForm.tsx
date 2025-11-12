"use client";

import InputBlock from "@/app/admin/ui/sections/InputBlock/InputBlock";
import ErrorBlock from "@/app/common_ui/ErrorBlock/ErrorBlock";
import InputContainer from "@/app/common_ui/form_components/inputs/InputContainer/InputContainer";
import Stepper from "@/app/common_ui/form_components/inputs/Stepper/Stepper";
import Title from "@/app/common_ui/titles/Title";
import { FormTypes } from "@/app/types/data/form.type";
import {
	GrainDryerNumberValuesEnum,
	GrainDryerStringValuesEnum,
} from "@/app/types/data/products/grain_dryers/grain_dryers.type";
import { useGrainDryersForm } from "@/app/utils/hooks/admin/products/grain_dryers/useGrainDryersForm";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import styles from "./GrainDryerForm.module.scss";

interface GrainDryerFormProps {
	formType: FormTypes;
}

export default function GrainDryerForm({ formType }: GrainDryerFormProps) {
	const { error, ...data } = useAppSelector(
		(state: RootState) => state.grainDryerForms[formType],
	);
	const requestError = useAppSelector((state: RootState) => state.faq.error);
	const { handleStringInputChange, handleNumberInputChange } =
		useGrainDryersForm(formType);

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
			<InputBlock title={"Контакти"}>
				<div className={"df wrap gap_36"}>
					<InputContainer
						label={"Назва моделі зерносушильного комплексу "}
						inputId={GrainDryerStringValuesEnum.TITLE}
						value={data[GrainDryerStringValuesEnum.TITLE]}
						changeEvent={(e) =>
							handleStringInputChange(
								e,
								GrainDryerStringValuesEnum.TITLE,
							)
						}
						error={error[GrainDryerStringValuesEnum.TITLE]}
						className={{ inputContainer: "flex_full" }}
					/>
				</div>
				<Stepper
					label={"Назва моделі зерносушильного комплексу "}
					inputId={GrainDryerNumberValuesEnum.GRAIN_VOLUME}
					value={data[GrainDryerNumberValuesEnum.GRAIN_VOLUME]}
					changeEvent={handleNumberInputChange}
					error={error[GrainDryerNumberValuesEnum.GRAIN_VOLUME]}
					className={{ inputContainer: "flex_full" }}
				/>
			</InputBlock>
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
