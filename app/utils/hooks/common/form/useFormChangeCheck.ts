import { useAppDispatch } from "@/app/utils/redux/hooks";
import { setFormDefaultValuesNavigation } from "@/app/utils/redux/navigation/navigationSlice";
import _ from "lodash";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export function useFormChangeCheck(oldValue: any, newValue: any) {
	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const isFormDefaultRef = useRef(true);

	// Memoized function to update both ref and Redux state
	const updateFormState = useCallback(
		(isDefault: boolean) => {
			isFormDefaultRef.current = isDefault;
			dispatch(setFormDefaultValuesNavigation(isDefault));
		},
		[dispatch],
	);

	// Combined effect for form comparison and pathname changes
	useEffect(() => {
		const isDefault = _.isEqual(oldValue, newValue);
		// console.log("newValue", newValue);
		// console.log("oldValue", oldValue);
		// console.log("isDefault", isDefault);
		updateFormState(isDefault);

		// Setup beforeunload listener
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (!isFormDefaultRef.current) {
				e.preventDefault();
				e.returnValue = "";
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
			// Reset to default when dependencies change or unmount
			updateFormState(true);
		};
	}, [newValue, oldValue, pathname, updateFormState]);
}
