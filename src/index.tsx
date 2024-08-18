import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./styles/styles.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { HelmetProvider } from 'react-helmet-async';
import { App } from "./components/app";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);