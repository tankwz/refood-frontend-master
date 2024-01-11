/** @format */

import ProductCart from "modules/products/ProductCart";
import ProductImage from "modules/products/ProductImage";
import ProductPrice from "modules/products/ProductPrice";
import ProductStar from "modules/products/ProductStar";
import ProductTitle from "modules/products/ProductTitle";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import slugify from "slugify";
import { authLogin } from "store/auth/slice";
import { addCart } from "store/cart/slice";
import styled from "styled-components";
import Swal from "sweetalert2";
import priceVN from "utils/priceVN";

const PartyItemStyled = styled.div`
  height: 100%;
  .card-main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: auto;
    height: 100%;
    padding: 20px;
    border: 1px solid ${(props) => props.theme.borderLight};
    border-radius: 6px;
    cursor: pointer;
  }
  .card-main:hover {
    transition: all 0.5s ease-out;
    box-shadow: ${(props) => props.theme.textGray} 0px 3px 8px;
  }
  .card-image {
    border-radius: 8px;
    height: 164px;
  }
  .card-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
  }
  .card-top {
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .card-info {
    display: flex;
    flex-direction: column;
    margin-top: auto;
    flex-shrink: 0;
  }
`;

const PartyItem = ({ data }) => {
  const { FoodName, FoodPrices, FoodImages, FoodReviewAvg } = data;

  const slug = slugify(data?.FoodSlug, { lower: true });
  const token = window.localStorage.getItem("accessToken");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [user]);

  const handleLoginPartyModal = async () => {
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
          }
        }
      } else if (result.isDenied) {
        navigate("/signup");
      }
    });
  };

  const handleAddPartyCart = () => {
    const array = [...FoodPrices];
    const ration = array.filter((item) => {
      return item.FoodRation === 10 ? item : "";
    });
    dispatch(
      addCart({
        mactma: ration[0].FoodDetailID,
        count: 1,
      })
    );
  };

  if (!data) return null;

  return (
    <PartyItemStyled className="cards">
      <div className="card-main">
        <ProductImage
          url={FoodImages[0].FoodImageUrl}
          to={slug}
          className="card-image"
        ></ProductImage>
        <div className="card-content">
          <div className="card-top">
            <ProductTitle to={slug}>{FoodName}</ProductTitle>
            <Link to={`/${slug}`} className="card-info">
              <ProductStar
                className="flex-shrink-0 mb-3"
                starNumber={FoodReviewAvg}
              ></ProductStar>
              {FoodPrices.length <= 1 ? (
                <ProductPrice className="flex-1 mb-3">
                  {priceVN(FoodPrices[0].FoodPrice)}
                </ProductPrice>
              ) : (
                <ProductPrice className="flex-1 mb-3">
                  {priceVN(FoodPrices[0].FoodPrice) +
                    "~" +
                    priceVN(FoodPrices[FoodPrices.length - 1].FoodPrice)}
                </ProductPrice>
              )}
            </Link>
          </div>
          {!token ? (
            <ProductCart
              className="card-button"
              onClick={handleLoginPartyModal}
            ></ProductCart>
          ) : (
            <ProductCart
              className="card-button"
              onClick={handleAddPartyCart}
            ></ProductCart>
          )}
        </div>
      </div>
    </PartyItemStyled>
  );
};

export default PartyItem;
