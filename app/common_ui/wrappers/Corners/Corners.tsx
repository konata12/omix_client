import React from "react";
import styles from "./Corners.module.scss";

interface CornersProps {
	className?: string;
	children: React.ReactNode;
}

export default function Corners({ className, children }: CornersProps) {
	return (
		<div className={`${styles.container} ${className ? className : ""}`}>
			<div className={`${styles.corner} ${styles.top}`}></div>
			{children}
			<div className={`${styles.corner} ${styles.bottom}`}></div>
		</div>
	);
}
