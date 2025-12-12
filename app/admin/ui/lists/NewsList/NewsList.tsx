import ListCard from "@/app/common_ui/cards/ListCard/ListCard";
import ListCardError from "@/app/common_ui/cards/ListCard/ListCardError";
import ErrorBlock from "@/app/common_ui/ErrorBlock/ErrorBlock";
import ResultModal from "@/app/common_ui/modals/ResultModal";
import ListCardsContainer from "@/app/common_ui/wrappers/ListCardsContainer/ListCardsContainer";
import { fulfilled } from "@/app/services/admin/response.service";
import { NewsStringValuesEnum } from "@/app/types/data/news";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { deleteNews, getNews, handleNewsModal } from "@/app/utils/redux/news/newsSlice";
import { RootState } from "@/app/utils/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./NewsList.module.scss";

export default function NewsList() {
	const { status, error, news, news_modal_is_open } = useAppSelector((state: RootState) => state.news);
	const dispatch = useAppDispatch();

	console.log(error);

	useEffect(() => {
		dispatch(getNews());
	}, [dispatch]);

	const deleteHandler = async (id: string, i: number) => {
		const response = await dispatch(deleteNews(id));
		const isFulfilled = fulfilled(response.meta.requestStatus);

		if (isFulfilled) {
			dispatch(handleNewsModal({ i, value: false }));
		}
	};

	return (
		<ListCardsContainer titles={["Назва новини", "Дії"]}>
			{!error.getAll ? (
				news.map((newsData, i) => (
					<ListCard key={newsData.id}>
						<h4>{newsData[NewsStringValuesEnum.TITLE]}</h4>
						<div className={styles.btns}>
							<button
								className={`btn grey t4`}
								onClick={() => {
									dispatch(handleNewsModal({ i, value: true }));
								}}
							>
								Видалити
							</button>
							<Link
								href={`/admin/news/update/${newsData.id}`}
								className={"link btn blue t4"}
							>
								Редагувати
							</Link>
						</div>
						<ResultModal
							active={news_modal_is_open[i]}
							error={true}
							closeHandler={() => {
								dispatch(handleNewsModal({ i, value: false }));
							}}
						>
							<p className={"t3"}>
								Ви дійсно бажаєте <span className={"semibold"}>видалити</span> часто
								зерносушильний комплекс:{" "}
								<span className={"semibold"}>
									{newsData[NewsStringValuesEnum.TITLE]}
								</span>
								?
							</p>
							<ErrorBlock
								title={`Виникла помилка при видаленні:`}
								error={error.delete[i]}
							/>
							<div className={styles.modal_btns}>
								<button
									className={`btn grey t4`}
									type={"button"}
									onClick={() => {
										dispatch(
											handleNewsModal({
												i,
												value: false,
											}),
										);
									}}
								>
									Ні
								</button>
								<button
									className={`btn blue t4`}
									type={"button"}
									onClick={() => {
										deleteHandler(newsData.id, i);
									}}
								>
									Ок!
								</button>
							</div>
						</ResultModal>
					</ListCard>
				))
			) : (
				<ListCardError error={error} status={status} />
			)}
			<Link href="/admin/news/create" className={`link btn blue t4 ${styles.create_btn}`}>
				Створити новину
			</Link>
		</ListCardsContainer>
	);
}
