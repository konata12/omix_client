import { GeneralDataRequestValues } from "@/app/types/data/general_data.type";

const basicUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchGeneralData() {
	const res = await fetch(`${basicUrl}/general/main`);

	const parsedData: GeneralDataRequestValues = await res.json();
	return parsedData;
}
