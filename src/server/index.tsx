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

const app = express();

app.use(express.static('dist'));


app.get('*', async (req, res) => {
    await store.dispatch(getCars())


    const content = renderToString(
        <StaticRouter location={req.path}>
            <Provider store={store}><App /></Provider>
        </StaticRouter>
    );

    let preloadedState = store.getState()

    let indexHTML = fs.readFileSync(path.resolve(__dirname, "../", "client/index.html"), "utf8")
    indexHTML = indexHTML.replace("<div id=\"root\"></div>", `<div id=\"root\">${content}</div>`)
    indexHTML = indexHTML.replace(
        "<!-- SERVER_STATE -->", `<script>window.SERVER_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>`
    )

    res.send(indexHTML);
});

app.listen(3000, () => {
    console.log(`Server is listening on port: 3000`);
});
