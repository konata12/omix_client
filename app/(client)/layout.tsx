import Footer from "@/app/(client)/ui/Footer/Footer";
import { Header } from "@/app/(client)/ui/Header/Header";

export default function ClientLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
