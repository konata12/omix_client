import { getIndexedDBStoreForForm } from "@/app/services/admin/indexedDB.service";
import { getFileFromSignedURLAndSaveFileInIndexedDB } from "@/app/services/admin/response.service";
import { FormImageInputType, FormTypes } from "@/app/types/data/form.type";
import {
	GrainDryer,
	GrainDryerResponseData,
} from "@/app/types/data/products/grain_dryers/grain_dryers.type";
import { HeatGeneratorStringValuesEnum } from "@/app/types/data/products/heat_generators/heat_generators.type";
import { ProductImagesValuesEnum, ProductImageValuesEnum } from "@/app/types/data/products/product.type";
import { clear, get } from "idb-keyval";

const nullableValues = [HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW];

// REQUEST
export const createGrainDryerFormData = async (
	data: Partial<Omit<GrainDryer, "id">>,
	formType: FormTypes,
) => {
	const store = getIndexedDBStoreForForm(`grain_dryers`, formType);
	console.log("data: ", data);

	try {
		const formData = new FormData();

		for (const key in data) {
			const value = data[key as keyof Omit<GrainDryer, "id">];

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
			// FormImageInputType[] is only for images, so here item will be string only
			if (Array.isArray(value)) {
				value.forEach((item, i) => {
					formData.append(`${key}[${i}]`, item as string);
				});
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
export async function parseGrainDryerResponse(
	data: GrainDryerResponseData,
): Promise<GrainDryerResponseData> {
	// SAVE IMAGES IN INDEXEDDB
	const store = getIndexedDBStoreForForm(`grain_dryers`, "update");
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
