"use client";

import LoginFallback from "@/app/admin/ui/fallbacks/LoginFallback/LoginFallback";
import { Header } from "@/app/admin/ui/Header/Header";
import BasicFooter from "@/app/common_ui/BasicFooter/BasicFooter";
import { fulfilled } from "@/app/services/admin/response.service";
import { refreshTokens } from "@/app/utils/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Admin({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { accessToken, status } = useAppSelector((state: RootState) => state.auth);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const pathname = usePathname();
	const isLoginPage = pathname === "/admin/login";

	const refreshTokensAndCheckIsLogin = async () => {
		const response = await dispatch(refreshTokens());
		const isFulfilled = fulfilled(response.meta.requestStatus);
		if (!isFulfilled) router.push("/admin/login");
	};

	useEffect(() => {
		if (accessToken) return;
		refreshTokensAndCheckIsLogin();
	}, []);

	return (
		<>
			<Header />
			<main
				className={!accessToken && !isLoginPage ? "admin_fallback_main" : ""}
			>
				{status.refresh === "loading" || status.refresh === null ? ( // when reloading page to not cause layout shift with <LoginFallback /> when authorized
					children
				) : !accessToken && !isLoginPage ? ( // if not authorized show fallback
					<LoginFallback />
				) : (
					children
				)}
			</main>
			<BasicFooter grid={true} mt={true} />
		</>
	);
}
