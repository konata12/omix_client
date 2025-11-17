"use client";

import { HEAT_GENERATOR_TYPES } from "@/app/admin/(provided_with_redux)/(pages)/products/heat_generators/constants";
import HeatGeneratorsList from "@/app/admin/ui/lists/HeatGeneratorsList/HeatGeneratorsList";
import HeroSection from "@/app/common_ui/sections/HeroSection/HeroSection";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function GrainDryersPage() {
	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();
	const page = searchParams.get("page");

	return (
		<>
			<HeroSection
				heading={"Промислові\n" + "теплогенератори"}
				description={"Керуйте каталогом цієї категорії"}
			>
				<Link href="/admin/products" className={"link btn grey t4 hero_buttons"}>
					Повернутись до редактору продукції
				</Link>
			</HeroSection>
			<HeatGeneratorsList type={HEAT_GENERATOR_TYPES[1]} />
		</>
	);
}
