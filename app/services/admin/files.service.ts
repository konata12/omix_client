import { v4 as uuid } from "uuid";

export function renameFile(file: File, newName: string): File {
	return new File([file], newName, {
		type: file.type,
		lastModified: file.lastModified,
	});
}

export function parseBlobToFileWithUniqName(blob: Blob, name: string) {
	const nameSplit = name.split(".");
	const extension = nameSplit[nameSplit.length - 1];
	const newName = `${uuid()}.${extension}`;
	const file = new File([blob], newName, {
		type: `image/${extension}`,
		lastModified: Date.now(),
	});
	return {
		file,
		name: newName,
	};
}

export function giveFileUniqNameKeepExtension(file: File): File {
	const name = `${uuid()}.${file.type.split("/")[1]}`;

	return renameFile(file, name);
}
