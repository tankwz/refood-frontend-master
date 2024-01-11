/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const UserPurchase = lazy(() => import("modules/profile/UserPurchase"));
const UserProfile = lazy(() => import("modules/profile/UserProfile"));
const UserPassword = lazy(() => import("modules/profile/UserPassword"));
const UserParty = lazy(() => import("modules/profile/UserParty"));
const UserPage = lazy(() => import("pages/UserPage"));
const UserAddress = lazy(() => import("modules/profile/UserAddress"));
const Search = lazy(() => import("modules/search/Search"));
const RegisterPage = lazy(() => import("pages/RegisterPage"));
const ProductPopular = lazy(() => import("modules/products/ProductPopular"));
const ProductPage = lazy(() => import("pages/ProductPage"));
const ProductNewAll = lazy(() => import("modules/products/ProductNewAll"));
const ProductDetailsPage = lazy(() => import("pages/ProductDetailsPage"));
const ProductAll = lazy(() => import("modules/products/ProductAll"));
const PartyPage = lazy(() => import("pages/PartyPage"));
const PartyDetailPage = lazy(() => import("pages/PartyDetailPage"));
const PartyCreate = lazy(() => import("modules/party/PartyCreate"));
const Party = lazy(() => import("modules/party/Party"));
const OrderPage = lazy(() => import("pages/OrderPage"));
const OrderDetailPage = lazy(() => import("pages/OrderDetailPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));
const HomePage = lazy(() => import("pages/HomePage"));
const ContactPage = lazy(() => import("pages/ContactPage"));
const CartPage = lazy(() => import("pages/CartPage"));

const App = () => {
  return (
    <div>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signup" element={<RegisterPage></RegisterPage>}></Route>
          <Route element={<PartyPage></PartyPage>}>
            <Route path="/party" element={<Party></Party>}></Route>
          </Route>
          <Route
            path="/party/create"
            element={<PartyCreate></PartyCreate>}
          ></Route>

          <Route element={<ProductPage></ProductPage>}>
            <Route path="/food" element={<ProductAll></ProductAll>}></Route>
            <Route path="/food/find-foods" element={<Search></Search>}></Route>
            <Route
              path="/food/populars"
              element={<ProductPopular></ProductPopular>}
            ></Route>
            <Route
              path="/food/new"
              element={<ProductNewAll></ProductNewAll>}
            ></Route>
          </Route>

          <Route
            path="/:slug"
            element={<ProductDetailsPage></ProductDetailsPage>}
          ></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>

          <Route path="/order" element={<OrderPage></OrderPage>}></Route>

          <Route element={<UserPage></UserPage>}>
            <Route
              path="/user/account/profile"
              element={<UserProfile></UserProfile>}
            ></Route>
            <Route
              path="/user/account/address"
              element={<UserAddress></UserAddress>}
            ></Route>
            <Route
              path="/user/account/password"
              element={<UserPassword></UserPassword>}
            ></Route>
            <Route
              path="/user/order"
              element={<UserPurchase></UserPurchase>}
            ></Route>
            <Route
              path="/user/order/:slug"
              element={<OrderDetailPage></OrderDetailPage>}
            ></Route>
            <Route path="/user/party" element={<UserParty></UserParty>}></Route>
            <Route
              path="/user/party/:slug"
              element={<PartyDetailPage></PartyDetailPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
