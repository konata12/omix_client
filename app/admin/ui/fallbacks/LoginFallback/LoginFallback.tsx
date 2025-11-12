import styles from "./LoginFallback.module.scss";

export default function LoginFallback() {
	return (
		<div className={styles.container}>
			<h1 className={"container"}>Увійдіть в систему, зараз вас перенесе на сторінку логіну</h1>
		</div>
	);
}
