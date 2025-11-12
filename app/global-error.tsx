"use client";

import { Header } from "@/app/(client)/ui/Header/Header";
import { Header500 } from "@/app/(client)/ui/Header/Header500";
import BasicFooter from "@/app/common_ui/BasicFooter/BasicFooter";
import HeroSection from "@/app/common_ui/sections/HeroSection/HeroSection";
import { Geologica, IBM_Plex_Sans } from "next/font/google";
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
			<body className={`${geologica.variable} ${ibmPlexSans.variable} antialiased`}>
				<Header500 />
				<main>
					<HeroSection
						heading={"500"}
						description={
							"Сервер тимчасово недоступний.  Вибачте за незручності. \n" +
							"Будь ласка, оновіть сторінку або спробуйте пізніше"
						}
						error={true}
					/>
				</main>
				<BasicFooter />
			</body>
		</html>
	);
}
