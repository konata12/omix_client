import NewsForm from "@/app/admin/ui/forms/news/NewsForm";
import HeroSection from "@/app/common_ui/sections/HeroSection/HeroSection";
import Link from "next/link";

export default function NewsCreate() {
	return (
		<>
			<HeroSection heading={"Новина"} description={"Створіть або редагуйте новину"}>
				<Link href="/admin/news" className={"link btn grey t4 hero_buttons"}>
					Повернутись до редактору новин
				</Link>
			</HeroSection>
			<NewsForm formType={"create"} />
		</>
	);
}
