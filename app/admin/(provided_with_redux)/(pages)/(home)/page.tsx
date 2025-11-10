"use client";

import ProductCategoryCard from "@/app/common_ui/cards/ProductCategoryCard/ProductCategoryCard";
import ResultModal from "@/app/common_ui/modals/ResultModal";
import HeroSection from "@/app/common_ui/sections/HeroSection/HeroSection";
import { logout as logoutAction } from "@/app/utils/redux/auth/authSlice";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import gear from "@/public/admin/gear.png";
import instruments from "@/public/admin/instruments.png";
import tablet from "@/public/admin/tablet.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.scss";

const cards = [
	{
		title: "Редактор \n продукції",
		image: instruments,
		imageAlt: "Інструменти",
		href: "/admin/products",
	},
	{
		title: "Редактор \n новин",
		image: tablet,
		imageAlt: "Табличка",
		href: "/admin/news ",
	},
	{
		title: "Загальна \n інформація",
		image: gear,
		imageAlt: "Шестерня",
		href: "/admin/general_info",
	},
];

export default function Admin() {
	const [logoutModalOpen, setLogoutModalOpen] = useState(false);

	const dispatch = useAppDispatch();
	const router = useRouter();

	const logout = () => {
		dispatch(logoutAction());
		router.push("/");
	};

	return (
		<>
			<HeroSection
				heading={"Вітаємо на головній сторінці!"}
				description={
					"Готові до роботи? Оберіть з чим працюватимемо сьогодні"
				}
			>
				<button
					className={"btn grey t4 hero_buttons"}
					type={"button"}
					onClick={() => setLogoutModalOpen(true)}
				>
					Покинути адмін-панель
				</button>
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
			<ResultModal
				active={logoutModalOpen}
				closeHandler={() => setLogoutModalOpen(false)}
				error={true}
			>
				<p>
					Ви дійсно бажаєте <span className={"semibold"}>покинути</span>{" "}
					адмін-панель?
				</p>
				<div className={styles.modalButtons}>
					<button
						className={`btn grey`}
						onClick={() => setLogoutModalOpen(false)}
					>
						Ні
					</button>
					<button className={`btn blue`} onClick={logout}>
						Так
					</button>
				</div>
			</ResultModal>
		</>
	);
}
