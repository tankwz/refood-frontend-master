/** @format */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ProductItem from "./ProductItem";
import PropTypes from "prop-types";

const ProductList = ({ data, className = "" }) => {
  return (
    <div className={`product-list ${className}`}>
      <>
        <Swiper
          grabCursor={"true"}
          spaceBetween={40}
          slidesPerView={"auto"}
          navigation={true}
          modules={[Navigation]}
        >
          {data?.length > 0 &&
            data.map((food) => {
              return (
                <SwiperSlide key={food.FoodSlug}>
                  <ProductItem data={food}></ProductItem>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </>
    </div>
  );
};
ProductList.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
};

export default ProductList;
