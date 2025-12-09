import ArrowBtn from "@/app/common_ui/buttons/ArrowBtn/ArrowBtn";
import ErrorBlock from "@/app/common_ui/ErrorBlock/ErrorBlock";
import { ImageInputPreviewCarouselBasic } from "@/app/common_ui/form_components/inputs/ImageInputContainer/ImageInputPreviewCarouselBasic/ImageInputPreviewCarouselBasic";
import { FormImageInputType, FormInputError } from "@/app/types/data/form.type";
import useEmblaCarousel from "embla-carousel-react";
import { UseStore } from "idb-keyval";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
	const [selectedIndex, setSelectedIndex] = useState(0); // need this state to rerender when trigger onSelect event from embla
	const [emblaRef, emblaApi] = useEmblaCarousel();
	const l = useRef(0); // need this to not break scroll bar when deletinng last element

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
	useEffect(() => {
		l.current = imageNames.length;
	}, [imageNames]);

	// BUTTONS
	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	// todo try to understand why this function doesn't use new values of imageNames, when imageNames is changed
	const deleteImage = async (index: number) => {
		if (index + 1 >= l.current) emblaApi?.scrollPrev();
		await handleDelete(index, inputId);
	};

	const scrollStyles: React.CSSProperties = {
		width: imageNames.length > 1 ? `calc(100% / ${imageNames.length})` : 0,
		left: emblaApi?.selectedScrollSnap()
			? `calc(100% / ${imageNames.length} * ${emblaApi?.selectedScrollSnap()})`
			: 0,
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
									handleDelete={() => deleteImage(index)}
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
