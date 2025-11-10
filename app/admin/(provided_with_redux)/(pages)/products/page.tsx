"use client";

import ProductCategoryCard from "@/app/common_ui/cards/ProductCategoryCard/ProductCategoryCard";
import HeroSection from "@/app/common_ui/sections/HeroSection/HeroSection";
import grain_dryer from "@/public/admin/grain_dryer.png";
import household_heat_generator from "@/public/admin/household_heat_generator.png";
import industrial_heat_generator from "@/public/admin/industrial_heat_generator.png";
import Link from "next/link";
import styles from "./page.module.scss";

const cards = [
	{
		title: "Побутові теплогенератори",
		image: household_heat_generator,
		imageAlt: "Тепло генератор",
		href: "/admin/products",
	},
	{
		title: "Промислові теплогенератори",
		image: industrial_heat_generator,
		imageAlt: "Тепло генератор",
		href: "/admin/products ",
	},
	{
		title: "Зерносушильні комплекси ",
		image: grain_dryer,
		imageAlt: "Сушильний комплекс",
		href: "/admin/products/grain_dryers",
	},
];

export default function Admin() {
	return (
		<>
			<HeroSection
				heading={"Редактор продукції"}
				description={
					"Оберіть категорію продукції, щоб перейти до створення чи редагування товарів"
				}
			>
				<Link href="/admin" className={"link btn grey t4 hero_buttons"}>
					Повернутись на головну
				</Link>
			</HeroSection>
			<nav className={`section admin container ${styles.nav}`}>
				{cards.map((card, i) => (
					<ProductCategoryCard
						key={i}
						title={card.title}
						image={card.image}
						imageAlt={card.imageAlt}
						href={card.href}
					/>
				))}
			</nav>
		</>
	);
}
