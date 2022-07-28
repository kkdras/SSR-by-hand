import React from "react";
import s from "./App.module.scss"
import { Cars } from "./components/Cars";
import { Control } from "./components/Control"
import "normalize.css"
import "./styles/app.scss";

export function App() {
    return (
        <main className={s.app}>
            <Control />
            <Cars />
        </main>
    );
}




