/** @format */

import useGetCount from "hooks/useGetCount";
import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import ProductTitle from "modules/products/ProductTitle";
import ProductRation from "modules/products/ProductRation";
import ProductPrice from "modules/products/ProductPrice";
import ProductImage from "modules/products/ProductImage";
import priceVN from "utils/priceVN";
import DetailsThumb from "./DetailsThumb";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Quantity } from "components/quantity";
import { getFoodDetails, getReviewFoodDetail } from "store/food/slice";
import { Button } from "components/button";
import { addCart } from "store/cart/slice";
import { authLogin } from "store/auth/slice";
import Swal from "sweetalert2";

const DetailsContentStyled = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 40px 40px;
  display: flex;
  gap: 50px;
  .image-big {
    width: 450px;
    height: 450px;
    border-radius: 6px;
    cursor: pointer;
    img {
      transition: all 3s;
    }
  }
  .detail-content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .detail-title {
    .title {
      font-size: 30px;
      margin-bottom: 0;
    }
  }
  .detail-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    margin: 20px 0;
  }
  .detail-rated {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    .detail-count {
      border-bottom: 1px solid ${(props) => props.theme.red};
      color: ${(props) => props.theme.red};
    }
  }
  .detail-count {
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    color: ${(props) => props.theme.textGray};
    line-height: 1;
    padding-top: 4px;
    border-bottom: 1px solid ${(props) => props.theme.textGray};
    align-items: center;
  }
  .detail-review {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }
  .detail-evaluate {
    font-size: 14px;
    font-weight: 500;
    padding-top: 4px;
    color: ${(props) => props.theme.text};
  }
  .detail-line {
    display: block;
    width: 1px;
    background-color: ${(props) => props.theme.textGray};
    height: 100%;
  }
  .detail-ration {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    gap: 20px;
    .ration-name {
      font-size: 16px;
      font-weight: 500;
      color: ${(props) => props.theme.text};
    }
  }
  .detail-quantity {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    margin-bottom: 30px;
    .quantity-name {
      font-size: 16px;
      font-weight: 500;
      color: ${(props) => props.theme.text};
    }
  }
  .detail-btn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .detail-image {
      margin: 0 auto;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .detail-image {
      margin: 0 auto;
    }
  }
  @media (min-width: 320px) and (max-width: 767px) {
    .detail-image {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 0 auto;
    }
    .image-big {
      width: 300px;
      height: 300px;
    }
    .thumb-image {
      img {
        width: 50px;
        height: 50px;
      }
    }
    .detail-title {
      .title {
        font-size: 26px;
        margin-bottom: 0;
      }
    }
    .detail-btn {
      button {
        font-size: 14px;
      }
    }
    .ration-name {
      width: 40%;
    }
  }
`;

const DetailsContent = ({ className = "" }) => {
  const [ration, setRation] = useState("");
  const [price, setPrice] = useState("");
  const params = useParams();
  const { slug } = params;
  const token = window.localStorage.getItem("accessToken");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getCount, handleSetGetCount } = useGetCount();

  useEffect(() => {
    async function getFoodDetail() {
      try {
        dispatch(getFoodDetails(slug));
      } catch (error) {
        console.log(error);
      }
    }
    getFoodDetail();
  }, [dispatch, slug]);

  const { foodDetails, avgReview, reviews } = useSelector(
    (state) => state.food
  );
  const [image, setImage] = useState("");

  useEffect(() => {
    if (foodDetails?.FoodId) {
      dispatch(getReviewFoodDetail({ foodid: foodDetails?.FoodId }));
    }
  }, [foodDetails?.FoodId, dispatch]);

  const getImage = (url) => {
    setImage(url);
  };

  // Get price default
  useEffect(() => {
    if (foodDetails) {
      const price = priceVN(foodDetails?.FoodPrices[0].FoodPrice);
      setPrice(price);
    }
  }, [foodDetails]);

  const handleSelectRation = (foodID, index) => {
    setRation(foodID);
    setPrice(priceVN(foodDetails?.FoodPrices[index]?.FoodPrice));
  };
  // Add cart
  const handleAddCart = () => {
    if (token || user) {
      dispatch(
        addCart({
          mactma: ration,
          count: getCount,
        })
      );
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
            }
          }
        } else if (result.isDenied) {
          navigate("/signup");
        }
      });
    }
  };

  const handleBuyNow = () => {
    if (token || user) {
      dispatch(
        addCart({
          mactma: ration,
          count: getCount,
        })
      );
      navigate("/order");
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
            }
          }
        } else if (result.isDenied) {
          navigate("/signup");
        }
      });
    }
  };

  return (
    <>
      {foodDetails && (
        <DetailsContentStyled className={className}>
          <div className="detail-image">
            <div className="image-big">
              <ProductImage
                className="h-full"
                url={image || foodDetails?.FoodThumb}
              ></ProductImage>
            </div>
            <DetailsThumb
              image={foodDetails?.FoodImages}
              className="thumb-image"
              getImage={getImage}
            ></DetailsThumb>
          </div>
          <div className="detail-content">
            <div className="detail-title">
              <ProductTitle className="title">
                {foodDetails?.FoodName}
              </ProductTitle>
            </div>
            <div className="detail-info">
              <div className="detail-rated">
                <span className="detail-count">{avgReview || 0}</span>
                <span className="text-yellow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <span className="detail-line"></span>
              <div className="detail-review">
                <div className="detail-count">{reviews?.length}</div>
                <div className="detail-evaluate">Đánh giá</div>
              </div>
            </div>
            <div className="detail-price">
              <ProductPrice sizeText="32px" className="mb-5">
                {price}
              </ProductPrice>
            </div>
            <div className="detail-ration">
              <span className="ration-name">Khẩu phần:</span>
              <ProductRation
                data={foodDetails?.FoodPrices}
                className="ration"
                handleSelectRation={handleSelectRation}
              ></ProductRation>
            </div>
            <div className="detail-quantity">
              <span className="quantity-name">Số lượng:</span>
              <Quantity
                name="count"
                handleSetGetCount={handleSetGetCount}
              ></Quantity>
            </div>
            <div className="detail-btn">
              <Button
                className=" hover:border-primary hover:bg-primary hover:text-white hover:transition-all"
                height="48px"
                kind="not-bg"
                onClick={handleAddCart}
              >
                Thêm vào giỏ
              </Button>
              <Button
                className="transition-all bg-transparent hover:opacity-80"
                height="48px"
                kind="primary"
                onClick={handleBuyNow}
              >
                Mua ngay
              </Button>
            </div>
          </div>
        </DetailsContentStyled>
      )}
    </>
  );
};
DetailsContent.propTypes = {
  className: PropTypes.string,
};

export default DetailsContent;
