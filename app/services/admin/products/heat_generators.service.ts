import { getIndexedDBForForm } from "@/app/services/admin/indexedDB.service";
import { FormImageInputType } from "@/app/types/data/form.type";
import {
	HeatGeneratorImagesValuesEnum,
	HeatGeneratorImageValuesEnum,
	HeatGeneratorsCreateData,
	HeatGeneratorStringValuesEnum,
} from "@/app/types/data/products/heat_generators/heat_generators.type";
import { get } from "idb-keyval";

const nullableValues = [
	HeatGeneratorStringValuesEnum.FAN_MODEL,
	HeatGeneratorStringValuesEnum.YOUTUBE_REVIEW,
];

export const createHeatGeneratorFormData = async (data: HeatGeneratorsCreateData) => {
	const store = getIndexedDBForForm(`${data.type}_heat_generators`, "create");

	try {
		const formData = new FormData();

		for (const key in data) {
			const value = data[key as keyof HeatGeneratorsCreateData];

			// don't add nullable values
			if (nullableValues.some((v) => v === key) && value === "") continue;
			if (key === HeatGeneratorImageValuesEnum.CARD_IMAGE) {
				// if value is null error will be thrown
				const image = await get<File>(value as string, store);

				if (!(image instanceof File))
					throw Error("Помилка ФОТОКАРТКИ при створенні новини зображення");
				formData.append(key, image);
				continue;
			}
			if (key === HeatGeneratorImagesValuesEnum.PRODUCT_IMAGES) {
				await Promise.all(
					(value as FormImageInputType[]).map(async (v, i) => {
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
