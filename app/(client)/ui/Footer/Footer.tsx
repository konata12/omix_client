import BasicFooter from "@/app/common_ui/BasicFooter/BasicFooter";
import { fetchGeneralData } from "@/app/services/server/fetch_data.service";
import Link from "next/link";
import styles from "./Footer.module.scss";

export default async function Footer() {
	const { phone_number, email, address, google_maps_url, ...social } =
		await fetchGeneralData();
	const { youtube, facebook, instagram } = social;

	return (
		<footer className={`${styles.footer}`}>
			<div className={`container ${styles.content}`}>
				<div className={`${styles.contact}`}>
					<h3>Розпочни сушильний сезон із перевагою</h3>
					<p>
						Отримайте індивідуальну пропозицію на твердопаливні
						теплогенератори та сушильні комплекси — рішення, що дійсно
						працюють.
					</p>
					<address>
						<div className={styles.call}>
							<Link href="/contact_us" className={`dc`}>
								<button
									className={`t4 btn blue bold`}
									type={"button"}
								>
									Залишити заявку
								</button>
							</Link>
							<div className={styles.numberContainer}>
								<span>або телефонуйте:</span>
								<Link
									href={`tel:${phone_number}`}
									className={`t4 link bold`}
								>
									<span>{phone_number}</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										viewBox="0 0 18 18"
										fill="none"
									>
										<path d="M18 3.50125L17.9933 3.50699L16.8843 8.45314L8.72394 16.8249L8.58041 16.8575L8.57945 16.8565L3.50699 17.9933L3.50125 18L0 14.5868L2.88788 11.6233L2.88884 11.6195L3.67253 10.8157L7.30296 12.1372L12.1372 7.30296L10.8281 3.70698L11.7219 2.79028L14.5868 0L18 3.50125Z" />
										<path d="M5.22939 8.03307H3.79693V0.930094H5.22939V8.03307Z" />
										<path d="M8.09622 6.8494H6.6628V2.11376H8.09622V6.8494Z" />
										<path d="M2.36351 5.66573H0.930094V3.29743H2.36351V5.66573Z" />
									</svg>
								</Link>
							</div>
						</div>
						<div className={styles.bottomAddress}>
							<Link
								href={`${google_maps_url}`}
								target="_blank"
								className={`t4 link bold`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="17"
									viewBox="0 0 18 17"
									fill="none"
								>
									<path d="M18 7.25903V8.76562H16.298V17H11.0039V11.6875H6.76861V17H1.47449V8.76562H0V7.07849L8.88626 0L18 7.25903Z" />
								</svg>
								<span>{address}</span>
							</Link>
							<Link
								href={`mailto:${email}`}
								className={`t4 link bold`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="13"
									viewBox="0 0 18 13"
									fill="none"
								>
									<path d="M16.8604 12.25H1.13965L6.41602 6.69434L9 8.9082L9.3252 8.62988L11.582 6.69434L16.8604 12.25Z" />
									<path d="M5.65527 6.04199L0 11.9971V1.19434L5.65527 6.04199Z" />
									<path d="M18 11.9971L12.3428 6.04199L18 1.19434V11.9971Z" />
									<path d="M9 7.59082L0.143555 0H17.8564L9 7.59082Z" />
								</svg>
								<span>omiksternopil@gmail.com</span>
							</Link>
						</div>
					</address>
				</div>
				{/* DON'T SHOW IF THERE AREN'T SOCIAL MEDIA*/}
				{!!Object.keys(social).length && (
					<div className={`${styles.social}`}>
						{facebook && (
							<Link className={"dc"} href={facebook}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="40"
									height="40"
									viewBox="0 0 40 40"
									fill="none"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M40.4651 40H22.7907V26.0465H27.1548L28.8372 20.4651H22.7907V15.2925L24.3823 13.3957H28.9299V8.56196L24.1424 7.85338V7.85156L21.8913 8.24855L20.0699 8.91079L20.0718 8.91715L20.0636 8.90988L17.6717 11.7605L17.6762 11.7642L17.2048 13.9517L17.2129 13.9535H17.2093V20.4651H11.6279V26.0465H17.2093V40H-0.465118V0H40.4651V40ZM29.3023 20.4842V20.4651H29.2923L29.3023 20.4842Z"
									/>
								</svg>
							</Link>
						)}
						{instagram && (
							<Link className={"dc"} href={instagram}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="41"
									height="42"
									viewBox="0 0 41 42"
									fill="none"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M40.0909 42H0V0H40.0909V42ZM3.77045 4.2V37.7045H36.3205V4.2H3.77045Z"
									/>
									<path d="M32.1625 7.37358L32.183 7.3623L33.4852 9.61714L33.4637 9.62944L33.4852 9.64175L32.183 11.8966L32.1625 11.8843V11.9089H29.558V11.8843L29.5375 11.8966L28.2353 9.64175L28.2558 9.62944L28.2353 9.61714L29.5375 7.3623L29.558 7.37358V7.35H32.1625V7.37358Z" />
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M25.8174 11.4545L31.5626 21.406L25.7907 31.4045H14.3289L8.55595 21.406L14.3022 11.4545H25.8174ZM13.0984 21.4285L16.5786 27.4568H23.54L27.0202 21.4295L23.54 15.4013H16.5796L13.0984 21.4285Z"
									/>
								</svg>
							</Link>
						)}
						{youtube && (
							<Link className={"dc"} href={youtube}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="44"
									height="30"
									viewBox="0 0 44 30"
									fill="none"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M44 4V26L38.7217 30H5.27832L0 26V4L5.27832 0H38.7217L44 4ZM17.7002 21.5234L29 15L17.7002 8.47559V21.5234Z"
									/>
								</svg>
							</Link>
						)}
					</div>
				)}
				<div className={`${styles.nav}`}>
					{/* todo set correct urls */}
					<Link href="/about_us" className={`t3 link semibold`}>
						Про нас
					</Link>
					<Link href="/about_us" className={`t3 link semibold`}>
						Новини
					</Link>
					<Link href="/about_us" className={`t3 link semibold`}>
						Побутові теплогенератори
					</Link>
					<Link href="/about_us" className={`t3 link semibold`}>
						Промислові теплогенератори
					</Link>
					<Link href="/about_us" className={`t3 link semibold`}>
						Зерносушильні комплекси
					</Link>
					<Link href="/about_us" className={`t3 link semibold`}>
						Калькулятор
					</Link>
				</div>
			</div>

			<BasicFooter />
		</footer>
	);
}
