/** @format */
import React from "react";
import Login from "modules/auth/Login";

import AuthLayout from "modules/auth/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout>
      <Login></Login>
    </AuthLayout>
  );
};

export default LoginPage;
