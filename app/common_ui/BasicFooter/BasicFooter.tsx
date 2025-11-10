import logo from "@/public/svg/logo_big.svg";
import Image from "next/image";
import { JSX } from "react";
import styles from "./BasicFooter.module.scss";

interface BasicFooterProps {
	grid?: boolean;
	mt?: boolean;
}

export default function BasicFooter({ grid, mt }: BasicFooterProps): JSX.Element {
	return (
		<div
			className={`${styles.container} ${grid ? styles.grid : ""} ${mt ? styles.mt : ""}`}
		>
			<p className={`container`}>© 2025 ОМІКС. Всі права захищені.</p>
			<div className={`${styles.lineContainer}`}>
				<div className="ovf_hid">
					<span className={`${styles.line}`}></span>
				</div>
			</div>
			<Image className={styles.logo} src={logo} alt={"logo"} />
		</div>
	);
}
