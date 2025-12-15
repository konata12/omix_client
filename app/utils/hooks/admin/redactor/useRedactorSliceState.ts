import { FormTypes } from "@/app/types/data/form.type";
import {
	RedactorFormComponentsType,
	RedactorSlicesNamesType,
	ReductorInFormEnum,
} from "@/app/types/data/redactor/redactor";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";

export function useRedactorSliceState(sliceName: RedactorSlicesNamesType, formType?: FormTypes) {
	const form = formType ? formType : "create"; // need this to not use 'form' value in other forms than news

	// GET REDACTOR COMPONENTS DATA FROM SLICE
	let components: RedactorFormComponentsType[] = [];
	switch (sliceName) {
		case "newsForms":
			components = useAppSelector(
				(state: RootState) => state[sliceName][form].data[ReductorInFormEnum.REDACTOR],
			);
			break;
	}

	return components;
}
