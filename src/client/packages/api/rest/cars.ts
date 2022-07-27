import makeRequest from "../makeRequest"

export interface IResp {
	list: ICarItem[]
	count: number
	meta: {
		filters: {
			brand: string[]
		}
		options: []
	}
}

export interface ICarItem {
	classifieds: {
		description: string // Mitsubishi Outlander
	}
	feedData: {
		autoPrice: number
		autoPriceRrc: number
		autoProbeg: number //0
		brandByClassifierName: string //"Volkswagen"
		brandName: string //"Volkswagen"
		color: string //"Pure"
		colorByClassifierName: string //"белый"
		equipmentVariantBodyType: string //"Седан"
		equipmentVariantEnginePower: number //110
		equipmentVariantEngineCapacity: number
		equipmentVariantFuelType: string //"Бензин"
		equipmentVariantTransmission: string //"CVT"
		equipmentVariantTransmissionType: string // "Автомат"
		equipmentVariantDriveType: string //2WD
		hasVin: boolean
		modelYear: number //2022
		modelName: string // "BMW 4er"
		vin: string //"XW8ZZZCKZNG010475"
		noFactoryOptions: {
			packetAcc: { packetAccName: string }[]
		}
	}
	feedName: string
	feedUrl: string
	legacy: {
		interior: {
			color: null | string
			material: string
		}
		isTradein: boolean
		price: number
		isStock: boolean
	}
	photobank: {
		imgs: {
			url: string
			urlThumb: string
		}[]
	}
	setCarStatus: {
		status: string
	}
	updatedAt: string
	variationEquipmentVariants: {}
	vin: string
	_id: string
}


export let getCarsData = ({ perPage = 16, page = 1, brand = "" }: IGetCarsProps = { perPage: 16, page: 1, brand: "" }) => {
	return makeRequest<IResp>({
		url: `cars/temp?page=${page}&perPage=${perPage}&isNew%5B0%5D=1&orderBy%5B0%5D%5Bfield%5D=year&orderBy%5B0%5D%5Bdirection%5D=desc${brand ?
			("&brand=" + brand) : ""}`
	})
}
export interface IGetCarsProps {
	perPage?: number
	page?: number
	brand?: string
}