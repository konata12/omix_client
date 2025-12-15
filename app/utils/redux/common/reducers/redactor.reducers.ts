interface RedactorInState {
	create: {
		data: RedactorFormComponentsData;
	};
	update: {
		data: RedactorFormComponentsData;
	};
}

import { FormTypes } from "@/app/types/data/form.type";
import {
	RedactorFormComponentsData,
	RedactorFormComponentsType,
	RedactorFormDataErrorType,
	ReductorInFormEnum,
} from "@/app/types/data/redactor/redactor";

export const redactorReducers = {
	addRedactorComponent(
		state: RedactorInState,
		action: {
			payload: { data: RedactorFormComponentsType; form: FormTypes };
		},
	) {
		const { data, form } = action.payload;
		state[form].data[ReductorInFormEnum.REDACTOR].push(data);
	},
	removeRedactorComponent(
		state: RedactorInState,
		action: {
			payload: { orderId: string; form: FormTypes };
		},
	) {
		const { orderId, form } = action.payload;
		state[form].data[ReductorInFormEnum.REDACTOR] = state[form].data[
			ReductorInFormEnum.REDACTOR
		].filter((component) => {
			return component.data.orderId !== orderId;
		});
	},
	updateDetailsComponent(
		state: RedactorFormComponentsData,
		action: {
			payload: {
				detailsComponent: RedactorFormComponentsType;
				index: number;
			};
		},
	) {
		const index = action.payload.index;

		state[ReductorInFormEnum.REDACTOR][index] = action.payload.detailsComponent;
	},
	setDetailsStateOrder(
		state: RedactorFormComponentsData,
		action: {
			payload: RedactorFormComponentsType[];
		},
	) {
		state[ReductorInFormEnum.REDACTOR] = action.payload;
	},
	setDetailsComponentError(
		state: RedactorFormComponentsData,
		action: {
			payload: {
				error: RedactorFormDataErrorType;
				index: number;
			};
		},
	) {
		const index = action.payload.index;

		state[ReductorInFormEnum.REDACTOR][index].error = action.payload.error;
	},
};
