import Corners from "@/app/common_ui/wrappers/Corners/Corners";
import React from "react";
import styles from "./HeroSection.module.scss";

interface HeroSectionProps {
	heading: string;
	description: string;
	error?: boolean;
	children?: React.ReactNode;
}

export default function HeroSection({
	heading,
	description,
	error = false,
	children,
}: HeroSectionProps) {
	return (
		<section className={`section  ${styles.heroSection}`}>
			<div className={`container ${styles.flexContainer}`}>
				<Corners className={styles.container}>
					<h1 className={`${error ? "errorNum" : ""}`}>{heading}</h1>
					<p className={styles.description}>{description}</p>
					{children}
				</Corners>
			</div>
		</section>
	);
}
