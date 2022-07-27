import React, { FC, memo } from "react"
import s from "./Alerts.module.scss"

export let AlertManager: FC = memo(({ children }) => {
	return <div className={s.controlAlert}>
		{children}
	</div>
})

export let Alert: FC<{ type: "error" | "success" }> = memo(({ children, type }) => {
	return <div
		className={`${s.controlAlert__item} ${type === "error" ? s.controlAlert__error : type === "success" ? s.controlAlert__success : ''}`}
	>
		{children}
	</div>
})

