import { get, UseStore } from "idb-keyval";
import { useEffect, useState } from "react";

export function useGetImageUrlFromIndexedDBImage(imageName: string | null, store: UseStore) {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchImage = async () => {
			if (imageName) {
				try {
					const imageFile = await get(imageName, store);
					if (isMounted && imageFile) {
						const newUrl = URL.createObjectURL(imageFile);
						setImageUrl(newUrl);
					}
				} catch (error) {
					console.error("Error loading image from IndexedDB:", error);
				}
			}
		};

		fetchImage();

		return () => {
			isMounted = false;
			if (imageUrl) {
				URL.revokeObjectURL(imageUrl); // Clean up the object URL
			}
		};
	}, [imageName, store]);

	return imageUrl;
}
