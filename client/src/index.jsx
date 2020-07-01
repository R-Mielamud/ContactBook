import React from 'react';
import ReactDOM from 'react-dom';
import Home from './scenes/Home';
import 'semantic-ui-css/semantic.min.css';
import 'react-notifications/lib/notifications.css';
import "./styles/common.scss";
import { PROXY } from "./config";

const prevFetch = window.fetch;

window.fetch = async (url, opts) => {
    let token = localStorage.getItem("token");
    token = ((token && token.startsWith("\"")) ? token.slice(1, -1) : token)

    opts.headers = opts.headers
        ? { ...opts.headers, "Authorization": "Bearer " + token }
        : { "Authorization": "Bearer " + token };

    return await prevFetch(PROXY + url, opts);
};

ReactDOM.render(
    <Home />,
    document.getElementById('root')
);
