"use client";

import InputContainer from "@/app/common_ui/form_components/inputs/InputContainer/InputContainer";
import { fulfilled } from "@/app/services/admin/response.service";
import { login as loginAction } from "@/app/utils/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export default function Login() {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");

	const { accessToken, status, error } = useAppSelector(
		(state: RootState) => state.auth,
	);
	const dispatch = useAppDispatch();
	const router = useRouter();

	useEffect(() => {
		if (accessToken) {
			router.push("/admin");
		}
	}, [accessToken]);

	const formSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const response = await dispatch(loginAction({ login, password }));
		const isFulfilled = fulfilled(response.meta.requestStatus);
		console.log(isFulfilled);
		console.log(accessToken);

		if (isFulfilled || accessToken) {
			router.push("/admin");
		}
	};

	return (
		<div className={`${styles.container}`}>
			<h1>Вхід</h1>
			<form className={styles.form} onSubmit={formSubmit}>
				<InputContainer
					label={"Логін"}
					inputId={"login"}
					value={login}
					changeEvent={(e) => setLogin(e.target.value)}
					placeholder={"Введіть логін"}
					required={true}
					className={{
						inputContainer: styles.inputContainer,
						input: error.login ? "err" : "",
					}}
				/>
				<InputContainer
					label={"Пароль"}
					inputId={"password"}
					value={password}
					changeEvent={(e) => setPassword(e.target.value)}
					placeholder={"Введіть пароль"}
					required={true}
					className={{
						inputContainer: styles.inputContainer,
						input: error.login ? "err" : "",
					}}
				/>

				{status.login === "loading" && <p>Виконується вхід</p>}
				{error.login && <p className="error">{error.login.message}</p>}
				<button className={`btn blue xl ${styles.btn}`}>Увійти</button>
			</form>
		</div>
	);
}
