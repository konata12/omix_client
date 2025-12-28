import { giveFileUniqNameKeepExtension } from "@/app/services/admin/files.service";
import { FormTypes } from "@/app/types/data/form.type";
import {
	RedactorFormComponentsType,
	RedactorImageDataEnum,
	RedactorImageFormComponent,
	RedactorListDataEnum,
	RedactorListFormComponent,
	RedactorParagraphDataEnum,
	RedactorParagraphFormComponent,
	RedactorSlicesNamesType,
	RedactorTitleDataEnum,
	RedactorTitleFormComponent,
} from "@/app/types/data/redactor/redactor";
import { IMAGES_EXTENSIONS } from "@/app/utils/constants/images";
import { useRedactorSliceReducers } from "@/app/utils/hooks/admin/redactor/useRedactorSliceReducers";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { del, set, UseStore } from "idb-keyval";
import React, { useCallback } from "react";

interface BasicRedactorInputProps<
	T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
	N extends RedactorFormComponentsType,
> {
	e: React.ChangeEvent<T>;
	oldData: N;
	index: number;
}

interface RedactorListProps
	extends BasicRedactorInputProps<HTMLTextAreaElement, RedactorListFormComponent> {
	optionIndex: number;
}

interface RedactorImageProps<T extends HTMLInputElement | HTMLTextAreaElement>
	extends BasicRedactorInputProps<T, RedactorImageFormComponent> {
	key: `${RedactorImageDataEnum}`;
	store?: UseStore;
}

interface RedactorImageGGProps
	extends Omit<BasicRedactorInputProps<HTMLInputElement, RedactorImageFormComponent>, "e"> {}

export function useRedactorFormComponents(sliceName: RedactorSlicesNamesType, form?: FormTypes) {
	const { updateRedactorComponent, setRedactorComponentError } = useRedactorSliceReducers(
		sliceName,
		form,
	);
	const dispatch = useAppDispatch();

	const handleTitle = useCallback(
		({
			e,
			oldData,
			index,
		}: BasicRedactorInputProps<HTMLTextAreaElement, RedactorTitleFormComponent>) => {
			const value = e.target.value;
			const detailsComponent = structuredClone(oldData);

			// CLEAR ERROR ON INPUT
			if (value.length) {
				detailsComponent.error[RedactorTitleDataEnum.TITLE].message = "";
			}

			detailsComponent.data[RedactorTitleDataEnum.TITLE] = value;
			dispatch(updateRedactorComponent({ detailsComponent, index }));
		},
		[sliceName, form],
	);

	const handleParagraph = useCallback(
		({
			e,
			oldData,
			index,
		}: BasicRedactorInputProps<HTMLTextAreaElement, RedactorParagraphFormComponent>) => {
			const value = e.target.value;
			const detailsComponent = structuredClone(oldData);

			// CLEAR ERROR ON INPUT
			if (value.length) {
				detailsComponent.error[RedactorParagraphDataEnum.TEXT].message = "";
			}

			detailsComponent.data[RedactorParagraphDataEnum.TEXT] = value;
			dispatch(updateRedactorComponent({ detailsComponent, index }));
		},
		[sliceName, form],
	);

	const handleList = useCallback(
		({ e, oldData, index, optionIndex }: RedactorListProps) => {
			const value = e.target.value;
			const detailsComponent = structuredClone(oldData);

			// CLEAR ERROR ON INPUT
			if (value.length) {
				detailsComponent.error[RedactorListDataEnum.OPTIONS][optionIndex].message = "";
			}

			detailsComponent.data[RedactorListDataEnum.OPTIONS][optionIndex] = value;
			dispatch(updateRedactorComponent({ detailsComponent, index }));
		},
		[sliceName, form],
	);

	const handleImage = useCallback(
		async ({
			e,
			oldData,
			index,
			key,
			store,
		}: RedactorImageProps<HTMLInputElement | HTMLTextAreaElement>) => {
			const detailsComponent = structuredClone(oldData);

			switch (key) {
				case RedactorImageDataEnum.DESCRIPTION:
					const value = e.target.value;

					// CLEAR ERROR ON INPUT
					if (value.length) {
						detailsComponent.error[RedactorImageDataEnum.DESCRIPTION].message = "";
					}

					detailsComponent.data[RedactorImageDataEnum.DESCRIPTION] = value;

					break;
				case RedactorImageDataEnum.IMAGE:
					const FileList = (e as React.ChangeEvent<HTMLInputElement>).target.files;

					if (!store) {
					}

					if (FileList && FileList[0]) {
						const type = FileList[0].type.split("/")[1];

						// IF IMAGE IS NOT PNG SHOW ERROR
						if (!IMAGES_EXTENSIONS.includes(type)) {
							dispatch(
								setRedactorComponentError({
									index,
									error: {
										[RedactorImageDataEnum.DESCRIPTION]: { message: "" },
										[RedactorImageDataEnum.IMAGE]: {
											message: `Неправильний формат. Доступні формати: "jpg", "jpeg", "png", "webp", "bmp", "tiff", "svg", "avif", "ico"`,
										},
									},
								}),
							);
							return;
						}

						console.log("redactor handleImage");

						const image = giveFileUniqNameKeepExtension(FileList[0]);

						// DELETE OLD IMAGE FROM INDEXEDDB
						if (oldData.data[RedactorImageDataEnum.IMAGE]) {
							await del(oldData.data[RedactorImageDataEnum.IMAGE], store);
						}

						// SAVE NEW IMAGE TO INDEXEDDB
						await set(image.name, image, store);

						// CLEAR ERROR ON VALID INPUT
						detailsComponent.error[RedactorImageDataEnum.IMAGE].message = "";
						detailsComponent.data[RedactorImageDataEnum.IMAGE] = image.name;
					}
					break;
			}

			dispatch(updateRedactorComponent({ detailsComponent, index }));
		},
		[sliceName, form],
	);

	return {
		handleTitle,
		handleParagraph,
		handleList,
		handleImage,
	};
}

