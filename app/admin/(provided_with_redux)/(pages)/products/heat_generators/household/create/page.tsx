import { HEAT_GENERATOR_TYPES } from "@/app/admin/(provided_with_redux)/(pages)/products/heat_generators/constants";
import HeatGeneratorForm from "@/app/admin/ui/forms/products/heatGenerator/HeatGeneratorForm";
import HeroSection from "@/app/common_ui/sections/HeroSection/HeroSection";
import Link from "next/link";

export default function HouseholdHeatGeneratorCreate() {
	return (
		<>
			<HeroSection
				heading={"Картка побутового \n" + "теплогенератора"}
				description={"Створюйте або редагуйте картку товару"}
			>
				<Link
					href="/admin/products/heat_generators/household"
					className={"link btn grey t4 hero_buttons"}
				>
					Повернутись до побутових теплогенераторів
				</Link>
			</HeroSection>
			<HeatGeneratorForm formType={"create"} heatGeneratorType={HEAT_GENERATOR_TYPES[0]} />
		</>
	);
}
