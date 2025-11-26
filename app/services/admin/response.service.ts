import { parseBlobToFileWithUniqName } from "@/app/services/admin/files.service";
import { ErrorResponse, ParsingResponseErrorsEnum } from "@/app/types/data/response.type";
import { AxiosError } from "axios";
import { set, UseStore } from "idb-keyval";

// CHECK IF ASYNC THUNK FULFILLED
export const fulfilled = (type: string) => {
	return type === "fulfilled";
};

export const reduxSerializeError = (error: unknown): ErrorResponse => {
	if (error instanceof AxiosError) {
		console.log(error);
		return {
			message: error.response?.data.message || "Unexpected client error",
			statusCode: error.status || 500,
		};
	}

	return {
		message: "Unexpected error occurred, end",
		statusCode: 500,
	};
};

export function getFileNameFromSignedURL(str: string) {
	const fileName = str.match(
		/[^/]+\.(?:png|jpe?g|webp|gif|bmp|svg|pdf|txt|zip|tar|gz|mp4|mp3)(?=\?)/,
	)?.[0];
	if (!fileName) throw new Error("Can't get file name from Signed URL");

	return fileName;
}

export async function getFileFromSignedURLAndSaveFileInIndexedDB(str: string, store: UseStore) {
	let fileName = getFileNameFromSignedURL(str);
	const response = await fetch(str);
	const blob = await response.blob();
	const { file, name } = parseBlobToFileWithUniqName(blob, fileName);

	await set(name, file, store);

	return name;
}
