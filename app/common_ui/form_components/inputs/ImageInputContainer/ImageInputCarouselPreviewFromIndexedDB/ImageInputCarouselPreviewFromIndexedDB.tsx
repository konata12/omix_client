import ArrowBtn from "@/app/common_ui/buttons/ArrowBtn/ArrowBtn";
import ErrorBlock from "@/app/common_ui/ErrorBlock/ErrorBlock";
import { ImageInputPreviewCarouselBasic } from "@/app/common_ui/form_components/inputs/ImageInputContainer/ImageInputPreviewCarouselBasic/ImageInputPreviewCarouselBasic";
import { FormImageInputType, FormInputError } from "@/app/types/data/form.type";
import useEmblaCarousel from "embla-carousel-react";
import { UseStore } from "idb-keyval";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./ImageInputCarouselPreviewFromIndexedDB.module.scss";

interface ImageInputPreviewFromIndexedDBStyles {
	imagePreview?: string;
	image?: string;
	imageContainer?: string;
	caption?: string;
}

export interface ImageInputCarouselPreviewFromIndexedDBProps<T extends string> {
	imageNames: FormImageInputType[];
	store: UseStore;
	inputId: T;
	error: FormInputError;
	handleDelete: (index: number, field: T) => Promise<void>;
	className?: ImageInputPreviewFromIndexedDBStyles;
}

export function ImageInputCarouselPreviewFromIndexedDB<T extends string>({
	imageNames,
	store,
	inputId,
	error,
	handleDelete,
	className,
}: ImageInputCarouselPreviewFromIndexedDBProps<T>) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaRef, emblaApi] = useEmblaCarousel();

	useEffect(() => {
		if (!emblaApi) return;

		const onSelect = () => {
			setSelectedIndex(emblaApi.selectedScrollSnap());
		};

		// Run once initially
		onSelect();

		emblaApi.on("select", onSelect);
		return () => {
			emblaApi.off("select", onSelect);
		};
	}, [emblaApi]);

	// BUTTONS
	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const scrollStyles: React.CSSProperties = {
		width: imageNames.length > 1 ? `calc(100% / ${imageNames.length})` : 0,
		left: selectedIndex ? `calc(100% / ${imageNames.length} * ${selectedIndex})` : 0,
	};

	return (
		<div className={`${styles.imagePreview} ${className?.imagePreview || ""}`}>
			<ErrorBlock title={`Не правильне зображення:`} error={error} />

			<div className={styles.embla}>
				<div className={styles.embla_viewport} ref={emblaRef}>
					<div className={styles.embla_container}>
						{!imageNames.length ? (
							<ImageInputPreviewCarouselBasic
								imageName={null}
								store={store}
								className={{ imageContainer: styles.embla_slide }}
							/>
						) : (
							imageNames.map((image, index) => (
								<ImageInputPreviewCarouselBasic
									imageName={image}
									store={store}
									handleDelete={() => handleDelete(index, inputId)}
									className={{ imageContainer: styles.embla_slide }}
									key={index}
								/>
							))
						)}
					</div>
				</div>
				<div className={styles.buttons}>
					<ArrowBtn
						handleFunc={scrollPrev}
						directionLeft={true}
						unactive={imageNames.length <= 1 || selectedIndex === 0}
					/>
					<div className={styles.scroll}>
						<div className={styles.bar} style={scrollStyles}></div>
					</div>
					<ArrowBtn
						handleFunc={scrollNext}
						unactive={imageNames.length <= 1 || selectedIndex === imageNames.length - 1}
					/>
				</div>
			</div>

			<p className={`t4 semibold ${styles.caption} ${className?.caption || ""}`}>
				Попередній перегляд
			</p>
		</div>
	);
}
