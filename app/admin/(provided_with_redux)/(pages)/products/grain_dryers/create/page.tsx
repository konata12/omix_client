import FaqForm from "@/app/admin/ui/forms/faq/FaqForm";
import HeroSection from "@/app/common_ui/sections/HeroSection/HeroSection";
import Link from "next/link";

export default function FaqCreate() {
	return (
		<>
			<HeroSection
				heading={"Картка зерносушильного\n" + "комплексу"}
				description={"Створюйте або редагуйте картку товару"}
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
