import { fulfilled } from "@/app/services/admin/response.service";
import {
	Faq,
	FaqFormValuesEnumType,
	FaqValuesEnum,
} from "@/app/types/data/faq.type";
import { FormTypes } from "@/app/types/data/form.type";
import { useFormChangeCheck } from "@/app/utils/hooks/common/form/useFormChangeCheck";
import {
	formValidateErrorsData,
	useFormValidate,
} from "@/app/utils/hooks/common/form/useFormValidate";
import {
	clearForm,
	setFormValues,
	setInputErrorValue,
	setStringValue,
} from "@/app/utils/redux/general_data/faq/faqFormsSlice";
import {
	createFaq,
	setUpdateError,
	updateFaq,
} from "@/app/utils/redux/general_data/faq/faqSlice";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useEffect } from "react";

export function useFaqForm(form: FormTypes) {
	const { faqs } = useAppSelector((state: RootState) => state.faq);
	const { error, ...data } = useAppSelector(
		(state: RootState) => state.faqForms[form],
	);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { id } = useParams<{ id: string }>();

	// SET UPDATE FORM DEFAULT VALUES
	useEffect(() => {
		if (form === "update") {
			const data = getDataFromFaqs();

			dispatch(
				setFormValues({
					form,
					data: {
						...data,
						error: {
							[FaqValuesEnum.QUESTION]: { message: "" },
							[FaqValuesEnum.ANSWER]: { message: "" },
						},
					},
				}),
			);
		}
	}, [dispatch]);
	if (form === "update") {
		const oldData = getDataFromFaqs();
		useFormChangeCheck(oldData, data);
	}

	// INPUTS
	const handleInputChange = useCallback(
		<T extends HTMLInputElement | HTMLTextAreaElement>(
			e: ChangeEvent<T>,
			field: FaqFormValuesEnumType,
		) => {
			dispatch(
				setStringValue({
					value: e.target.value,
					form,
					field,
				}),
			);
			// disable input error
			dispatch(
				setInputErrorValue({
					message: "",
					form,
					field,
				}),
			);
			dispatch(setUpdateError(null));
		},
		[dispatch, form],
	);

	// SUBMIT
	const handleCreate = useCallback(
		async (data: Omit<Faq, "id">) => {
			const response = await dispatch(createFaq(data));
			const isFulfilled = fulfilled(response.meta.requestStatus);
			if (isFulfilled) {
				dispatch(clearForm(form));
				router.push("/admin/general_info");
			} else {
				(
					document.querySelector(`#submit_error`) as HTMLInputElement
				).scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
		},
		[dispatch, form],
	);
	const handleUpdate = useCallback(
		async (data: Omit<Faq, "id">) => {
			const response = await dispatch(updateFaq({ ...data, id }));
			const isFulfilled = fulfilled(response.meta.requestStatus);
			if (isFulfilled) {
				router.push("/admin/general_info");
			} else {
				(
					document.querySelector(`#submit_error`) as HTMLInputElement
				).scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
		},
		[dispatch, form, id],
	);
	const validateUpdateSameData = useCallback(
		(data: Omit<Faq, "id">, errorsData: formValidateErrorsData) => {
			if (form === "update") {
				const index = faqs.findIndex((faq) => `${faq.id}` === id);
				const { id: x, ...oldData } = faqs[index];

				if (_.isEqual(oldData, data)) {
					dispatch(
						setUpdateError("Дані ті самі, спочатку змініть значення"),
					);
					errorsData.push({ id: "submit_error" });
				}
			}
		},
		[dispatch, form],
	);
	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>, data: Omit<Faq, "id">) => {
			e.preventDefault();

			const { errorsData, scrollToError } = useFormValidate();
			const entries = Object.entries(data);

			// VALIDATE DATA
			entries.forEach((entry) => {
				// for strings
				if (!entry[1].length) {
					const field = entry[0] as FaqFormValuesEnumType;

					dispatch(
						setInputErrorValue({
							message: "Введіть значення",
							form,
							field,
						}),
					);
					errorsData.push({ id: field });
				}
			});

			// VALIDATE CHANGE IN UPDATE
			validateUpdateSameData(data, errorsData);

			// SCROLL TO ERROR INPUT AND FINISH EXECUTING
			if (scrollToError()) return;

			switch (form) {
				case "create":
					await handleCreate(data);
					break;

				case "update":
					await handleUpdate(data);
					break;
			}
		},
		[dispatch, form, id],
	);

	// HELPER
	function getDataFromFaqs() {
		const index = faqs.findIndex((faq) => `${faq.id}` === id);
		const { question, answer } = faqs[index];
		return { question, answer };
	}

	return {
		handleInputChange,
		handleSubmit,
	};
}
