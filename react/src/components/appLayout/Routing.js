import React from "react";
import { Route, Routes } from "react-router-dom";
import { baseUrl } from "../..helper";
import HomePage from "../../page/HomePage";
import ProductPage from "../../page/ProductPage";
import Login from "../../page/Login";
import Registration from "../../page/Registration";
import Cart from "../../page/Cart";
import ProfilePage from "../../page/ProfilePage";

function Routing() {
  return (
    <Routes>
      <Route exact path={`/`} element={<HomePage />} ></Route>
      <Route exact path={`${baseUrl}/dashboard`} element={<HomePage />} ></Route>
      <Route exact path={`${baseUrl}/product/:id`} element={<ProductPage />} />
      <Route exact path={`${baseUrl}/login`} element={<Login />} ></Route>
      <Route exact path={`${baseUrl}/Registration`} element={<Registration />} ></Route>
      <Route exact path={`${baseUrl}/cart`} element={<Cart />} />
      <Route exact path={`${baseUrl}/user/profile/:id`} element={<ProfilePage />} />
    </Routes>
  );
}
export default Routing;
