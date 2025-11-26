import { getIndexedDBForForm } from "@/app/services/admin/indexedDB.service";
import { getFileFromSignedURLAndSaveFileInIndexedDB } from "@/app/services/admin/response.service";
import { FormImageInputType, FormTypes } from "@/app/types/data/form.type";
import {
	HeatGeneratorResponseData,
	HeatGeneratorsCreateData,
	HeatGeneratorStringValuesEnum,
	HeatGeneratorsTypes,
} from "@/app/types/data/products/heat_generators/heat_generators.type";
import { ProductImagesValuesEnum, ProductImageValuesEnum } from "@/app/types/data/products/product.type";
import { clear, get } from "idb-keyval";

const nullableValues = [
	HeatGeneratorStringValuesEnum.FAN_MODEL,
	HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW,
];

// REQUEST
export const createHeatGeneratorFormData = async (
	data: HeatGeneratorsCreateData,
	formType: FormTypes,
) => {
	const store = getIndexedDBForForm(`${data.type}_heat_generators`, formType);
	console.log("data: ", data);

	try {
		const formData = new FormData();

		for (const key in data) {
			const value = data[key as keyof HeatGeneratorsCreateData];

			// don't add nullable values
			if (nullableValues.some((v) => v === key) && value === "") continue;
			if (key === ProductImageValuesEnum.CARD_IMAGE) {
				// if value is null error will be thrown
				const image = await get<File>(value as string, store);

				if (!(image instanceof File))
					throw Error("Помилка ФОТОКАРТКИ при створенні новини зображення");
				formData.append(key, image);
				continue;
			}
			if (key === ProductImagesValuesEnum.PRODUCT_IMAGES) {
				await Promise.all(
					(value as FormImageInputType[]).map(async (v) => {
						// if value is null error will be thrown
						const image = await get<File>(v as string, store);

						if (!(image instanceof File))
							throw Error("Помилка ФОТОКОЛАЖУ при створенні новини зображення");
						formData.append(key, image);
						return;
					}),
				);
				continue;
			}

			formData.append(key, value as string);
		}

		return formData;
	} catch (error) {
		console.error(error);
		throw Error("Помилка про створенні formData для виконання запиту");
	}
};

// RESPONSE
export async function parseHeatGeneratorResponse(
	type: HeatGeneratorsTypes,
	data: HeatGeneratorResponseData,
): Promise<HeatGeneratorResponseData> {
	// SAVE IMAGES IN INDEXEDDB
	const store = getIndexedDBForForm(`${type}_heat_generators`, "update");
	await clear(store);
	return {
		...data,
		[ProductImageValuesEnum.CARD_IMAGE]: await getFileFromSignedURLAndSaveFileInIndexedDB(
			data[ProductImageValuesEnum.CARD_IMAGE],
			store,
		),
		[ProductImagesValuesEnum.PRODUCT_IMAGES]: await Promise.all(
			data[ProductImagesValuesEnum.PRODUCT_IMAGES].map(async (image) => {
				return await getFileFromSignedURLAndSaveFileInIndexedDB(image, store);
			}),
		),
	};
}
