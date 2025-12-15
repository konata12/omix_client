import React from "react";
import styles from "./ButtonWithUnderline.module.scss";

interface ButtonWithUnderlineProps {
	label: string;
	handleFunction: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
}

export default function ButtonWithUnderline({
	label,
	handleFunction,
	className = "",
}: ButtonWithUnderlineProps) {
	const [active, setActive] = React.useState(false);

	return (
		<button
			onClick={handleFunction}
			onMouseDown={() => setActive(true)}
			onMouseUp={() => setActive(false)}
			type="button"
			className={`${styles.btn} ${active ? styles.click : ""} ${className}`}
		>
			{label}
		</button>
	);
}
