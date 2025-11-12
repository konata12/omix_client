"use client";

import ProductCategoryDropdown from "@/app/(client)/ui/Header/ProductCategoryDropdown/ProductCategoryDropdown";
import phone from "@/public/svg/phone_white.svg";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.scss";

export function Header() {
	const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

	// todo fix link urls
	return (
		<header className={styles.header}>
			<div className={`container ${styles.container}`}>
				<button
					className={`${styles.burger} ${burgerMenuOpen ? styles.active : ""}`}
					type="button"
					onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
				>
					<span className={styles.reqt}></span>
					<span className={styles.reqt}></span>
					<span className={styles.reqt}></span>
				</button>
				<Link href="/" className={styles.logo}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="116"
						height="24"
						viewBox="0 0 116 24"
						fill="none"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M10.627 0.168582C4.06951 1.06433 -0.0238853 5.6567 0.000104876 12.091C0.0250515 18.8108 4.62989 23.4116 11.8108 23.8915C19.6642 24.4164 25.3054 20.1854 26.0217 13.2332C26.8837 4.86704 19.861 -1.09269 10.627 0.168582ZM107.944 0.165311C100.067 1.44612 95.6723 8.60897 98.1566 16.1187C100.307 22.6179 108.454 25.834 115.382 22.9184L115.999 22.6587L115.999 18.97C116 16.9412 115.98 15.2812 115.955 15.2812C115.931 15.2812 115.743 15.4102 115.537 15.5679C113.17 17.3833 109.434 17.496 107.38 15.8139C104.895 13.7781 105.512 8.88189 108.428 7.49325C110.576 6.47078 113.561 6.88017 115.462 8.45767L116 8.90423V5.24117V1.5782L115.263 1.21514C113.246 0.222177 110.244 -0.208587 107.944 0.165311ZM29.8061 0.94501C29.761 1.21347 28.1678 12.5776 27.254 19.1494C26.9673 21.2111 26.7144 22.979 26.6919 23.0781L26.651 23.2583L30.896 23.2377L35.1409 23.217L35.6717 17.2751C35.9636 14.0071 36.206 11.3243 36.2105 11.3133C36.2523 11.2111 36.5563 11.3315 36.6134 11.4729C36.6534 11.5716 37.3546 13.9672 38.1718 16.7966C38.9889 19.626 39.7468 22.2374 39.856 22.5998L40.0546 23.2586L43.3369 23.2378L46.6193 23.217L47.8738 18.9102C48.5638 16.5414 49.3404 13.8676 49.5995 12.9683C50.0083 11.5498 50.0928 11.3299 50.2384 11.3078C50.4771 11.2715 50.4405 10.9847 50.9605 16.9561C51.2222 19.9609 51.458 22.6078 51.4846 22.8382L51.5329 23.2569H55.7562H59.9796L59.9312 22.9179C59.7984 21.9861 57.9831 9.01963 57.4413 5.13246L56.8215 0.68636L51.9554 0.68604L47.0893 0.685802L45.6366 6.00955C43.312 14.5291 43.4968 13.9294 43.2437 13.7728C43.1167 13.6943 43.1173 13.6966 41.154 6.50802C40.3212 3.45933 39.6209 0.902101 39.5977 0.825375C39.558 0.694415 39.2551 0.685802 34.7026 0.685802H29.8498L29.8061 0.94501ZM61.5638 11.9713V23.2569H65.9474H70.331V11.9713V0.685802H65.9474H61.5638V11.9713ZM73.519 11.9713V23.2569H77.8628H82.2065V18.9956C82.2065 14.526 82.2164 14.3969 82.5475 14.5294C82.6011 14.5507 83.7208 16.5227 85.0359 18.9114L87.427 23.2545L92.4329 23.2557C96.4167 23.2566 97.4267 23.2365 97.3793 23.1572C97.3465 23.1024 95.5995 20.4743 93.497 17.3173C91.3945 14.1601 89.6581 11.515 89.6383 11.4392C89.6115 11.3368 96.0105 2.24081 97.1336 0.78486C97.1956 0.704465 96.2651 0.688593 92.4497 0.705103L87.6884 0.72568L85.1881 4.79326C83.813 7.03043 82.6363 8.89465 82.5735 8.93597C82.2164 9.17029 82.2065 9.05696 82.2065 4.74365V0.685802H77.8628H73.519V11.9713ZM14.0269 7.03003C18.7262 8.00139 19.1675 15.1847 14.625 16.7656C11.3413 17.9083 8.27696 15.59 8.28812 11.9713C8.29872 8.53822 10.8201 6.36718 14.0269 7.03003Z"
						/>
					</svg>
				</Link>
				<nav className={styles.navbar}>
					<Link href="/about_us" className={`t5 link semibold not_show_m`}>
						Про нас
					</Link>
					<Link href="/news" className={`t5 link semibold not_show_m`}>
						Новини
					</Link>
					<ProductCategoryDropdown />
					<Link href="/calculator" className={`t5 link semibold dc`}>
						<div className={styles.calculator}>
							<span className={"not_show_s"}>Калькулятор</span>
							<div>
								<svg
									className={"not_show_m"}
									xmlns="http://www.w3.org/2000/svg"
									width="21"
									height="21"
									viewBox="0 0 21 21"
									fill="none"
								>
									<path d="M9.625 21H0V11.375H9.625V21ZM21 21H11.375V11.375H21V21ZM4.81015 15.3037L2.9621 13.4506L2.09073 14.3273L3.93878 16.1753L2.09073 18.0232L2.9621 18.8947L4.81015 17.0467L6.6582 18.8947L7.52979 18.0232L5.68173 16.1753L7.52979 14.3273L6.6582 13.4506L4.81015 15.3037ZM13.2137 18.0599H19.1566V16.7632H13.2137V18.0599ZM13.2137 15.5872H19.1566V14.2905H13.2137V15.5872ZM9.625 9.625H0V0H9.625V9.625ZM21 9.625H11.375V0H21V9.625ZM4.13297 4.36795H1.83865V5.66486H4.13297V7.88034H5.48755V5.66486H7.78165V4.36795H5.48755V2.15247H4.13297V4.36795ZM13.3292 5.77679H19.0413V4.26477H13.3292V5.77679Z" />
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="26"
									height="26"
									viewBox="0 0 26 26"
									fill="none"
								>
									<path d="M11.9167 26H0V14.0833H11.9167V26ZM26 26H14.0833V14.0833H26V26ZM5.95542 18.9475L3.66736 16.6531L2.58852 17.7385L4.87659 20.0266L2.58852 22.3144L3.66736 23.3935L5.95542 21.1054L8.24349 23.3935L9.32259 22.3144L7.03453 20.0266L9.32259 17.7385L8.24349 16.6531L5.95542 18.9475ZM16.3598 22.3599H23.7178V20.7545H16.3598V22.3599ZM16.3598 19.2985H23.7178V17.693H16.3598V19.2985ZM11.9167 11.9167H0V0H11.9167V11.9167ZM26 11.9167H14.0833V0H26V11.9167ZM5.117 5.40794H2.27643V7.01363H5.117V9.75661H6.79411V7.01363H9.63442V5.40794H6.79411V2.66496H5.117V5.40794ZM16.5028 7.15222H23.5749V5.28019H16.5028V7.15222Z" />
								</svg>
							</div>
						</div>
					</Link>
					<Link href="/contact_us" className={`dc`}>
						<div className={`t6 btn blue semibold ${styles.contact}`}>
							<span className={"not_show_s"}>Залишити заявку</span>
							<Image src={phone} alt={""} />
						</div>
					</Link>
				</nav>
				<AnimatePresence>
					{burgerMenuOpen && (
						<motion.nav
							className={`container ${styles.burgerMenu}`}
							initial={{
								transform: "translateY(-100%)",
							}}
							animate={{
								transform: "translateY(0)",
							}}
							exit={{
								transform: "translateY(-100%)",
							}}
							transition={{
								duration: 0.708,
							}}
						>
							<div className={styles.column}>
								<h5 className={styles.title}>Наша діяльність</h5>
								<Link href="/about_us" className={`t5 link contrast semibold`}>
									Про нас
								</Link>
								<Link href="/news" className={`t5 link contrast semibold`}>
									Новини
								</Link>
							</div>
							<div className={styles.column}>
								<h5 className={styles.title}>Наша продукція</h5>
								{/* todo change url path*/}
								<Link href="/about_us" className={`t5 link contrast semibold`}>
									Побутові теплогенератори
								</Link>
								<Link href="/news" className={`t5 link contrast semibold`}>
									Промислові теплогенератори
								</Link>
								<Link href="/news" className={`t5 link contrast semibold`}>
									Зерносушильні комплекси
								</Link>
							</div>
							<div className={styles.column}>
								<h5 className={styles.title}>Ми у соцмережах</h5>
								{/* todo change url path*/}
								<div className={styles.icons}>
									<Link href="/about_us" className={`link contrast dc`}>
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
												d="M40.4651 40H22.7907V26.0465H27.1548L28.8372 20.4651H22.7907V15.2925L24.3823 13.3957H28.9299V8.56196L24.1425 7.85338V7.85156L21.8914 8.24855L20.07 8.91079L20.0718 8.91715L20.0636 8.90988L17.6717 11.7605L17.6763 11.7642L17.2048 13.9517L17.213 13.9535H17.2093V20.4651H11.6279V26.0465H17.2093V40H-0.465088V0H40.4651V40ZM29.3024 20.4842V20.4651H29.2924L29.3024 20.4842Z"
											/>
										</svg>
									</Link>
									<Link href="/news" className={`link contrast dc`}>
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
									<Link href="/news" className={`link contrast dc`}>
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
								</div>
							</div>
						</motion.nav>
					)}
				</AnimatePresence>
			</div>
		</header>
	);
}
