import Footer from "@/app/(client)/ui/Footer/Footer";
import { Header } from "@/app/(client)/ui/Header/Header";
import HeroSection from "@/app/common_ui/sections/HeroSection/HeroSection";
import { Geologica, IBM_Plex_Sans } from "next/font/google";
import Link from "next/link";
import "./styles/index.scss";

// todo add fallback fonts
const geologica = Geologica({
	weight: "800",
	variable: "--font-geologica",
	subsets: ["cyrillic-ext", "latin-ext"],
});

const ibmPlexSans = IBM_Plex_Sans({
	weight: ["400", "600", "700"],
	variable: "--font-ibm_plex_sans",
	subsets: ["cyrillic-ext", "latin-ext"],
});

export default function ClientLayout() {
	return (
		<html lang="en">
			<body
				className={`${geologica.variable} ${ibmPlexSans.variable} antialiased`}
			>
				<Header />
				<main>
					<HeroSection
						heading={"404"}
						description={
							"Сторінку не знайдено. На жаль ми не знайшли сторінку, \n" +
							"яку ви шукаєте. Поверніться на головну"
						}
						error={true}
					>
						<Link href={"/"} className={"btn grey link hero_buttons"}>
							Покинути адмін-панель
						</Link>
					</HeroSection>
				</main>
				<Footer />
			</body>
		</html>
	);
}
