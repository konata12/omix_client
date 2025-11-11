import InputBlock from "@/app/admin/ui/sections/InputBlock/InputBlock";
import ErrorBlock from "@/app/common_ui/ErrorBlock/ErrorBlock";
import InputContainer from "@/app/common_ui/form_components/inputs/InputContainer/InputContainer";
import InputContainerWithCheckbox from "@/app/common_ui/form_components/inputs/InputContainerWithCheckbox/InputContainerWithCheckbox";
import ResultModal from "@/app/common_ui/modals/ResultModal";
import Title from "@/app/common_ui/titles/Title";
import {
	GeneralDataOptionalValuesEnum,
	GeneralDataStringValuesEnum,
} from "@/app/types/data/general_data.type";
import { useGeneralInfoForm } from "@/app/utils/hooks/admin/general_info/useGeneralInfoForm";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import styles from "./GeneralInfoForm.module.scss";

export const GeneralInfoFormId = "general_data";

export default function GeneralInfoForm() {
	const { status, error, checkboxes, ...data } = useAppSelector(
		(state: RootState) => state.generalData,
	);

	const {
		youtube: youtubeCheckbox,
		facebook: facebookCheckbox,
		instagram: instagramCheckbox,
	} = checkboxes;

	const { handleCheckbox, handleInputChange, modalCloseHandler, handleSubmit } =
		useGeneralInfoForm();

	return (
		<form
			id={GeneralInfoFormId}
			onSubmit={handleSubmit}
			className={`container df fdc gap_48`}
		>
			<Title
				title={"Контактна інформація"}
				description={
					"Контактна інформація, яка відображатиметься на сайті у контактах та під час замовлення."
				}
				type={"h3"}
			/>
			<ErrorBlock
				title={"Виникла помилка при отриманні даних:"}
				error={error.get}
				className={"admin_cont"}
			/>
			<InputBlock title={"Контакти"}>
				<div className={"df gap_24"}>
					<InputContainer
						label={"Номер телефону"}
						inputId={GeneralDataStringValuesEnum.PHONE_NUMBER}
						value={data[GeneralDataStringValuesEnum.PHONE_NUMBER]}
						changeEvent={(e) =>
							handleInputChange(
								e,
								GeneralDataStringValuesEnum.PHONE_NUMBER,
							)
						}
						error={error[GeneralDataStringValuesEnum.PHONE_NUMBER]}
						placeholder={"+380 (__) ___-__-__"}
						className={{
							inputContainer: "flex_half",
						}}
					/>
					<InputContainer
						label={"Електронна пошта"}
						inputId={GeneralDataStringValuesEnum.EMAIL}
						value={data[GeneralDataStringValuesEnum.EMAIL]}
						changeEvent={(e) =>
							handleInputChange(e, GeneralDataStringValuesEnum.EMAIL)
						}
						error={error[GeneralDataStringValuesEnum.EMAIL]}
						placeholder={"зразок@gmail.com"}
						className={{
							inputContainer: "flex_half",
						}}
					/>
				</div>
			</InputBlock>
			<InputBlock title={"Адреса"}>
				<div className={"df gap_24"}>
					<InputContainer
						label={"Повна адреса"}
						inputId={GeneralDataStringValuesEnum.ADDRESS}
						value={data[GeneralDataStringValuesEnum.ADDRESS]}
						changeEvent={(e) =>
							handleInputChange(e, GeneralDataStringValuesEnum.ADDRESS)
						}
						error={error[GeneralDataStringValuesEnum.ADDRESS]}
						placeholder={"м. ___, вул. ___, №"}
						className={{
							inputContainer: "flex_half",
						}}
					/>
					<InputContainer
						label={"Посилання на адресу в Google maps"}
						inputId={GeneralDataStringValuesEnum.GOOGLE_MAPS_URL}
						value={data[GeneralDataStringValuesEnum.GOOGLE_MAPS_URL]}
						changeEvent={(e) =>
							handleInputChange(
								e,
								GeneralDataStringValuesEnum.GOOGLE_MAPS_URL,
							)
						}
						error={error[GeneralDataStringValuesEnum.GOOGLE_MAPS_URL]}
						placeholder={"https://maps.google.com/..."}
						className={{
							inputContainer: "flex_half",
						}}
					/>
				</div>
			</InputBlock>
			<InputBlock title={"Соц.мережі"}>
				<div className={"df gap_24"}>
					<InputContainerWithCheckbox
						isChecked={checkboxes[GeneralDataOptionalValuesEnum.YOUTUBE]}
						label={"YouTube"}
						inputId={GeneralDataOptionalValuesEnum.YOUTUBE}
						value={data[GeneralDataOptionalValuesEnum.YOUTUBE]}
						handleCheckbox={() =>
							handleCheckbox(
								GeneralDataOptionalValuesEnum.YOUTUBE,
								!youtubeCheckbox,
							)
						}
						changeEvent={(e) =>
							handleInputChange(
								e,
								GeneralDataOptionalValuesEnum.YOUTUBE,
							)
						}
						error={error[GeneralDataOptionalValuesEnum.YOUTUBE]}
						placeholder={"https://youtube.com/@назваканалу"}
						className={{
							inputContainer: "flex_third",
						}}
					/>
					<InputContainerWithCheckbox
						isChecked={
							checkboxes[GeneralDataOptionalValuesEnum.FACEBOOK]
						}
						label={"Facebook"}
						inputId={GeneralDataOptionalValuesEnum.FACEBOOK}
						value={data[GeneralDataOptionalValuesEnum.FACEBOOK]}
						handleCheckbox={() =>
							handleCheckbox(
								GeneralDataOptionalValuesEnum.FACEBOOK,
								!facebookCheckbox,
							)
						}
						changeEvent={(e) =>
							handleInputChange(
								e,
								GeneralDataOptionalValuesEnum.FACEBOOK,
							)
						}
						error={error[GeneralDataOptionalValuesEnum.FACEBOOK]}
						placeholder={"https://facebook.com/нікнейм"}
						className={{
							inputContainer: "flex_third",
						}}
					/>
					<InputContainerWithCheckbox
						isChecked={
							checkboxes[GeneralDataOptionalValuesEnum.INSTAGRAM]
						}
						label={"Instagram"}
						inputId={GeneralDataOptionalValuesEnum.INSTAGRAM}
						value={data[GeneralDataOptionalValuesEnum.INSTAGRAM]}
						handleCheckbox={() =>
							handleCheckbox(
								GeneralDataOptionalValuesEnum.INSTAGRAM,
								!instagramCheckbox,
							)
						}
						changeEvent={(e) =>
							handleInputChange(
								e,
								GeneralDataOptionalValuesEnum.INSTAGRAM,
							)
						}
						error={error[GeneralDataOptionalValuesEnum.INSTAGRAM]}
						placeholder={"https://instagram.com/нікнейм"}
						className={{
							inputContainer: "flex_third",
						}}
					/>
				</div>
			</InputBlock>
			<ResultModal
				active={status.update === "succeeded"}
				closeHandler={modalCloseHandler}
				error={false}
			>
				<p className={"t3"}>
					<span className={"semibold"}>Зміни збережено!</span> Незабаром
					вони оновляться на сайті.
				</p>
				<button
					className={`btn blue t4 ${styles.modal_btn}`}
					onClick={modalCloseHandler}
				>
					Ок!
				</button>
			</ResultModal>
		</form>
	);
}
