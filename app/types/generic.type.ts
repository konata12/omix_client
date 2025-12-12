import { FormInputError } from "@/app/types/data/form.type";

export type AsFormInputError<T> = {
	[K in keyof T]: FormInputError;
};
