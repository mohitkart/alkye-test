import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ArticleDetail from "./pages/ArticleDetail";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./scss/main.scss";
import configureStoreProd from "./config/configureStore.prod";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";


const { persistor, store } = configureStoreProd();

const routes = [
  { url: "/dashboard", element: <Dashboard /> },
  { url: "/login", element: <Login /> },
  { url: "/article/:id", element: <ArticleDetail /> },
  { url: "/", element: <Login /> },
  { url: "*", element: <NotFoundPage /> },
];

const Routing = () => ( <>
  <Provider store={store}>
    <PersistGate loading={"loading ..."} persistor={persistor}>
      <Router>
        <Routes>
          {routes.map((itm) => {
            return <Route path={itm.url} element={itm.element} key={itm.url} />;
          })}
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
  {/* <div id="loader" className="loaderDiv d-none">
    <div>
      <img src="/assets/img/loader.gif" alt="logo" className="loaderlogo" />
    </div>
  </div> */}
  <ToastContainer position="top-right" />
</>)

export default Routing;
