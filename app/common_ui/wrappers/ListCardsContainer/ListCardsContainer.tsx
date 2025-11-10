import React from "react";
import styles from "./ListCardsContainer.module.scss";

interface ListCardsContainerProps {
	titles: string[];
	children: React.ReactNode;
	className?: string;
}

export default function ListCardsContainer({
	titles,
	children,
	className,
}: ListCardsContainerProps) {
	return (
		<div className={`container ${styles.container} ${className || ""}`}>
			<div className={`t4 bold ${styles.titles}`}>
				{titles.map((title, i) => (
					<p key={i}>{title}</p>
				))}
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
}
