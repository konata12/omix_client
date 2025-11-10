import styles from "./Title.module.scss";

interface TitleProps {
	contrast?: boolean;
	type?: "news" | "h3" | "h4";
	title: string;
	description: string;
}

export default function Title({ contrast, type, title, description }: TitleProps) {
	const titleClass = `${contrast ? styles.contrast : ""}`;
	let renderedTitle = <h2 className={titleClass}>{title}</h2>;

	switch (type) {
		case "h3":
			{
				renderedTitle = <h3 className={titleClass}>{title}</h3>;
			}
			break;

		case "h4":
			{
				renderedTitle = <h4 className={titleClass}>{title}</h4>;
			}
			break;
	}

	return (
		<div
			className={`${styles.container} ${type ? styles[type] : ""} ${contrast ? styles.contrast : ""}`}
		>
			{renderedTitle}
			<p className={"t1"}>{description}</p>
		</div>
	);
}
