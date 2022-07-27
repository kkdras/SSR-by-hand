import React, { useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { useAppDispatch, useTypesSelector } from "../app/redux-store";
import s from "./Control.module.scss"
import { actions, getCars } from "../app/reducers/index"
import { Alert, AlertManager } from "./Alerts";

interface IOptionItem {
	value: string
	label: string
}

export let Control = () => {
	let dispatch = useAppDispatch()
	let brands = useTypesSelector(state => state.brand)
	let pending = useTypesSelector(store => store.getBrandPending)
	let errorBrand = useTypesSelector(store => store.getBrandError)
	let errorCars = useTypesSelector(store => store.getCarsError)

	let [state, setState] = useState<IOptionItem | null>(null);


	let options: IOptionItem[] = [
		{ value: "", label: "Все модели" },
		...(brands ? brands?.map(item => ({ value: item, label: item })) : [])
	]

	let handler = (e: any) => {
		setState(e)
		dispatch(getCars({ brand: e.value, perPage: 24 }))
	}

	useEffect(() => {
		if (errorBrand) {
			let id = setTimeout(() => dispatch(actions.setBrandError(null)), 3000)
			console.log(errorBrand)
			return () => {
				dispatch(actions.setBrandError(null))
				clearTimeout(id)
			}
		}
	}, [errorBrand])

	useEffect(() => {
		if (errorCars) {
			let id = setTimeout(() => dispatch(actions.setCarsError(null)), 3000)
			console.log(errorCars)
			return () => {
				dispatch(actions.setCarsError(null))
				clearTimeout(id)
			}
		}
	}, [errorCars])

	return <div className={s.control}>
		<Select
			isDisabled={pending || options.length < 2}
			value={state}
			onChange={handler}
			hideSelectedOptions
			placeholder={"Модель"}
			options={options}
			styles={colorStyles}
			isSearchable={false}
		/>
		<AlertManager>
			{errorBrand && <Alert type="error">
				{errorBrand}
			</Alert>}
			{errorCars && <Alert type="error">
				{errorCars}
			</Alert>}
		</AlertManager>
	</div >
}

const colorStyles: StylesConfig<{ value: string, label: string }> = {
	control: (styles) => ({
		color: "#fff",
		...styles,
		backgroundColor: "#282A2E",
		width: "276px",
		height: "56px",
		borderRadius: "4px 4px 0 0",
		":hover": {
			...styles[":active"],
			border: "none",
			boxShadow: "none"
		},
		border: "none",
		boxShadow: "none"
	}),
	indicatorSeparator: (styles) => ({
		...styles,
		display: "none"
	}),
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {

		return {
			...styles,
			color: "#FFFFFFDE",
			backgroundColor: isSelected
				? "#666"
				: isFocused
					? "#333"
					: styles.backgroundColor,
			":active": {
				color: "#FFFFFFDE"
			}
		};
	},
	menu: (provided, state) => ({
		...provided,
		margin: 0,
		backgroundColor: "#282A2E",
		width: "276px",
		borderRadius: "0 0 4px 4px"
	}),
	placeholder: (styles, { isDisabled }) => ({ ...styles, color: isDisabled ? "#666" : "#FFFFFFDE" }),
	singleValue: (styles, { isDisabled }) => ({
		...styles,
		color: isDisabled ? "#666" : "#FFFFFFDE",
		fontSize: "16px"
	}),
};