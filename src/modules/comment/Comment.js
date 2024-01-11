/** @format */

import Swal from "sweetalert2";
import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "components/textarea";
import { ErrorMessage } from "components/error";
import { Button } from "components/button";
import { authLogin } from "store/auth/slice";
import { addCommentDetails, getCommentDetails } from "store/food/slice";
import { useNavigate } from "react-router-dom";

const CommentStyled = styled.div`
  width: 750px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  .cmt-textarea {
    min-height: 100px;
    border-radius: 4px 4px 0 0;
    resize: vertical;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    .cmt-btn {
      font-size: 14px;
      padding: 10px;
    }
  }
`;

const schema = yup.object({
  content: yup.string().required("Vui lòng nhập bình luận"),
});

const Comment = ({ className = "" }) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { foodDetails } = useSelector((state) => state.food);
  const user = window.localStorage.getItem("user");
  const CustomerId = JSON.parse(user)?.CustomerId;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setValue("foodid", foodDetails?.FoodId);
    setValue("customerid", CustomerId);
  }, [CustomerId, foodDetails?.FoodId, setValue]);

  const handleSubmitComment = async (values) => {
    if (!isValid) return;
    if (CustomerId) {
      dispatch(addCommentDetails(values));
      dispatch(getCommentDetails({ foodId: foodDetails?.FoodId, page: 8 }));
      reset({});
    } else {
      Swal.fire({
        title: "Chưa đăng nhập tài khoản!",
        icon: "warning",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
        confirmButtonColor: "#1dc071",
        denyButtonText: `Đăng ký`,
        cancelButtonColor: "#ea2b0f",
        denyButtonColor: "#6F49FD",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { value: phonenumber } = await Swal.fire({
            title: "Đăng nhập",
            input: "text",
            inputPlaceholder: "Nhập số điện thoại",
            inputAttributes: {
              autocapitalize: "off",
              autocorrect: "off",
            },
            confirmButtonText: "Tiếp tục",
            confirmButtonColor: "#1dc071",
            cancelButtonColor: "#ea2b0f",
            showCancelButton: true,
          });
          if (phonenumber) {
            const { value: password } = await Swal.fire({
              title: "Mật khẩu",
              input: "password",
              inputPlaceholder: "Nhập mật khẩu",
              inputAttributes: {
                autocapitalize: "off",
                autocorrect: "off",
              },
              confirmButtonText: "Đăng nhập",
              confirmButtonColor: "#1dc071",
              cancelButtonColor: "#ea2b0f",
              showCancelButton: true,
            });
            if (phonenumber && password) {
              dispatch(
                authLogin({ phonenumber: phonenumber, password: password })
              );
              dispatch(getCommentDetails(foodDetails?.FoodId));
            }
          }
        } else if (result.isDenied) {
          navigate("/signup");
        }
      });
    }
  };
  return (
    <CommentStyled className={className}>
      <div>
        <Textarea
          name="content"
          type="textarea"
          control={control}
          className="cmt-textarea"
          placeholder="Mời bạn để lại bình luận"
        ></Textarea>
        <ErrorMessage message={errors.content?.message}></ErrorMessage>
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="inline cmt-btn"
          height="40px"
          onClick={handleSubmit(handleSubmitComment)}
        >
          Gửi bình luận
        </Button>
      </div>
    </CommentStyled>
  );
};

Comment.propTypes = {
  className: PropTypes.string,
};

export default Comment;
