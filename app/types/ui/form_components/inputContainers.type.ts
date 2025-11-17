export type FormElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export type ChangeEvent<T extends FormElements> = (e: React.ChangeEvent<T>) => void;
export interface InputContainerWithChangeEventProps<T extends FormElements> {
	changeEvent?: ChangeEvent<T>;
}

// GENERAL
export interface InputContainerBasicStyles {
	inputContainer?: string;
	label?: string;
	error?: string;
}

export interface InputOptionalProps {
	required?: boolean;
	placeholder?: string;
}
