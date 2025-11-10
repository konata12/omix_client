import FaqForm from "@/app/admin/ui/forms/faq/FaqForm";
import HeroSection from "@/app/common_ui/sections/HeroSection/HeroSection";
import Link from "next/link";

export default function FaqCreate() {
	return (
		<>
			<HeroSection
				heading={"Форма часто\n" + "задаваного питання"}
				description={"Створюйте або редагуйте часто задаване питання"}
			>
				<Link
					href="/admin/general_info"
					className={"link btn grey t4 hero_buttons"}
				>
					Повернутись до загальної інформації
				</Link>
			</HeroSection>
			<FaqForm formType={"create"} />
		</>
	);
}
