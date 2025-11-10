interface InputSectionProps {
	title: string;
	children?: React.ReactNode;
}

export default function ({ title, children }: InputSectionProps) {
	return (
		<div className={`df fdc gap_36 admin_cont`}>
			<h3>{title}</h3>
			{children}
		</div>
	);
}
