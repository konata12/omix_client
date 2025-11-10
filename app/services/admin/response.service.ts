import {
	ErrorResponse,
	ParsingResponseErrorsEnum,
} from "@/app/types/data/response.type";
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
	return str.match(
		/[^/]+\.(?:png|jpe?g|webp|gif|bmp|svg|pdf|txt|zip|tar|gz|mp4|mp3)(?=\?)/,
	)?.[0];
}

export async function getFileNameFromSignedURLAndSaveBlobInIndexedDB(
	str: string,
	store: UseStore,
) {
	// GET FILENAME
	let fileName = getFileNameFromSignedURL(str);

	// Get the image as a Blob and save it if URL is correct
	if (str && fileName) {
		const response = await fetch(str);
		const blob = await response.blob();

		set(fileName, blob, store);
	}

	// IF SIGNED IS WRONG MAKE NAME ERROR
	if (!fileName) fileName = ParsingResponseErrorsEnum.GETNAMEFROMSIGNEDURL;
	return fileName;
}
