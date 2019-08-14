import { ApolloProvider } from "@apollo/react-hooks"
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import { createClient } from "./graphql/client";
import './index.css';
import * as serviceWorker from './serviceWorker';

// tslint:disable-next-line: no-floating-promises
createClient().then((client) => {
    ReactDOM.render(
        // tslint:disable-next-line: no-any
        <ApolloProvider client={client as any}>
            <App />
        </ApolloProvider>
        , document.getElementById('root'));

})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();