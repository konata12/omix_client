import { FormInputError } from "@/app/types/data/form.type";

export type AsFromInputError<T> = {
	[K in keyof T]: FormInputError;
};
