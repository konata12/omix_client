"use client";

import logo from "@/public/svg/logo_sm.svg";
import Image from "next/image";
import styles from "./Header.module.scss";

export function Header() {
	return (
		<header className={styles.header}>
			<div className={`container ${styles.container}`}>
				<Image src={logo} alt={"logo"} />
				<h5>Адмін-панель</h5>
			</div>
		</header>
	);
}
