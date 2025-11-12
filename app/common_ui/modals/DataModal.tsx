import { JSX } from "react";
import styles from "./modals.module.scss";

export interface ModalProps {
	active: boolean;
	title: string;
	closeHandler: () => void;
	children: React.ReactNode;
}

export default function DataModal({ active, title, closeHandler, children }: ModalProps): JSX.Element {
	return (
		<>
			{active && (
				<div className={styles.bg}>
					<div className={styles.container}>
						<div className={`${styles.header}`}>
							<h4>{title}</h4>
						</div>
						<div className={styles.content}>
							{children}
							<button className={`btn blue t4 ${styles.button}`} onClick={closeHandler}>
								Ок
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