// const handleImage = useCallback(
// 	({ oldData, index }: RedactorImageGGProps) => {
// 		const detailsComponent = structuredClone(oldData);
//
// 		const description = ({ e }: { e: React.ChangeEvent<HTMLTextAreaElement> }) => {
// 			const value = e.target.value;
//
// 			// CLEAR ERROR ON INPUT
// 			if (value.length) {
// 				detailsComponent.error[RedactorImageDataEnum.DESCRIPTION].message = "";
// 			}
//
// 			detailsComponent.data[RedactorImageDataEnum.DESCRIPTION] = value;
// 			dispatch(updateRedactorComponent({ detailsComponent, index }));
// 		};
//
// 		const image = async ({
// 								 e,
// 								 store,
// 							 }: {
// 			e: React.ChangeEvent<HTMLInputElement>;
// 			store: UseStore;
// 		}) => {
// 			const FileList = e.target.files;
// 			if (!FileList) return;
//
// 			const type = FileList[0].type.split("/")[1];
//
// 			// IF IMAGE IS NOT PNG SHOW ERROR
// 			if (!IMAGES_EXTENSIONS.includes(type)) {
// 				dispatch(
// 					setRedactorComponentError({
// 						index,
// 						error: {
// 							[RedactorImageDataEnum.DESCRIPTION]: { message: "" },
// 							[RedactorImageDataEnum.IMAGE]: {
// 								message: `Неправильний формат. Доступні формати: "jpg", "jpeg", "png", "webp", "bmp", "tiff", "svg", "avif", "ico"`,
// 							},
// 						},
// 					}),
// 				);
// 				return;
// 			}
//
// 			const image = giveFileUniqNameKeepExtension(FileList[0]);
//
// 			// DELETE OLD IMAGE FROM INDEXEDDB
// 			if (oldData.data[RedactorImageDataEnum.IMAGE]) {
// 				await del(oldData.data[RedactorImageDataEnum.IMAGE], store);
// 			}
//
// 			// SAVE NEW IMAGE TO INDEXEDDB
// 			await set(image.name, image, store);
//
// 			// CLEAR ERROR ON VALID INPUT
// 			detailsComponent.error[RedactorImageDataEnum.IMAGE].message = "";
// 			dispatch(updateRedactorComponent({ detailsComponent, index }));
// 		};
//
// 		return {
// 			description,
// 			image,
// 		};
// 	},
// 	[sliceName, form],
// );
