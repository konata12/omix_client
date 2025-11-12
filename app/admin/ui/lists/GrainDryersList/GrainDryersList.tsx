import ListCard from "@/app/common_ui/cards/ListCard/ListCard";
import ListCardError from "@/app/common_ui/cards/ListCard/ListCardError";
import ErrorBlock from "@/app/common_ui/ErrorBlock/ErrorBlock";
import ResultModal from "@/app/common_ui/modals/ResultModal";
import ListCardsContainer from "@/app/common_ui/wrappers/ListCardsContainer/ListCardsContainer";
import { fulfilled } from "@/app/services/admin/response.service";
import { GrainDryerStringValuesEnum } from "@/app/types/data/products/grain_dryers/grain_dryers.type";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import {
	deleteGrainDryer,
	getGrainDryer,
	handleGrainDryerModal,
} from "@/app/utils/redux/products/grain_dryers/grainDryersSlice";
import { RootState } from "@/app/utils/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./GrainDryersList.module.scss";

export default function GrainDryersList() {
	const { status, error, grain_dryers, grain_dryers_modal_is_open } = useAppSelector(
		(state: RootState) => state.grainDryer,
	);
	const requestError = useAppSelector((state: RootState) => state.faq.error);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getGrainDryer());
	}, [dispatch]);

	const deleteHandler = async (id: string, i: number) => {
		const response = await dispatch(deleteGrainDryer(id));
		const isFulfilled = fulfilled(response.meta.requestStatus);

		if (isFulfilled) {
			dispatch(handleGrainDryerModal({ i, value: false }));
		}
	};

	return (
		<ListCardsContainer titles={["Питання", "Дії"]}>
			<ListCard>
				<h4>Індивідуальне замовлення зерносушильного комплексу</h4>

				<Link
					href={`/admin/products/grain_dryers/individual_order`}
					className={"link btn blue t4"}
				>
					Редагувати
				</Link>
			</ListCard>
			{grain_dryers.length && !error.getAll ? (
				grain_dryers.map((grain_dryer, i) => (
					<ListCard key={grain_dryer.id}>
						<h4>{grain_dryer[GrainDryerStringValuesEnum.TITLE]}</h4>
						<div className={styles.btns}>
							<button
								className={`btn grey t4`}
								onClick={() => {
									dispatch(handleGrainDryerModal({ i, value: true }));
								}}
							>
								Видалити
							</button>
							<Link
								href={`/admin/products/grain_dryers/update/${grain_dryer.id}`}
								className={"link btn blue t4"}
							>
								Редагувати
							</Link>
						</div>
						<ResultModal
							active={grain_dryers_modal_is_open[i]}
							error={true}
							closeHandler={() => {
								dispatch(handleGrainDryerModal({ i, value: false }));
							}}
						>
							<p className={"t3"}>
								Ви дійсно бажаєте <span className={"semibold"}>видалити</span> часто
								задаване питання:{" "}
								<span className={"semibold"}>
									{grain_dryer[GrainDryerStringValuesEnum.TITLE]}
								</span>
								?
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
										dispatch(
											handleGrainDryerModal({
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
										deleteHandler(grain_dryer.id, i);
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
			<Link
				href="/admin/products/grain_dryers/create"
				className={`link btn blue t4 ${styles.create_btn}`}
			>
				Створити новий товар
			</Link>
		</ListCardsContainer>
	);
}
