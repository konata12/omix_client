export function parseNumberInput(value: string) {
	if (value === "") return value;
	return Number(value);
}
export function checkCheckboxInputValuesToValidate(data: Record<string, boolean>, key: string) {
	return data[key] === undefined ? false : !data[key];
}
export function filterRequestDataByCheckboxes<T extends string, K>(
	checkboxes: Partial<Record<T, boolean>>,
	data: Record<T, K>,
): Partial<Record<T, K>> {
	const result: Partial<Record<T, K>> = {};

	for (const key in data) {
		if (checkboxes[key] === false) continue;
		result[key] = data[key];
	}

	return result;
}
