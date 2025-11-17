import { FormImageInputType } from "@/app/types/data/form.type";
import { useGetImageUrlFromIndexedDBImage } from "@/app/utils/hooks/admin/indexedDB/useGetImageUrlFromIndexedDBImage";
import no_image from "@/public/svg/no_image.svg";
import { UseStore } from "idb-keyval";
import Image from "next/image";
import React, { useCallback } from "react";
import styles from "./ImageInputPreviewCarouselBasic.module.scss";

export interface ImageInputPreviewBasicStyles {
	imageContainer?: string;
}

export interface ImageInputPreviewBasicProps {
	imageName: FormImageInputType;
	store: UseStore;
	handleDelete?: () => void;
	className?: ImageInputPreviewBasicStyles;
}

export function ImageInputPreviewCarouselBasic({
	imageName,
	store,
	handleDelete,
	className,
}: ImageInputPreviewBasicProps) {
	const imageUrl = useGetImageUrlFromIndexedDBImage(imageName, store);

	const deleteImage = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault();
			console.log("zxc");

			if (handleDelete) handleDelete();
		},
		[imageName],
	);

	return (
		<div
			className={`
				${styles.imageContainer} 
				${imageUrl ? "" : styles.noImage} 
				${className?.imageContainer || ""} 
			`}
		>
			<Image
				src={imageUrl ? `${imageUrl}#${imageName}` : no_image}
				className={`${imageUrl ? "" : styles.noImage}`}
				alt={"Preview"}
				fill
			/>
			{imageName && (
				<div className={styles.cover}>
					<button className={`t4 bold ${styles.delete}`} onClick={deleteImage}>
						Видалити
					</button>
				</div>
			)}
		</div>
	);
}
