/**
 * /* eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/** @format */

import React from "react";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "contexts/user-context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { ErrorMessage } from "components/error";
import { Button } from "components/button";
import { authLogin } from "store/auth/slice";

const schema = yup.object({
  phonenumber: yup.string().required("Vui lòng nhập số điện thoại"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu ít nhất 8 kí tự"),
});

const Login = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      phonenumber: "",
      password: "",
    },
  });

  const dispatch = useDispatch();

  // Submit Form Login
  const handleSubmitLogin = (values) => {
    if (!isValid) return;
    try {
      dispatch(authLogin(values));
      reset({});
    } catch (error) {
      console.log(error);
    }
  };
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [, setUserInfo] = useUser();
  useEffect(() => {
    if (user && user.CustomerId) {
      setUserInfo(user);
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitLogin)}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
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
        <div className="mb-4 text-sm transition-all cursor-default text-text1">
          <span>
            Chưa có tài khoản?{" "}
            <a href="/signup" className="cursor-pointer hover:text-primary">
              Đăng ký
            </a>
          </span>
        </div>
        <Button
          type="submit"
          kind="primary"
          height="44px"
          className="w-full max-w-[180px] mx-auto uppercase"
          disabled={isSubmitting}
        >
          Đăng nhập
        </Button>
      </form>
    </>
  );
};

export default Login;
