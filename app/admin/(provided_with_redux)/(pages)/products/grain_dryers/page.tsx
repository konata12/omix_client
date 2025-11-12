"use client";

import GrainDryersList from "@/app/admin/ui/lists/GrainDryersList/GrainDryersList";
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
				heading={"Зерносушильні\n" + "комплекси"}
				description={"Керуйте каталогом цієї категорії"}
			>
				<Link href="/admin/products" className={"link btn grey t4 hero_buttons"}>
					Повернутись до редактору продукції
				</Link>
			</HeroSection>
			<GrainDryersList />
		</>
	);
}
