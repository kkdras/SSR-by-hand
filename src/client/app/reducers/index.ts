import { getCarsData, IGetCarsProps, IResp } from './../../packages/api/rest/cars';
import { ActionType, GeneralThunkType } from "../redux-store"
import { ICarItem } from "../../packages/api/rest/cars"



interface IInitialState {
	cars: ICarItem[] | null
	getCarsError: string | null
	getCarsPending: boolean
	brand: string[] | null
	getBrandError: string | null
	getBrandPending: boolean
}

let initialState: IInitialState = {
	cars: null,
	getCarsError: null,
	getCarsPending: false,
	brand: null,
	getBrandError: null,
	getBrandPending: false
}

type GeneralActionsType = ActionType<typeof actions>

export default (state = initialState, action: GeneralActionsType): IInitialState => {
	switch (action.type) {
		case "APP/setCars":
			return {
				...state,
				cars: action.payload.cars
			}
		case "APP/setBrand":
			if (state.brand?.join("") === action.payload.brand.join("")) return state
			return {
				...state,
				brand: action.payload.brand
			}
		case "APP/setBrandError":
			return {
				...state,
				brand: null,
				getBrandError: action.payload.error
			}
		case "APP/setCarsError":
			return {
				...state,
				getCarsError: action.payload.error
			}
		case "APP/toggleBrandPending":
			return {
				...state,
				getBrandPending: !state.getBrandPending
			}
		case "APP/toggleCarsPending":
			return {
				...state,
				getCarsPending: !state.getCarsPending
			}
	}
	return state
}

export let actions = {
	setCars: (cars: ICarItem[]) =>
		({ type: "APP/setCars", payload: { cars } } as const),
	setBrand: (brand: string[]) =>
		({ type: "APP/setBrand", payload: { brand } } as const),
	setBrandError: (error: string | null) =>
		({ type: "APP/setBrandError", payload: { error } } as const),
	setCarsError: (error: string | null) =>
		({ type: "APP/setCarsError", payload: { error } } as const),
	toggleCarsPending: () =>
		({ type: "APP/toggleCarsPending", payload: {} } as const),
	toggleBrandPending: () =>
		({ type: "APP/toggleBrandPending", payload: {} } as const),
}


export let getCars = (props: IGetCarsProps = { perPage: 16, page: 1, brand: "" }):
	GeneralThunkType<GeneralActionsType, Promise<ReturnType<typeof actions.setCars> | void>> => {
	return async (dispatch) => {
		let tmp: null | ReturnType<typeof actions.setCars>
		dispatch(actions.toggleBrandPending())
		dispatch(actions.toggleCarsPending())
		try {
			let value = await getCarsData(props)
			dispatch(actions.setBrand(value.meta.filters.brand))
			tmp = dispatch(actions.setCars(value.list))
			return tmp
		} catch (e) {
			dispatch(actions.setBrandError("Не удалось получить бренды"))
			dispatch(actions.setCarsError("Не удалось получить автомобили"))
			console.log("Не удалось запросить данные")
		} finally {
			dispatch(actions.toggleBrandPending())
			dispatch(actions.toggleCarsPending())
		}
	}
}



