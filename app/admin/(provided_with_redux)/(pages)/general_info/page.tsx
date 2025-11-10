"use client";

import { generalPageLeaveMessage } from "@/app/admin/(provided_with_redux)/(pages)/general_info/constants";
import GeneralInfoForm, {
	GeneralInfoFormId,
} from "@/app/admin/ui/forms/generalInfo/GeneralInfoForm";
import SafeLink from "@/app/admin/ui/links/SafeLink/SafeLink";
import FaqList from "@/app/admin/ui/lists/FaqList/FaqList";
import ErrorBlock from "@/app/common_ui/ErrorBlock/ErrorBlock";
import HeroSection from "@/app/common_ui/sections/HeroSection/HeroSection";
import Title from "@/app/common_ui/titles/Title";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import styles from "./page.module.scss";

export default function GrainDryersPage() {
	const { error } = useAppSelector((state: RootState) => state.generalData);

	return (
		<>
			<HeroSection
				heading={"Загальна інформація"}
				description={
					"Редагуйте контакти та керуйте розділом часто задаваних питань"
				}
			>
				<div className={`hero_buttons ${styles.hero_buttons}`}>
					<SafeLink
						href="/admin/products"
						className={"link btn grey t4"}
						confirmMessage={generalPageLeaveMessage}
					>
						Повернутись на головну
					</SafeLink>
					<button
						className={`btn blue t4`}
						type="submit"
						form={GeneralInfoFormId}
					>
						Зберегти зміни
					</button>
				</div>
				<ErrorBlock
					title={"Виникла помилка при отриманні даних:"}
					error={error.update}
					id={`submit_error`}
				/>
			</HeroSection>
			<GeneralInfoForm />
			<section
				className={`section admin container df fdc gap_48 ${styles.faq_section}`}
			>
				<Title
					title={"Часто задавані питання"}
					description={
						"Створюйте або редагуйте відповіді на часто задавані питання"
					}
					type={"h3"}
				/>
				<FaqList />
			</section>
		</>
	);
}
