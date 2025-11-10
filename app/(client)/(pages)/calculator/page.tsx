import HeroSection from "@/app/common_ui/sections/HeroSection/HeroSection";

export default function Home() {
	return (
		<>
			<HeroSection
				heading={"Калькулятор"}
				description={
					"Обирайте просто — калькулятор обігріву приміщеннь або сушіння продукції \n" +
					"підкаже модель відповідно до ваших потреб! "
				}
			/>
		</>
	);
}
