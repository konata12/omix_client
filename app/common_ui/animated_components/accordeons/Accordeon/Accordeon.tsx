import AnimatePresenceWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWithDynamicHeight/AnimatePresenceWithDynamicHeight";
import ArrowDropdown from "@/app/common_ui/buttons/ArrowBtn/ArrowDropdown";
import React from "react";
import styles from "./Accordeon.module.scss";

interface AccordeonProps {
	title: string;
	children?: React.ReactNode;
}

export default function Accordeon({ title, children }: AccordeonProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<div className={styles.accordeon}>
			<div className={styles.title_container}>
				<h4 className={styles.title}>{title}</h4>
				<ArrowDropdown directionTop={open} handleFunc={() => setOpen(!open)} />
			</div>
			<AnimatePresenceWithDynamicHeight
				childrenIsRendered={open}
				className={{
					absoluteContainer: styles.content,
				}}
			>
				{children}
			</AnimatePresenceWithDynamicHeight>
		</div>
	);
}
