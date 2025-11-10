import { ErrorsResponsesBasic, StatusBasic } from "@/app/types/data/response.type";
import React from "react";
import styles from "./ListCard.module.scss";

interface ListCardErrorProps {
	error: ErrorsResponsesBasic;
	status: StatusBasic;
	notFoundMessage?: string;
	errorMessage?: string;
}

export default function ListCardError({
	error,
	status,
	notFoundMessage = "Немає даних",
	errorMessage = "Виникла помилка при отриманні даних",
}: ListCardErrorProps) {
	const statusCondition = status.getAll === "loading" || status.getAll === null;
	const errorUIMessage = (): string => {
		if (statusCondition) return "Завантаження...";

		if (error.getAll?.statusCode === 500) return errorMessage;
		if (error.getAll?.statusCode === 404 || status.delete === "succeeded") {
			return notFoundMessage;
		}

		return errorMessage;
	};
	return (
		<div className={`${styles.card}`}>
			<h4 className={`${statusCondition ? "" : "error"} ${styles.error}`}>
				{errorUIMessage()}
			</h4>
		</div>
	);
}
