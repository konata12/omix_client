import ArrowBlock from "@/app/common_ui/buttons/ArrowBtn/ArrowBlock";
import dragon from "@/public/svg/dragon_energy.svg";
import logo from "@/public/svg/series_logo.svg";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import styles from "./ProductCategoryCard.module.scss";

interface ProductCategoryCardProps {
	title: string;
	image: string | StaticImageData;
	imageAlt: string;
	href: string;
	product?: "heat generator" | "grain dryer";
}

export default function ProductCategoryCard({
	title,
	image,
	imageAlt,
	href,
	product,
}: ProductCategoryCardProps) {
	return (
		<article>
			<Link href={href} className={`dc`} passHref>
				<div className={styles.card}>
					<div className={styles.topBar}>
						<h4>{title}</h4>
						<ArrowBlock className={styles.arrow} />
					</div>
					{product && (
						<p className={styles.description}>
							<span className={`t4 bold`}>Серія</span>
							{product === "heat generator" ? (
								<span className={`t5 ${styles.series}`}>
									Дракон-Енергія
									<Image src={dragon} alt={""} />
								</span>
							) : (
								<span
									className={`t5 ${styles.series} ${styles.logo}`}
								>
									<Image src={logo} alt={""} />
									ОМІКС
								</span>
							)}
						</p>
					)}
					<div className={styles.imageContainer}>
						<Image src={image} alt={imageAlt} />
					</div>
				</div>
			</Link>
		</article>
	);
}
