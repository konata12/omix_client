import ListCard from "@/app/common_ui/cards/ListCard/ListCard";
import ListCardsContainer from "@/app/common_ui/wrappers/ListCardsContainer/ListCardsContainer";
import styles from "./FormShowSelectList.module.scss";

interface FormShowSelectListProps {
	titles: string[];
	defaultRow?: string;
	data: {
		id: string;
		title: string;
	}[];
	handleDelete: (index: number) => void;
}

export default function FormShowSelectList({
	titles,
	defaultRow,
	data,
	handleDelete,
}: FormShowSelectListProps) {
	return (
		<ListCardsContainer titles={titles} className={styles.container}>
			{data.map((value, i) => (
				<ListCard key={value.id}>
					<h4>{value.title}</h4>
					<div className={styles.btns}>
						<button className={`btn grey t4`} onClick={() => handleDelete(i)}>
							Видалити
						</button>
					</div>
				</ListCard>
			))}
			{defaultRow && (
				<ListCard>
					<h4>Індивідуальне замовлення промислового теплогенератора</h4>
				</ListCard>
			)}
		</ListCardsContainer>
	);
}
