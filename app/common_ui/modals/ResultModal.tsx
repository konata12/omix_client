import { ModalProps } from "@/app/common_ui/modals/DataModal";
import { JSX } from "react";
import styles from "./modals.module.scss";

interface ResultModalProps extends Omit<ModalProps, "title"> {
	title?: string;
	error?: boolean;
}

export default function ResultModal({
	active,
	title,
	closeHandler,
	children,
	error,
}: ResultModalProps): JSX.Element {
	return (
		<>
			{active && (
				<div className={styles.bg}>
					<div className={styles.container}>
						<div
							className={`${styles.header} ${styles[error ? "red" : "green"]}`}
						>
							<h4>{title || error ? "Увага!" : "Чудово!"}</h4>

							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="29"
								height="27"
								viewBox="0 0 29 27"
								onClick={closeHandler}
							>
								<rect
									width="29"
									height="3"
									transform="matrix(-0.701333 -0.712834 0.701333 -0.712834 23.8896 24.8778)"
								/>
								<rect
									width="29"
									height="3"
									transform="matrix(-0.701333 0.712834 -0.701333 -0.712834 25.5088 4.26746)"
								/>
							</svg>
						</div>
						<div className={styles.content}>{children}</div>
					</div>
				</div>
			)}
		</>
	);
}
