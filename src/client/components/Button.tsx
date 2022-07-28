import React, { FC, memo } from "react"
import s from "./Button.module.scss"

export let Button: FC<{ children: string }> = memo(({ children }) => {
	return <button className={s.button}>{children}</button>
})