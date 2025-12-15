"use client";

import { DraggableAreaContainerForRedactor } from "@/app/common_ui/animated_components/redactor/DraggableAreaContainerForRedactor";
import RedactorListInput from "@/app/common_ui/animated_components/redactor/input_components/RedactorListInput/RedactorListInput";
import RedactorParagraphInput from "@/app/common_ui/animated_components/redactor/input_components/RedactorParagraphInput/RedactorParagraphInput";
import RedactorTitleInput from "@/app/common_ui/animated_components/redactor/input_components/RedactorTitleInput/RedactorTitleInput";
import RedactorDraggableContainer from "@/app/common_ui/animated_components/redactor/RedactorDraggableContainer/RedactorDraggableContainer";
import ButtonWithUnderline from "@/app/common_ui/buttons/ButtonWithUnderline/ButtonWithUnderline";
import { getIndexedDBStore, getIndexedDBStoreForForm } from "@/app/services/admin/indexedDB.service";
import { FormTypes } from "@/app/types/data/form.type";
import {
	RedactorDataEnum,
	RedactorDataEnumType,
	RedactorSlicesNamesType,
} from "@/app/types/data/redactor/redactor";
import useRedactorControlInputs from "@/app/utils/hooks/admin/redactor/useRedactorControlInputs";
import { useRedactorDragAndDrop } from "@/app/utils/hooks/admin/redactor/useRedactorDragAndDrop";
import { useRedactorSliceReducers } from "@/app/utils/hooks/admin/redactor/useRedactorSliceReducers";
import { useRedactorSliceState } from "@/app/utils/hooks/admin/redactor/useRedactorSliceState";
import styles from "./Redactor.module.scss";

interface RedactorProps {
	sliceName: RedactorSlicesNamesType;
	allovedComponents: RedactorDataEnumType[];
	storeName: string;
	formType?: FormTypes;
}

// to add new redactor:
// create slice
// add reducers to useRedactorSliceReducers
// add state to useRedactorSliceState
export default function Redactor({ sliceName, allovedComponents, storeName, formType }: RedactorProps) {
	const components = useRedactorSliceState(sliceName, formType);
	const { setRedactorComponentError } = useRedactorSliceReducers(sliceName, formType);
	const { handleDragEnd } = useRedactorDragAndDrop(sliceName, formType);
	const { deleteInput, redactorInputsToRender } = useRedactorControlInputs(
		sliceName,
		allovedComponents,
		formType,
	);

	// get proper indexedDb store
	const store = formType
		? getIndexedDBStoreForForm(storeName, formType)
		: getIndexedDBStore(storeName);

	console.log(components);

	return (
		<div className={styles.redactor}>
			<div className={styles.createBtns}>
				{redactorInputsToRender.map((input, i) => {
					return (
						<ButtonWithUnderline
							key={i}
							label={input.label}
							handleFunction={input.createInputHandler}
						/>
					);
				})}
				<span className={styles.line}></span>
			</div>

			<DraggableAreaContainerForRedactor
				handleDragEnd={handleDragEnd}
				dndContextId="redactor"
				components={components}
				droppableAreaClassName={styles.redactorArea}
			>
				{components.map((component, index) => (
					<RedactorDraggableContainer
						id={component.data.orderId}
						elementType={component.type}
						// index={index}
						// handleDelete={() => deleteInput(component)}
						key={index}
					>
						{(() => {
							const key = component.data.orderId;

							switch (component.type) {
								case RedactorDataEnum.TITLES:
									return (
										<RedactorTitleInput
											key={key}
											sliceName={sliceName}
											data={component}
											index={index}
											form={formType}
										/>
									);

								case RedactorDataEnum.PARAGRAPHS:
									return (
										<RedactorParagraphInput
											key={key}
											sliceName={sliceName}
											data={component}
											index={index}
											form={formType}
										/>
									);

								case RedactorDataEnum.LISTS:
									return (
										<RedactorListInput
											key={key}
											sliceName={sliceName}
											data={component}
											index={index}
											form={formType}
										/>
									);
							}
						})()}
					</RedactorDraggableContainer>
				))}
			</DraggableAreaContainerForRedactor>
		</div>
	);
}
