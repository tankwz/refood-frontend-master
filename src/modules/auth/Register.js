/** @format */

import React from "react";
import PropTypes from "prop-types";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { ErrorMessage } from "components/error";
import { Button } from "components/button";
import { authRegister } from "store/auth/slice";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required("Vui lòng nhập họ và tên"),
  phonenumber: yup.string().required("Vui lòng nhập số điện thoại"),
  password: yup
    .string()
    .min(8, "Mật khẩu ít nhất 8 kí tự")
    .required("Vui lòng nhập mật khẩu"),
  repassword: yup.string().required("Vui lòng nhập lại mật khẩu"),
});

const Register = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phonenumber: "",
      password: "",
      repassword: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Submit Form Register
  const handleSubmitRegister = (values) => {
    if (!isValid) return;
    try {
      dispatch(authRegister(values));
      reset({});
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitRegister)}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <Field>
          <Label htmlFor="name">Họ và tên</Label>
          <Input
            type="text"
            name="name"
            placeholder="Nhập họ và tên"
            control={control}
          ></Input>
          <ErrorMessage message={errors.name?.message}></ErrorMessage>
        </Field>
        <Field>
          <Label htmlFor="phonenumber">Số điện thoại</Label>
          <Input
            type="text"
            name="phonenumber"
            placeholder="Nhập số điện thoại"
            control={control}
          ></Input>
          <ErrorMessage message={errors.phonenumber?.message}></ErrorMessage>
        </Field>
        <Field>
          <Label htmlFor="password">Mật khẩu</Label>
          <InputPasswordToggle
            name="password"
            control={control}
            className="w-full"
            placeholder="Nhập mật khẩu"
          ></InputPasswordToggle>
          <ErrorMessage message={errors.password?.message}></ErrorMessage>
        </Field>
        <Field>
          <Label htmlFor="repassword">Xác nhận lại mật khẩu</Label>
          <InputPasswordToggle
            name="repassword"
            control={control}
            className="w-full"
            placeholder="Xác nhận lại mật khẩu"
          ></InputPasswordToggle>
          <ErrorMessage message={errors.repassword?.message}></ErrorMessage>
        </Field>
        <div className="mb-4 text-sm transition-all cursor-default text-text1">
          <span>
            Đã có tài khoản?{" "}
            <a href="/login" className="cursor-pointer hover:text-primary">
              Đăng nhập
            </a>
          </span>
        </div>
        <Button
          type="submit"
          kind="primary"
          height="44px"
          className="w-full mt-10 max-w-[180px] mx-auto uppercase"
          disabled={isSubmitting}
        >
          Đăng ký
        </Button>
      </form>
    </>
  );
};

Register.propTypes = {
  show: PropTypes.bool,
};

export default Register;
