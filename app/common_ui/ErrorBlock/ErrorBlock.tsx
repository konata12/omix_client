import { FormInputError } from "@/app/types/data/form.type";
import { ErrorResponse } from "@/app/types/data/response.type";

interface ErrorBlockProps {
	title: string;
	error: FormInputError | null;
	className?: string;
	id?: string;
}

export default function ErrorBlock({ title, error, id, className }: ErrorBlockProps) {
	return (
		<>
			{!!error?.message.length && (
				<div className={`error t1 ${className || ""}`} id={id}>
					<p className={"h5 semibold"}>{title}</p>
					<p>{error.message}</p>
				</div>
			)}
		</>
	);
}
