"use client";

import NewsList from "@/app/admin/ui/lists/NewsList/NewsList";
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
			<HeroSection heading={"Редактор новин"} description={"Керуйте новинами на сайті"}>
				<Link href="/admin" className={"link btn grey t4 hero_buttons"}>
					Повернутись на головну
				</Link>
			</HeroSection>
			<NewsList />
		</>
	);
}
