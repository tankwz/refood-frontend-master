/** @format */

import Layout from "components/layout/Layout";
import React from "react";

const ContactPage = () => {
  return (
    <Layout>
      <div className="container flex justify-center">
        <div className="flex flex-col gap-5 py-10">
          <h3 className="text-2xl font-semibold text-center uppercase text-text">
            Thông tin liên hệ
          </h3>
          <div className="flex flex-wrap items-center justify-start gap-2 text-lg">
            <strong>Địa chỉ:</strong>
            66c, đường 3/2, phường Xuân Khánh, quận Ninh Kiều, thành phố Cần Thơ
          </div>
          <div className="flex flex-wrap items-center justify-start gap-2 text-lg">
            <strong>Số điện thoại:</strong>
            0123-456-789 | 0321-543-987
          </div>
          <div className="flex flex-wrap items-center justify-start gap-2 text-lg">
            <strong>Email:</strong>
            email@gmail.com
          </div>
          <div className="flex flex-wrap items-center justify-start gap-2 text-lg">
            <strong>Facebook:</strong>
            <a href="/#" className="text-blue-500 ">
              facebook/refood
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
