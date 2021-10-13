import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Spinner } from "reactstrap";
import Error from "./pages/Error";
import AddressComponent from "./pages/AddressComponent";
import OrderConfirmation from "./pages/OrderConfirmation";
import Cartpage from "./pages/CartPage";
import UserAddresses from "./pages/UserAddresses";
import Login from "./pages/loginPage";
import Logout from "./pages/Logout";
import Help from "./pages/Help";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";

// const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
// const AddressComponent = lazy(() => import("./pages/AddressComponent"));
// const UserAddresses = lazy(() => import("./pages/UserAddresses"));
// const Cartpage = lazy(() => import("./pages/CartPage"));
// const Logout = lazy(() => import("./pages/Logout"));
// const Login = lazy(() => import("./pages/loginPage"));
// const Help = lazy(() => import("./pages/Help"));
// const ProductDetails = lazy(() => import("./pages/ProductDetails"));

const renderLoader = () => (
  <Spinner
    className="loader"
    style={{ align: "center", width: "3rem", height: "3rem" }}
    size="xl"
    animation="border"
    color="warning"
  />
);

const Router = () => (
  <Switch>
    {/* <Suspense fallback={renderLoader()}> */}
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/help" component={Help} />
    <Route
      exact
      path="/cart"
      render={() => (
        <Error loc="Cartpage">
          <Cartpage />
        </Error>
      )}
    />
    <Route
      exact
      path="/manageAddress"
      render={() => (
        <Error loc="UserAddresses">
          <UserAddresses />
        </Error>
      )}
    />
    <Route
      exact
      path="/desc/:proid"
      render={() => (
        <Error loc="ProductDetails">
          <ProductDetails />
        </Error>
      )}
    />
    <Route
      exact
      path="/checkout"
      render={() => (
        <Error loc="AddressComponent">
          <AddressComponent />
        </Error>
      )}
    />
    <Route
      exact
      path="/confirmation"
      render={() => (
        <Error loc="OrderConfirmation">
          <OrderConfirmation />
        </Error>
      )}
    />
    <Route
      exact
      path="/wishlist"
      render={() => (
        <Error loc="Wishlist">
          <Wishlist />
        </Error>
      )}
    />
    <Route
      exact
      path="/"
      render={() => (
        <Error loc="HomePage">
          <HomePage />
        </Error>
      )}
    />

    {/* <SecuredRoute exact path='/manageAddress' component={UserAddresses}/> */}
    {/* </Suspense> */}
  </Switch>
);

export default Router;
