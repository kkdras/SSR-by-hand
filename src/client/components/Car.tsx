import React, { FC, memo } from "react"
import { ICarItem } from "../packages/api/rest/cars";
import s from "./Car.module.scss"
import { Swiper, SwiperSlide } from "swiper/react"
import { Button } from "./Button";

export let Car: FC<{ item: ICarItem }> = memo(({ item }) => {
	let {
		feedData: {
			noFactoryOptions
		}

	} = item
	return <div className={s.car}>
		<div className={s.car__title}>{item.classifieds.description}</div>

		<div className={`${s.car__descriptionTitle} ${s.car__vin}`}>{item.vin}</div>

		<div className={`${s.car__preview} ${s.car__chapter}`}>
			<Swiper
				spaceBetween={12}
				slidesPerView={"auto"}
				className={s.car__swiper}
			>
				{[...item.photobank.imgs, ...item.photobank.imgs].map((photoItem, i) => <SwiperSlide key={i}>
					<img
						src={
							photoItem.url ||
							photoItem.urlThumb ||
							"https://www.avtovzglyad.ru/media/article/2018-Motor-Trend-Car-of-the-Year-contenders.jpg.740x555_q85_box-273%2C0%2C1784%2C1134_crop_detail_upscale.jpg"
						}
						alt="Изображение автомобиля"
					/>
				</SwiperSlide>)}
			</Swiper>
		</div>

		<div className={`${s.car__chapter} ${s.car__engine}`}>
			<div className={s.car__descriptionTitle}>Двигатель</div>
			<span>{item.feedData?.equipmentVariantEngineCapacity / 1000}</span>
			<span className={s.engineSep}>/</span>
			<span>{item.feedData?.equipmentVariantEnginePower}</span>
			<span className={s.engineSep}>/</span>
			<span>{item.feedData?.equipmentVariantFuelType}</span>
		</div>
		<div className={`${s.car__chapter} ${s.car__transmission} ${!noFactoryOptions?.packetAcc.length ? s.car__sm : ""}`}>
			<div className={s.car__descriptionTitle}>КПП</div>
			<span>{item.feedData?.equipmentVariantTransmission}</span>
			<span>{item.feedData?.equipmentVariantDriveType}</span>
		</div>
		<div className={`${s.car__chapter} ${s.car__probeg} ${!noFactoryOptions?.packetAcc.length ? s.car__sm : ""}`}>
			<div className={s.car__descriptionTitle}>Пробег</div>
			<span>{item.feedData?.autoProbeg}</span>
		</div>
		{noFactoryOptions?.packetAcc.length && <div className={`${s.car__chapter} ${s.car__color} `}>
			<div className={s.car__descriptionTitle}>Цвет</div>
			<span>{item.feedData?.colorByClassifierName}</span>
		</div>}
		{noFactoryOptions?.packetAcc.length && <div className={`${s.car__chapter} ${s.car__packages}`}>
			<div className={s.car__descriptionTitle}>Пакеты</div>
			<div className={s.car__packagesBody}>
				<div className={s.car__packagesItems}>
					{<span key={noFactoryOptions?.packetAcc[0].packetAccName}>
						{noFactoryOptions?.packetAcc[0].packetAccName}
					</span>}
				</div>
				{noFactoryOptions?.packetAcc.length > 1 &&
					<span className={s.car__packagesSpoiler}>(+ ещё {noFactoryOptions?.packetAcc.length - 1} пакета)</span>}
			</div>
		</div>}
		<div className={s.car__price}>
			{formatPrice(item.feedData.autoPrice)} <span>₽</span>
		</div>
		<div className={`${s.car__active} ${!noFactoryOptions?.packetAcc.length ? s.car__sm : ""}`}>
			<Button>купить</Button>
		</div>
	</div>
})

let formatPrice = (price: number): string => {
	return ((String(price))
		.split("")
		.reverse()
		.map((item, index) => (index + 1) % 3 === 0 ? (" " + item) : item)
		.reverse()
		.join("")
	)
}