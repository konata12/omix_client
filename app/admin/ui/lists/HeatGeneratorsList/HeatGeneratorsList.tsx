import ListCard from "@/app/common_ui/cards/ListCard/ListCard";
import ListCardError from "@/app/common_ui/cards/ListCard/ListCardError";
import ErrorBlock from "@/app/common_ui/ErrorBlock/ErrorBlock";
import ResultModal from "@/app/common_ui/modals/ResultModal";
import ListCardsContainer from "@/app/common_ui/wrappers/ListCardsContainer/ListCardsContainer";
import { fulfilled } from "@/app/services/admin/response.service";
import {
	HeatGeneratorStringValuesEnum,
	HeatGeneratorsTypes,
} from "@/app/types/data/products/heat_generators/heat_generators.type";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import {
	deleteHeatGenerator,
	getHeatGenerators,
	handleHeatGeneratorModal,
} from "@/app/utils/redux/products/heat_generators/heatGeneratorsSlice";
import { RootState } from "@/app/utils/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./HeatGeneratorsList.module.scss";

export default function HeatGeneratorsList({ type }: { type: HeatGeneratorsTypes }) {
	const baseUrl = `/admin/products/heat_generators/${type}`;
	const { status, error, heat_generators, heat_generators_modal_is_open } = useAppSelector(
		(state: RootState) => state.heatGenerator[type],
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getHeatGenerators(type));
	}, [dispatch]);

	const deleteHandler = async (id: string, i: number) => {
		const response = await dispatch(deleteHeatGenerator({ id, type }));
		const isFulfilled = fulfilled(response.meta.requestStatus);

		if (isFulfilled) {
			dispatch(handleHeatGeneratorModal({ i, type, value: false }));
		}
	};

	return (
		<ListCardsContainer titles={["Назва моделі", "Дії"]}>
			<ListCard>
				<h4>
					Індивідуальне замовлення {type === "household" ? "побутового" : "промислового"}{" "}
					теплогенератора
				</h4>

				<Link href={`${baseUrl}/individual_order`} className={"link btn blue t4"}>
					Редагувати
				</Link>
			</ListCard>
			{heat_generators.length && !error.getAll ? (
				heat_generators.map((heat_generator, i) => (
					<ListCard key={heat_generator.id}>
						<h4>{heat_generator[HeatGeneratorStringValuesEnum.TITLE]}</h4>
						<div className={styles.btns}>
							<button
								className={`btn grey t4`}
								onClick={() => {
									dispatch(handleHeatGeneratorModal({ i, type, value: true }));
								}}
							>
								Видалити
							</button>
							<Link
								href={`${baseUrl}/update/${heat_generator.id}`}
								className={"link btn blue t4"}
							>
								Редагувати
							</Link>
						</div>
						<ResultModal
							active={heat_generators_modal_is_open[i]}
							error={true}
							closeHandler={() => {
								dispatch(handleHeatGeneratorModal({ i, type, value: false }));
							}}
						>
							<p className={"t3"}>
								Ви дійсно бажаєте <span className={"semibold"}>видалити</span>{" "}
								{type === "household" ? "побутовий" : "промисловий"} теплогенератор:{" "}
								<span className={"semibold"}>
									{heat_generator[HeatGeneratorStringValuesEnum.TITLE]}
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
										dispatch(handleHeatGeneratorModal({ i, type, value: false }));
									}}
								>
									Ні
								</button>
								<button
									className={`btn blue t4`}
									type={"button"}
									onClick={() => {
										deleteHandler(heat_generator.id, i);
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
			<Link href={`${baseUrl}/create`} className={`link btn blue t4 ${styles.create_btn}`}>
				Створити новий товар
			</Link>
		</ListCardsContainer>
	);
}
