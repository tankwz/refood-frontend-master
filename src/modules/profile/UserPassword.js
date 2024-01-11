/** @format */

import UserHeading from "./UserHeading";
import Swal from "sweetalert2";
import styled from "styled-components";
import React from "react";
import { useForm } from "react-hook-form";
import { updateUserPassApi } from "api/user";
import { toast } from "react-toastify";
import { Label } from "components/label";
import { Input } from "components/input";
import { Button } from "components/button";
import InputPasswordToggle from "components/input/InputPasswordToggle";

const UserPasswordStyled = styled.div`
  padding: 0 15px;
`;

const UserPassword = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });

  // Hnadle change password
  const handleUpdatePassword = async (values) => {
    if (!isValid) return;
    try {
      const response = await updateUserPassApi(values);
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        reset({
          oldpassword: "",
          newpassword: "",
          repassword: "",
        });
      } else {
        toast.error(response.data.message, {
          position: "bottom-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message, {
        position: "bottom-right",
        autoClose: 1000,
      });
      reset({
        oldpassword: "",
        newpassword: "",
        repassword: "",
      });
    }
  };

  return (
    <UserPasswordStyled>
      <UserHeading title="Đổi mật khẩu">
        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
      </UserHeading>
      <form
        onSubmit={handleSubmit(handleUpdatePassword)}
        autoComplete="off"
        className="user-content"
      >
        <div className="user-item">
          <Label className="user-name" htmlFor="oldpassword">
            Mật khẩu
          </Label>
          <Input
            type="password"
            name="oldpassword"
            placeholder="Nhập mật khẩu cũ"
            control={control}
            className="user-input"
          ></Input>
        </div>
        <div className="user-item">
          <Label className="user-name" htmlFor="newpassword">
            Mật khẩu mới
          </Label>
          <InputPasswordToggle
            type="password"
            name="newpassword"
            placeholder="Nhập mật khẩu mới"
            control={control}
            className="user-input w-[462px]"
          ></InputPasswordToggle>
        </div>
        <div className="user-item">
          <Label className="user-name" htmlFor="repassword">
            Nhập lại mật khẩu
          </Label>
          <InputPasswordToggle
            type="password"
            name="repassword"
            placeholder="Nhập lại mật khẩu mới"
            control={control}
            className="user-input"
          ></InputPasswordToggle>
        </div>
        {/* <Link className="flex justify-center text-redPrimary" to={"/#"}>
          Quên mật khẩu?
        </Link> */}
        <div className="user-btn">
          <Button
            type="submit"
            className="w-[200px]"
            height="44px"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Đổi mật khẩu
          </Button>
        </div>
      </form>
    </UserPasswordStyled>
  );
};

export default React.memo(UserPassword);
