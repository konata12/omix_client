interface InputSectionProps {
	title?: string;
	children?: React.ReactNode;
}

export default function ({ title, children }: InputSectionProps) {
	return (
		<div className={`df fdc gap_36 admin_cont`}>
			{title && <h4>{title}</h4>}
			{children}
		</div>
	);
}
