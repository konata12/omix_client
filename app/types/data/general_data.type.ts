import { FormInputError } from "@/app/types/data/form.type";
import { ErrorResponse, StatusType } from "@/app/types/data/response.type";

export interface GeneralDataValues {
	[GeneralDataStringValuesEnum.PHONE_NUMBER]: string;
	[GeneralDataStringValuesEnum.EMAIL]: string;
	[GeneralDataStringValuesEnum.ADDRESS]: string;
	[GeneralDataStringValuesEnum.GOOGLE_MAPS_URL]: string;
	[GeneralDataOptionalValuesEnum.YOUTUBE]: string;
	[GeneralDataOptionalValuesEnum.FACEBOOK]: string;
	[GeneralDataOptionalValuesEnum.INSTAGRAM]: string;
}
export interface GeneralDataResponseValues
	extends Omit<GeneralDataValues, GeneralDataOptionalValuesEnumType> {
	[GeneralDataOptionalValuesEnum.YOUTUBE]?: string;
	[GeneralDataOptionalValuesEnum.FACEBOOK]?: string;
	[GeneralDataOptionalValuesEnum.INSTAGRAM]?: string;
}
export interface GeneralDataRequestValues extends Partial<GeneralDataValues> {}

export interface GeneralData extends GeneralDataValues {
	checkboxes: {
		[GeneralDataOptionalValuesEnum.YOUTUBE]: boolean;
		[GeneralDataOptionalValuesEnum.FACEBOOK]: boolean;
		[GeneralDataOptionalValuesEnum.INSTAGRAM]: boolean;
	};
	error: {
		// data
		[GeneralDataStringValuesEnum.PHONE_NUMBER]: FormInputError;
		[GeneralDataStringValuesEnum.EMAIL]: FormInputError;
		[GeneralDataStringValuesEnum.ADDRESS]: FormInputError;
		[GeneralDataStringValuesEnum.GOOGLE_MAPS_URL]: FormInputError;
		[GeneralDataOptionalValuesEnum.YOUTUBE]: FormInputError;
		[GeneralDataOptionalValuesEnum.FACEBOOK]: FormInputError;
		[GeneralDataOptionalValuesEnum.INSTAGRAM]: FormInputError;
		// requests
		get: ErrorResponse | null;
		update: ErrorResponse | null;
	};
	status: {
		get: StatusType;
		update: StatusType;
	};
}

// ENUMS
export enum GeneralDataStringValuesEnum {
	PHONE_NUMBER = "phone_number",
	EMAIL = "email",
	ADDRESS = "address",
	GOOGLE_MAPS_URL = "google_maps_url",
}
export enum GeneralDataOptionalValuesEnum {
	YOUTUBE = "youtube",
	FACEBOOK = "facebook",
	INSTAGRAM = "instagram",
}

// ENUM TYPES
export type GeneralDataStringValuesEnumType = `${GeneralDataStringValuesEnum}`;
export type GeneralDataOptionalValuesEnumType = `${GeneralDataOptionalValuesEnum}`;
export type GeneralDataValuesEnumType =
	| GeneralDataStringValuesEnumType
	| GeneralDataOptionalValuesEnumType;
