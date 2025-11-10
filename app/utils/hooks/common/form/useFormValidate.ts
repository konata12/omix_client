export type formValidateErrorsData = {
	id: string;
}[];

export function useFormValidate() {
	const errorsData: formValidateErrorsData = [];

	// SCROLL TO ERROR INPUT AND FINISH EXECUTING
	const scrollToError = () => {
		if (errorsData.length) {
			console.log(`#${errorsData[0].id}`);
			(
				document.querySelector(`#${errorsData[0]?.id}`) as HTMLInputElement
			)?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
			return true;
		}

		return false;
	};

	return {
		errorsData,
		scrollToError,
	};
}
