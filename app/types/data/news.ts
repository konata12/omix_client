import { FormImageInputType } from "@/app/types/data/form.type";
import { RedactorFormComponentsData, ReductorInFormEnum } from "@/app/types/data/redactor/redactor";
import { ErrorResponse, ErrorsResponses, Status, StatusType } from "@/app/types/data/response.type";
import { AsFormInputError } from "@/app/types/generic.type";

export interface News {
	id: string;
	[NewsImageValuesEnum.IMAGE]: FormImageInputType;
	[NewsStringValuesEnum.TITLE]: string;
	[NewsStringValuesEnum.DESCRIPTION]: string;
	[NewsTimeValuesEnum.CREATEDAT]: string;
	[NewsBooleanValuesEnum.SELECTED]: boolean;
}
export interface NewsListData {
	id: string;
	[NewsStringValuesEnum.TITLE]: string;
	[NewsBooleanValuesEnum.SELECTED]: boolean;
}
export interface NewsData {
	news: NewsListData[];
	news_modal_is_open: boolean[];
	error: ErrorsResponses;
	status: Status;
}

// FETCHING
export interface NewsResponseData extends News {
	[NewsImageValuesEnum.IMAGE]: string;
}
// FORMS
export type NewsNotFormValues = "id" | NewsTimeValuesEnum.CREATEDAT | NewsBooleanValuesEnum.SELECTED;

export interface NewsFormErrors
	extends AsFormInputError<Omit<News, NewsNotFormValues | ReductorInFormEnum.REDACTOR>> {}
export interface NewsFormData extends Omit<News, NewsNotFormValues>, RedactorFormComponentsData {}
export interface NewsFormState {
	data: NewsFormData;
	error: NewsFormErrors;
	fetching: {
		status: {
			getOne: StatusType;
		};
		error: {
			getOne: ErrorResponse | null;
		};
	};
}
export interface NewsFormsState {
	create: NewsFormState;
	update: NewsFormState;
}

// ENUMS
export enum NewsStringValuesEnum {
	TITLE = "title",
	DESCRIPTION = "description",
}
export enum NewsImageValuesEnum {
	IMAGE = "image",
}
export enum NewsTimeValuesEnum {
	CREATEDAT = "createdAt",
}
export enum NewsBooleanValuesEnum {
	SELECTED = "selected",
}

// ENUM TYPES
export type NewsFormValuesEnumType = NewsStringValuesEnumType | NewsImageValuesEnumType;
export type NewsValuesEnumType =
	| NewsFormValuesEnumType
	| NewsBooleanValuesEnumType
	| NewsTimeValuesEnumType;

export type NewsStringValuesEnumType = `${NewsStringValuesEnum}`;
export type NewsImageValuesEnumType = `${NewsImageValuesEnum}`;
export type NewsBooleanValuesEnumType = `${NewsBooleanValuesEnum}`;
export type NewsTimeValuesEnumType = `${NewsTimeValuesEnum}`;
