import React from "react"
import loading from "../assets/loading.gif"
import Masonry from "react-masonry-css";
import { useTypesSelector } from "../app/redux-store";
import { Car } from "./Car";
import s from "./Cars.module.scss"

export let Cars = () => {
	let cars = useTypesSelector(state => state.cars)
	let pending = useTypesSelector(state => state.getCarsPending)

	if (!cars || pending) return <div className={s.loading}>
		<img src={loading} alt="" />
	</div>
	else return <Masonry
		breakpointCols={{ default: 3, 1302: 2, 880: 1 }}
		className={s.myMasonryGrid}
		columnClassName={s.myMasonryGrid_column}>
		{cars?.map((item, index) => <Car item={item} key={index} />)}
	</Masonry>
}