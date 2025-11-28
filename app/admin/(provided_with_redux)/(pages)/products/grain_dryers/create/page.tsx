import GrainDryerForm from "@/app/admin/ui/forms/products/grainDryer/GrainDryerForm";
import HeroSection from "@/app/common_ui/sections/HeroSection/HeroSection";
import Link from "next/link";

export default function FaqCreate() {
	return (
		<>
			<HeroSection
				heading={"Картка зерносушильного\n" + "комплексу"}
				description={"Створюйте або редагуйте картку товару"}
			>
				<Link href="/admin/products/grain_dryers" className={"link btn grey t4 hero_buttons"}>
					Повернутись до зерносушильних комплексів
				</Link>
			</HeroSection>
			<GrainDryerForm formType={"create"} />
		</>
	);
}
