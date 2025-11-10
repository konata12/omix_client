"use client";

import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { setFormDefaultValuesNavigation } from "@/app/utils/redux/navigation/navigationSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface SafeLinkProps {
	href: string;
	children: React.ReactNode;
	customHandleClick?: (e: any) => void;
	confirmMessage?: string;
	[key: string]: any;
}

export default function SafeLink({
	href,
	children,
	customHandleClick,
	confirmMessage = "Ви впевнені, що хочете покинути сторінку? Зміни не буде збережено.",
	...props
}: SafeLinkProps) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const formDefaultValues = useAppSelector(
		(state) => state.navigation.formDefaultValues,
	);

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		if (customHandleClick) customHandleClick(e);
		console.log(1);

		if (!formDefaultValues) {
			console.log(123);
			// Get the closest <a> element
			const linkElement = (e.target as HTMLElement).closest("a");
			if (!linkElement) return; // Safety check

			// check if link leads to the same page
			const linkUrl = linkElement.href;
			const currentUrl = window.location.href;
			if (linkUrl === currentUrl) return;

			const confirmed = window.confirm(confirmMessage);
			if (!confirmed) {
				e.preventDefault(); // Prevents navigation
				return;
			}
		}
		dispatch(setFormDefaultValuesNavigation(true)); // after leaving page set formDefaultValues in redux to initial
		router.push(href); // Navigate manually
	};

	return (
		<Link href={href} onClick={handleClick} {...props}>
			{children}
		</Link>
	);
}
