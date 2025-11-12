import { ErrorResponse, ErrorsResponses, Status, StatusType } from "@/app/types/data/response.type";
import { AsFromInputError } from "@/app/types/generic.type";

export interface Faq {
	id: string;
	[FaqValuesEnum.QUESTION]: string;
	[FaqValuesEnum.ANSWER]: string;
}

export interface FaqData {
	faqs: Faq[];
	faqs_modal_is_open: boolean[];
	error: ErrorsResponses;
	status: Status;
}

// FORMS
export interface FaqFormState extends Omit<Faq, "id"> {
	error: AsFromInputError<Omit<Faq, "id">>;
}
export interface FaqFormsState {
	create: FaqFormState;
	update: FaqFormState;
}

// ENUMS
export enum FaqValuesEnum {
	QUESTION = "question",
	ANSWER = "answer",
}

// ENUM TYPES
export type FaqValuesEnumType = `${FaqValuesEnum}`;
export type FaqFormValuesEnumType = Exclude<FaqValuesEnumType, "id">;
