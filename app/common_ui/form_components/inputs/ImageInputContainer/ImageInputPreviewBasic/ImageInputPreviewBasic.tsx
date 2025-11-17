import { FormImageInputType, FormInputError } from "@/app/types/data/form.type";
import { useGetImageUrlFromIndexedDBImage } from "@/app/utils/hooks/admin/indexedDB/useGetImageUrlFromIndexedDBImage";
import no_image from "@/public/svg/no_image.svg";
import { UseStore } from "idb-keyval";
import Image from "next/image";
import React from "react";
import styles from "./ImageInputPreviewBasic.module.scss";

export interface ImageInputPreviewBasicStyles {
	imageContainer?: string;
}

export interface ImageInputPreviewBasicProps {
	imageName: FormImageInputType;
	size: "small" | "big";
	store: UseStore;
	error: FormInputError;
	className?: ImageInputPreviewBasicStyles;
}

export function ImageInputPreviewBasic({
	imageName,
	size,
	store,
	error,
	className,
}: ImageInputPreviewBasicProps) {
	const imageUrl = useGetImageUrlFromIndexedDBImage(imageName, store);
	const errorForStyle = error && error.message;

	return (
		<div
			className={`
				${styles.imageContainer} 
				${imageUrl ? "" : styles.noImage} 
				${styles[size]} 
				${className?.imageContainer || ""} 
				${errorForStyle ? styles.error : ""}
			`}
		>
			<Image
				src={imageUrl || no_image}
				className={`${imageUrl ? "" : styles.noImage}`}
				alt={"Preview"}
				fill
			/>
		</div>
	);
}
