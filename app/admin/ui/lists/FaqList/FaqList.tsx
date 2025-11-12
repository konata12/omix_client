import { generalPageLeaveMessage } from "@/app/admin/(provided_with_redux)/(pages)/general_info/constants";
import SafeLink from "@/app/admin/ui/links/SafeLink/SafeLink";
import ListCard from "@/app/common_ui/cards/ListCard/ListCard";
import ListCardError from "@/app/common_ui/cards/ListCard/ListCardError";
import ErrorBlock from "@/app/common_ui/ErrorBlock/ErrorBlock";
import ResultModal from "@/app/common_ui/modals/ResultModal";
import ListCardsContainer from "@/app/common_ui/wrappers/ListCardsContainer/ListCardsContainer";
import { fulfilled } from "@/app/services/admin/response.service";
import { deleteFaq, getFaq, handleFaqModal } from "@/app/utils/redux/general_data/faq/faqSlice";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useEffect } from "react";
import styles from "./FaqList.module.scss";

export default function FaqList() {
	const { status, error, faqs, faqs_modal_is_open } = useAppSelector((state: RootState) => state.faq);
	const requestError = useAppSelector((state: RootState) => state.faq.error);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getFaq());
	}, [dispatch]);

	const deleteHandler = async (id: string, i: number) => {
		const response = await dispatch(deleteFaq(id));
		const isFulfilled = fulfilled(response.meta.requestStatus);

		if (isFulfilled) {
			dispatch(handleFaqModal({ i, value: false }));
		}
	};

	return (
		<ListCardsContainer titles={["Питання", "Дії"]}>
			{faqs.length && !error.getAll ? (
				faqs.map((faq, i) => (
					<ListCard key={faq.id}>
						<h4>{faq.question}</h4>
						<div className={styles.btns}>
							<button
								className={`btn grey t4`}
								onClick={() => {
									dispatch(handleFaqModal({ i, value: true }));
								}}
							>
								Видалити
							</button>
							<SafeLink
								href={`/admin/general_info/faq/update/${faq.id}`}
								className={"link btn blue t4"}
								confirmMessage={generalPageLeaveMessage}
							>
								Редагувати
							</SafeLink>
						</div>
						<ResultModal
							active={faqs_modal_is_open[i]}
							error={true}
							closeHandler={() => {
								dispatch(handleFaqModal({ i, value: false }));
							}}
						>
							<p className={"t3"}>
								Ви дійсно бажаєте <span className={"semibold"}>видалити</span> часто
								задаване питання: <span className={"semibold"}>{faq.question}</span>?
							</p>
							<ErrorBlock
								title={`Виникла помилка при видаленні:`}
								error={requestError.delete[i]}
							/>
							<div className={styles.modal_btns}>
								<button
									className={`btn grey t4`}
									type={"button"}
									onClick={() => {
										dispatch(handleFaqModal({ i, value: false }));
									}}
								>
									Ні
								</button>
								<button
									className={`btn blue t4`}
									type={"button"}
									onClick={() => {
										deleteHandler(faq.id, i);
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
			<SafeLink
				href="/admin/general_info/faq/create"
				className={`link btn blue t4 ${styles.create_btn}`}
				confirmMessage={generalPageLeaveMessage}
			>
				Створити нове часто задаване питання
			</SafeLink>
		</ListCardsContainer>
	);
}
