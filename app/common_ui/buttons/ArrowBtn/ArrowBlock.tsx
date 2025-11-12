import styles from "./ArrowBtn.module.scss";

interface ArrowBlockProps {
	className?: string;
	directionLeft?: boolean;
	unactive?: boolean;
}

export default function ArrowBlock({ className, unactive, directionLeft }: ArrowBlockProps) {
	return (
		<span
			className={`btn blue ${unactive ? "unactive" : ""} ${styles.btn} ${styles.block} ${className || ""}`}
		>
			<svg
				className={directionLeft ? styles.left : ""}
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="26"
				viewBox="0 0 16 26"
				fill="none"
			>
				<path
					d="M3.17708 25.6458L16 12.8229L3.17708 0L0 3.17708L9.64584 12.8229L0 22.4688L3.17708 25.6458Z"
					fill="#F3F8F9"
				/>
			</svg>
		</span>
	);
}
