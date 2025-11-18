"use client";

import { getIndexedDBForForm } from "@/app/services/admin/indexedDB.service";
import { FormTypes } from "@/app/types/data/form.type";
import { HeatGeneratorsTypes } from "@/app/types/data/products/heat_generators/heat_generators.type";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";

interface HeatGeneratorFormProps {
	formType: FormTypes;
	heatGeneratorType: HeatGeneratorsTypes;
}

export default function HeatGeneratorForm({ formType, heatGeneratorType }: HeatGeneratorFormProps) {
	const { error, checkboxes, ...data } = useAppSelector(
		(state: RootState) => state[`${heatGeneratorType}HeatGeneratorForms`][formType],
	);
	const requestError = useAppSelector(
		(state: RootState) => state.heatGenerator[heatGeneratorType].error,
	);

	const store = getIndexedDBForForm(`${heatGeneratorType}_heat_generators`, formType);

	return (
		<form
			className={`section admin container df fdc gap_24`}
			// onSubmit={(e) => handleSubmit(e, data)}
		></form>
	);
}
