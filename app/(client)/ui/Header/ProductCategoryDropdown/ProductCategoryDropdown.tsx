import Link from "next/link";
import { useState } from "react";
import styles from "./ProductCategoryDropdown.module.scss";

export default function ProductCategoryDropdown() {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<button
			className={`not_show_m ${styles.btn}`}
			type="button"
			onClick={() => {
				setModalOpen(!modalOpen);
			}}
		>
			<div className={`t5 link semibold ${styles.header} ${modalOpen ? styles.active : ""}`}>
				<span>Наша продукція</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="13"
					height="8"
					viewBox="0 0 13 8"
					fill="none"
				>
					<path d="M0 1.58854L6.5 8L13 1.58854L11.3895 0L6.5 4.82292L1.61048 0L0 1.58854Z" />
				</svg>
			</div>
			<div className={`${styles.modal} ${modalOpen ? styles.active : ""}`}>
				<Link href={"/"} className={"t5 link semibold"}>
					Побутові теплогенератори
				</Link>
				<Link href={"/"} className={"t5 link semibold"}>
					Промислові теплогенератори
				</Link>
				<Link href={"/"} className={"t5 link semibold"}>
					Зерносушильні комплекси
				</Link>
			</div>
		</button>
	);
}
