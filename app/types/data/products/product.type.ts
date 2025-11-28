import { FormImageInputType } from "@/app/types/data/form.type";

export interface ProductImages {
	[ProductImageValuesEnum.CARD_IMAGE]: FormImageInputType;
	[ProductImagesValuesEnum.PRODUCT_IMAGES]: FormImageInputType[];
}

export enum ProductImageValuesEnum {
	CARD_IMAGE = "card_image",
}
export enum ProductImagesValuesEnum {
	PRODUCT_IMAGES = "product_images",
}

export type ProductImageValuesType = `${ProductImageValuesEnum}`;
export type ProductImagesValuesType = `${ProductImagesValuesEnum}`;
