import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./config/store";

const App = lazy(() => import("./App"));

const renderLoader = () => <p>App is currently loading</p>;
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={renderLoader()}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
