/** @format */

import React from "react";
import Layout from "components/layout/Layout";
import HomeProduct from "modules/home/HomeProduct";
import HomeBanner from "modules/home/HomeBanner";

const HomePage = () => {
  document.title = "Trang chủ";
  return (
    <Layout>
      <HomeBanner></HomeBanner>
      <HomeProduct></HomeProduct>
    </Layout>
  );
};

export default HomePage;
