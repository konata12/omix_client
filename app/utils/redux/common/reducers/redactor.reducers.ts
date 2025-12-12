import {
	RedactorFormComponentsData,
	RedactorFormComponentsType,
	RedactorFormDataErrorType,
	ReductorInFormEnum,
} from "@/app/types/data/redactor/redactor";

export const redactorReducers = {
	addDetailsComponent(
		state: RedactorFormComponentsData,
		action: {
			payload: RedactorFormComponentsType;
		},
	) {
		state[ReductorInFormEnum.REDACTOR].push(action.payload);
	},
	removeDetailsComponent(
		state: RedactorFormComponentsData,
		action: {
			payload: string;
		},
	) {
		state[ReductorInFormEnum.REDACTOR] = state[ReductorInFormEnum.REDACTOR].filter((component) => {
			return component.data.orderId !== action.payload;
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
