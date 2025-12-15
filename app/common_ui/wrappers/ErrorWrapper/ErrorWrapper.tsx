import React from "react";
import styles from "./ErrorWrapper.module.scss";

interface ErrorWrapperProps {
	error?: string;
	children: React.ReactNode;
	className?: {
		wrapper?: string;
		error?: string;
	};
}

export default function ErrorWrapper({ error, children, className }: ErrorWrapperProps) {
	const isError = !!(error && !!error.length);
	console.log(isError);
	return (
		<div className={`${styles.wrapper} ${isError ? styles.error : ""} ${className?.wrapper || ""}`}>
			{children}
			{isError && <p className={`t5 error ${className?.error || ""}`}>{error}</p>}
		</div>
	);
}
