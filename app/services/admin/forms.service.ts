export function parseNumberInput(value: string) {
	if (value === "") return value;
	return Number(value);
}
export function checkCheckboxInputValuesToValidate(data: Record<string, boolean>, key: string) {
	return data[key] === undefined ? false : !data[key];
}
