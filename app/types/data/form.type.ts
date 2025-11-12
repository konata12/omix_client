import { ErrorBase } from "@/app/types/data/response.type";

export interface FormInputError extends ErrorBase {}
export type FormTypes = "create" | "update";

// INPUTS
export type NotStepperValue = number | "";
