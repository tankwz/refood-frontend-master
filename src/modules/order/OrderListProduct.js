/** @format */

import ProductImage from "modules/products/ProductImage";
import ProductPrice from "modules/products/ProductPrice";
import ProductTitle from "modules/products/ProductTitle";
import React from "react";
import priceVN from "utils/priceVN";

const OrderListProduct = ({ data }) => {
  return (
    <div className="flex justify-start gap-5 pb-2 pr-2 border-b border-b-line">
      <div className="max-w-[56px] max-h-[56px] w-full h-auto rounded-md">
        <ProductImage url={data.FoodThumb}></ProductImage>
      </div>
      <div className="flex items-start justify-between w-full">
        <div>
          <div>
            <ProductTitle>
              {data.FoodName.length > 10
                ? data.FoodName.slice(0, 10) + "..."
                : data.FoodName}
            </ProductTitle>
          </div>
          <span className="text-xs font-light text-text1">
            Số lượng: {data.FoodDishCount}
          </span>
        </div>
        <div className="flex items-start justify-between gap-3 lg:gap-10">
          <div className="px-2 py-1 text-xs font-medium text-center border rounded lg:py-2 lg:px-3 lg:text-sm text-primary bg-bgPrimary border-primary">
            {data.FoodRation} người
          </div>
          <div className="cl-subtotal">
            <ProductPrice>{priceVN(data.FoodPrice)}</ProductPrice>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListProduct;
