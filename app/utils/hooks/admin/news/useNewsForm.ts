import { giveFileUniqNameKeepExtension } from "@/app/services/admin/files.service";
import { FormTypes } from "@/app/types/data/form.type";
import {
	NewsFormValuesEnumType,
	NewsImageValuesEnumType,
	NewsStringValuesEnumType,
} from "@/app/types/data/news";
import { IMAGES_EXTENSIONS } from "@/app/utils/constants/images";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { clearErrors, setInputErrorValue, setStringValue } from "@/app/utils/redux/news/newsFormsSlice";
import { setUpdateError } from "@/app/utils/redux/news/newsSlice";
import { RootState } from "@/app/utils/redux/store";
import { del, set, UseStore } from "idb-keyval";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect } from "react";

export function useNewsForm(form: FormTypes, store: UseStore) {
	const { data } = useAppSelector((state: RootState) => state.newsForms[form]);

	const dispatch = useAppDispatch();
	const router = useRouter();
	const { id } = useParams<{ id: string }>();

	// CLEAR FORM ERRORS
	useEffect(() => {
		dispatch(clearErrors(form));
	}, [dispatch]);

	// INPUTS
	// string
	const handleStringInputChange = useCallback(
		<T extends HTMLInputElement | HTMLTextAreaElement>(
			e: ChangeEvent<T>,
			field: NewsStringValuesEnumType,
		) => {
			const value = e.target.value;
			dispatch(setStringValue({ value, form, field }));
			clearInputError(field);
		},
		[dispatch, form],
	);
	// media
	const handleImageInputChange = useCallback(
		async (e: ChangeEvent<HTMLInputElement>, field: NewsImageValuesEnumType) => {
			const value = e.target.files;
			const oldValue = data[field];
			if (!value) return;
			const type = value[0].type.split("/")[1];

			// IF IMAGE IS NOT PNG SHOW ERROR
			if (!IMAGES_EXTENSIONS.includes(type)) {
				dispatch(
					setInputErrorValue({
						form,
						field,
						message: `Неправильний формат. Доступні формати: "jpg", "jpeg", "png", "webp", "bmp", "tiff", "svg", "avif", "ico"`,
					}),
				);
				(document.querySelector(`#${field}`) as HTMLInputElement).scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
				return;
			}

			const image = giveFileUniqNameKeepExtension(value[0]);

			// DELETE OLD IMAGE FROM INDEXEDDB
			if (oldValue) {
				await del(oldValue, store);
			}

			// SAVE NEW IMAGE TO INDEXEDDB
			await set(image.name, image, store);

			// SET NEW IMAGE NAME IN REDUX, IT WILL BE KEY TO FILE IN INDEXEDDB
			dispatch(
				setStringValue({
					value: image.name,
					form,
					field,
				}),
			);
			clearInputError(field);
		},
		[dispatch, form, data, store],
	);

	// HELPER
	function clearInputError(field: NewsFormValuesEnumType) {
		dispatch(
			setInputErrorValue({
				message: "",
				form,
				field,
			}),
		);
		dispatch(setUpdateError(null));
	}

	return {
		// INPUTS
		handleStringInputChange,
		handleImageInputChange,
	};
}
