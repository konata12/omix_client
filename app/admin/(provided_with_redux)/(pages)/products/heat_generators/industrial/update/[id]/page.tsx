import { HEAT_GENERATOR_TYPES } from "@/app/admin/(provided_with_redux)/(pages)/products/heat_generators/constants";
import HeatGeneratorForm from "@/app/admin/ui/forms/heatGenerator/HeatGeneratorForm";
import SafeLink from "@/app/admin/ui/links/SafeLink/SafeLink";
import HeroSection from "@/app/common_ui/sections/HeroSection/HeroSection";

export default function IndustrialHeatGeneratorUpdate() {
	return (
		<>
			<HeroSection
				heading={"Картка промислового \n" + "теплогенератора"}
				description={"Створюйте або редагуйте картку товару"}
			>
				<SafeLink
					href="/admin/products/heat_generators/industrial"
					className={"link btn grey t4 hero_buttons"}
				>
					Повернутись до промислових теплогенераторів
				</SafeLink>
			</HeroSection>
			<HeatGeneratorForm formType={"update"} heatGeneratorType={HEAT_GENERATOR_TYPES[1]} />
		</>
	);
}
