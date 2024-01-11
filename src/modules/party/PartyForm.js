/** @format */

import { Button } from "components/button";
import { Input } from "components/input";
import { Label } from "components/label";
import { Textarea } from "components/textarea";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "components/error";
import { useDispatch, useSelector } from "react-redux";
import { createParty } from "store/party/slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import priceVN from "utils/priceVN";
import { useCart } from "contexts/cart-context";
import { useState } from "react";
import formatIsoString from "utils/formatIsoString";

const schema = yup.object({
  place: yup.string().required("Vui lòng nhập địa điểm đặt tiệc"),
  type: yup.string().required("Vui lòng nhập loại tiệc"),
  numberoftable: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Vui lòng nhập số bàn")
    .nullable(),
  timestart: yup
    .date()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Vui lòng chọn thời gian đãi tiệc"),
});

const PartyForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [tableNumber, setTableNumber] = useState(0);
  const [total] = useCart();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successParty } = useSelector((state) => state.party);

  useEffect(() => {
    if (successParty) {
      navigate("/user/party");
    }
  }, [successParty, navigate]);

  useEffect(() => {
    if (tableNumber) {
      setValue("numberoftable", Number(tableNumber));
    }
  }, [setValue, tableNumber]);

  const handleSubmitParty = (values) => {
    if (!isValid) return null;
    const formData = new FormData();
    formData.append("place", values.place);
    formData.append("type", values.type);
    formData.append("numberoftable", Number(tableNumber));
    formData.append("partynote", values.partynote);

    const result = formatIsoString(values.timestart);
    formData.append("timestart", result);

    try {
      Swal.fire({
        timer: 2000,
        icon: "info",
        title: "Chờ giây lát!",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {
        dispatch(createParty(formData));
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className="lg:w-[700px] px-8 py-10 lg:border lg:border-line lg:rounded-md md:border md:border-line md:rounded-md"
        onSubmit={handleSubmit(handleSubmitParty)}
      >
        <div className="flex justify-center pb-3 mb-4 lg:border-b lg:border-b-line lg:flex lg:justify-start">
          <h3 className="text-2xl font-bold uppercase text-primary">
            Đặt tiệc
          </h3>
        </div>
        <div className="flex flex-wrap items-start justify-center gap-6 mb-5">
          <div className="flex flex-col gap-3">
            <div className="w-[300px] flex flex-col gap-3">
              <Label htmlFor="place">Địa điểm đãi tiệc</Label>
              <Input
                type="text"
                name="place"
                placeholder="Nhập địa điểm đãi tiệc"
                control={control}
              ></Input>
            </div>
            <ErrorMessage message={errors.place?.message}></ErrorMessage>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-[300px] flex flex-col gap-3">
              <Label htmlFor="type">Loại tiệc</Label>
              <Input
                type="text"
                name="type"
                placeholder="Nhập loại tiệc"
                control={control}
              ></Input>
            </div>
            <ErrorMessage message={errors.type?.message}></ErrorMessage>
          </div>
        </div>
        <div className="flex flex-wrap items-start justify-center gap-6">
          <div className="flex flex-col gap-3">
            <div className="w-[300px] flex flex-col gap-3">
              <Label htmlFor="numberoftable">Số bàn</Label>
              <Input
                type="number"
                name="table"
                placeholder="Nhập số bàn đặt tiệc"
                onChange={(e) => {
                  setTableNumber(e.target.value);
                }}
                value={tableNumber > 0 && tableNumber}
                control={control}
              ></Input>
            </div>
            <ErrorMessage
              message={errors.numberoftable?.message}
            ></ErrorMessage>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-[300px] flex flex-col gap-3">
              <Label htmlFor="type">Thời gian đãi tiệc</Label>
              <Input
                type="datetime-local"
                name="timestart"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                control={control}
              ></Input>
            </div>
            <ErrorMessage message={errors.timestart?.message}></ErrorMessage>
          </div>
        </div>
        <div className="flex justify-start w-full mt-6 lg:justify-center">
          <div className="w-full ">
            <Textarea
              name="partynote"
              control={control}
              height="100px"
              placeholder="Nhập ghi chú"
            ></Textarea>
          </div>
        </div>
        <div className="flex items-center justify-between mt-5">
          <div>
            <span className="text-lg font-semibold text-text">Tổng tiền: </span>
            <span className="text-lg font-medium text-redPrimary">
              {priceVN(tableNumber > 0 ? total * Number(tableNumber) : total)}
            </span>
          </div>
          <Button kind="primary" height="44px" type="submit">
            Đặt tiệc ngay
          </Button>
        </div>
      </form>
    </>
  );
};

export default PartyForm;
