import styles from "./ArrowBtn.module.scss";

interface ArrowBtnProps {
	directionLeft?: boolean;
	unactive?: boolean;
	handleFunc?: () => void;
}

export default function ArrowBtn({
	unactive,
	directionLeft,
	handleFunc,
}: ArrowBtnProps) {
	return (
		<button
			className={`btn blue ${unactive ? "unactive" : ""} ${styles.btn}`}
			type={"button"}
			onClick={handleFunc}
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
		</button>
	);
}
