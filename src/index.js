import React from "react";
import ReactDOM from "react-dom/client"; // 👈 Importa createRoot
import { Provider } from "react-redux";
import store from "./Store/store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";


const root = ReactDOM.createRoot(document.getElementById("root")); // 👈 Usa createRoot()
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
