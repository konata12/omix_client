import React, { useEffect, useRef } from "react";

interface AutoResizingTextareaProps {
	minRows?: number;
	maxRows?: number;
	style?: React.CSSProperties;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	[key: string]: any;
}

export default function AutoResizingTextarea({
	minRows = 1,
	maxRows = 1000,
	style,
	value,
	onChange,
	...props
}: AutoResizingTextareaProps) {
	const internalRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const textarea = internalRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			const styles = getComputedStyle(textarea);
			const scrollHeight = textarea.scrollHeight;
			const lineHeight = parseFloat(styles.lineHeight);

			const paddingTop = parseFloat(styles.paddingTop);
			const paddingBottom = parseFloat(styles.paddingBottom);
			const vertPadding = paddingTop + paddingBottom;

			const borderTop = parseFloat(styles.borderTopWidth);
			const borderBottom = parseFloat(styles.borderBottomWidth);
			const vertBorder = borderTop + borderBottom;

			const rows = Math.min(
				maxRows,
				Math.max(minRows, Math.floor((scrollHeight - vertPadding) / lineHeight)),
			);
			textarea.style.height = `${rows * lineHeight + vertPadding + vertBorder}px`;
			textarea.style.minHeight = `${minRows * lineHeight + vertPadding + vertBorder}px`;
		}
	}, [value, minRows, maxRows]);

	return (
		<textarea
			ref={internalRef}
			style={{
				resize: "none",
				overflow: "hidden",
				...style,
			}}
			rows={minRows}
			onChange={onChange}
			value={value}
			{...props}
		/>
	);
}
