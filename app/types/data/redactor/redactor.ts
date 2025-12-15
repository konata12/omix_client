import { DraggableComponent } from "@/app/common_ui/animated_components/redactor/RedactorDraggableContainer/RedactorDraggableContainer"; // REDACTOR FORM DATA
import { FormImageInputType, FormInputError } from "@/app/types/data/form.type";

export type RedactorSlicesNamesType = "newsForms";

// REDACTOR  DATA
export interface RedactorFormElementBasicType extends DraggableComponent {}

// form data
export interface RedactorTitleFormData extends RedactorFormElementBasicType {
	[RedactorTitleDataEnum.TITLE]: string;
}
export interface RedactorParagraphFormData extends RedactorFormElementBasicType {
	[RedactorParagraphDataEnum.TEXT]: string;
}
export interface RedactorListFormData extends RedactorFormElementBasicType {
	[RedactorListDataEnum.NUMERABLE]: boolean;
	[RedactorListDataEnum.OPTIONS]: string[];
}
export interface RedactorImageFormData extends RedactorFormElementBasicType {
	[RedactorImageDataEnum.DESCRIPTION]: string;
	[RedactorImageDataEnum.IMAGE]: FormImageInputType;
}
// form errors
export interface RedactorTitleFormError {
	[RedactorTitleDataEnum.TITLE]: FormInputError;
}
export interface RedactorParagraphFormError {
	[RedactorParagraphDataEnum.TEXT]: FormInputError;
}
export interface RedactorListFormError {
	[RedactorListDataEnum.OPTIONS]: FormInputError[];
}
export interface RedactorImageFormError {
	[RedactorImageDataEnum.DESCRIPTION]: FormInputError;
	[RedactorImageDataEnum.IMAGE]: FormInputError;
}

export type RedactorFormDataErrorType =
	| RedactorTitleFormError
	| RedactorParagraphFormError
	| RedactorListFormError
	| RedactorImageFormError;
// redux form data
export interface RedactorTitleFormComponent {
	type: RedactorDataEnum.TITLES;
	data: RedactorTitleFormData;
	error: RedactorTitleFormError;
}
export interface RedactorParagraphFormComponent {
	type: RedactorDataEnum.PARAGRAPHS;
	data: RedactorParagraphFormData;
	error: RedactorParagraphFormError;
}
export interface RedactorListFormComponent {
	type: RedactorDataEnum.LISTS;
	data: RedactorListFormData;
	error: RedactorListFormError;
}
export interface RedactorImageFormComponent {
	type: RedactorDataEnum.IMAGES;
	data: RedactorImageFormData;
	error: RedactorImageFormError;
}

export type RedactorFormComponentsType =
	| RedactorTitleFormComponent
	| RedactorParagraphFormComponent
	| RedactorListFormComponent
	| RedactorImageFormComponent;

export interface RedactorFormComponentsData {
	[ReductorInFormEnum.REDACTOR]: RedactorFormComponentsType[];
}

// ENUMS
export enum ReductorInFormEnum {
	REDACTOR = "redactor",
}
export enum RedactorDataEnum {
	TITLES = "titles",
	PARAGRAPHS = "paragraphs",
	LISTS = "lists",
	IMAGES = "images",
}
export type RedactorDataEnumType = `${RedactorDataEnum}`;

export enum RedactorTitleDataEnum {
	TITLE = "title",
}
export enum RedactorParagraphDataEnum {
	TEXT = "text",
}
export enum RedactorListDataEnum {
	NUMERABLE = "numerable",
	OPTIONS = "options",
}
export enum RedactorImageDataEnum {
	DESCRIPTION = "description",
	IMAGE = "image",
}

export type RedactorTitleDataEnumType = `${RedactorTitleDataEnum}`;
export type RedactorParagraphDataEnumType = `${RedactorParagraphDataEnum}`;
export type RedactorListDataEnumType = `${RedactorListDataEnum}`;
export type RedactorImageDataEnumType = `${RedactorImageDataEnum}`;

export type ReductorFormComponentsDataEnumType =
	| RedactorTitleDataEnumType
	| RedactorParagraphDataEnumType
	| RedactorListDataEnumType
	| RedactorImageDataEnumType;
