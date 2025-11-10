import React from "react";
import styles from "./ListCard.module.scss";

export default function ListCard({ children }: { children: React.ReactNode }) {
	return <div className={styles.card}>{children}</div>;
}
