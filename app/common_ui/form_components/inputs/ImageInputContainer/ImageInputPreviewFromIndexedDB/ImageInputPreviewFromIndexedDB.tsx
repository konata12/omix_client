import ErrorBlock from "@/app/common_ui/ErrorBlock/ErrorBlock";
import {
	ImageInputPreviewBasic,
	ImageInputPreviewBasicProps,
	ImageInputPreviewBasicStyles,
} from "@/app/common_ui/form_components/inputs/ImageInputContainer/ImageInputPreviewBasic/ImageInputPreviewBasic";
import React from "react";
import styles from "./ImageInputPreviewFromIndexedDB.module.scss";

interface ImageInputPreviewFromIndexedDBStyles extends ImageInputPreviewBasicStyles {
	imagePreview?: string;
	image?: string;
	caption?: string;
}

export interface ImageInputPreviewFromIndexedDBProps extends Omit<ImageInputPreviewBasicProps, "size"> {
	size?: "small" | "big";
	inputId: string;
	className?: ImageInputPreviewFromIndexedDBStyles;
}

export function ImageInputPreviewFromIndexedDB({
	imageName,
	size = "small",
	store,
	error,
	className,
}: ImageInputPreviewFromIndexedDBProps) {
	return (
		<div className={`${styles.imagePreview} ${className?.imagePreview || ""}`}>
			<ErrorBlock title={`Не правильне зображення:`} error={error} />

			<ImageInputPreviewBasic imageName={imageName} size={size} store={store} error={error} />

			<p className={`t4 semibold ${styles.caption} ${className?.caption || ""}`}>
				Попередній перегляд
			</p>
		</div>
	);
}
