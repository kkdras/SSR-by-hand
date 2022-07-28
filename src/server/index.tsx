import React from 'react';
import fs from "fs"
import path from "path"
import express from 'express';
import { renderToString } from 'react-dom/server';
import { App } from "../client/App";
import { Provider } from 'react-redux';
import { store } from '../client/app/redux-store';
import { StaticRouter } from 'react-router-dom/server';
import { getCars } from "../client/app/reducers";

let PORT = process.env.PORT || 3000

const app = express();

app.use(express.static('dist'));

let readFile = (path: string) => {
    return new Promise((res, rej) => {
        fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
            if (err) rej(err)
            else res(data)
        })
    })
}

app.get('/', async (req, res) => {
    await store.dispatch(getCars())


    const content = renderToString(
        <StaticRouter location={req.path}>
            <Provider store={store}><App /></Provider>
        </StaticRouter>
    );

    let preloadedState = store.getState()

    let indexHTML = await readFile(path.resolve(__dirname, "../", "client/index.html"))
    if (typeof indexHTML === "string") {
        let indexHTMLString = indexHTML.replace("<div id=\"root\"></div>", `<div id=\"root\">${content}</div>`) as string
        indexHTMLString = indexHTMLString.replace(
            "<!-- SERVER_STATE -->", `<script>window.SERVER_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>`
        ) as string
        res.send(indexHTMLString);
        return
    }
    res.status(500).send('Something error ocurred');
});

app.get('*', (req, res) => {
    res.status(404).send('this page doesn\'t exist')
})

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
