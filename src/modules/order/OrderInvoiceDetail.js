/** @format */

import { Button } from "components/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceDetail } from "store/order/slice";
import formatToDate from "utils/formatDate";
import priceVN from "utils/priceVN";

const OrderInvoiceDetail = ({ closeModal, invoiceid }) => {
  const dispatch = useDispatch();
  const { invoiceDetail } = useSelector((state) => state.order);
  useEffect(() => {
    function fetchInvoiceId() {
      if (invoiceid) {
        dispatch(getInvoiceDetail(invoiceid));
      }
    }
    fetchInvoiceId();
  }, [dispatch, invoiceid]);

  const handleExportPDF = () => {
    const invoice = document.getElementById("element-to-print");
    html2canvas(invoice, {
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save(`${invoiceDetail?.InvoiceID}.pdf`);
    });
    closeModal();
  };

  return (
    <>
      <div className="flex justify-center w-full px-2" id="element-to-print">
        <div className="flex flex-col gap-2 pt-4 lg:w-[500px] md:[500px] w-[300px]">
          <h3 className="text-xl font-bold text-center uppercase text-text">
            Refood
          </h3>
          <span className="text-xs text-center text-text">
            ĐC: đường 3/2, phường Hưng Lợi, quận Ninh Kiều, thành phố Cần Thơ
          </span>
          <span className="text-xs text-center text-text">
            ĐT: 0987-111-530
          </span>
          <h3 className="py-2 text-2xl font-bold text-center uppercase text-text">
            Hóa đơn
          </h3>
          <div className="text-sm text-text">
            <span>KH: {invoiceDetail?.InvoicePlace}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-text">
            <span>Ngày: {formatToDate(invoiceDetail?.InvoicePaidTime)}</span>
            <span>Mã đơn hàng: {invoiceDetail?.InvoiceOrderID}</span>
          </div>
          <div className="flex items-center justify-between mb-2 text-sm text-text">
            <span>Thanh toán: VNPAY</span>
            <span>Mã hóa đơn: {invoiceDetail?.InvoiceID}</span>
          </div>
          <div className="border border-line">
            <table>
              <thead>
                <tr>
                  <th>Đơn hàng</th>
                  <th>SL</th>
                  <th>Giá</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {invoiceDetail?.InvoiceDetail.length > 0 &&
                  invoiceDetail?.InvoiceDetail.map((item) => (
                    <tr key={item.FoodId}>
                      <td>{item.FoodName}</td>
                      <td>{item.FoodQuantity}</td>
                      <td>{priceVN(item.FoodPrice)}</td>
                      <td>{priceVN(item.Total)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4 text-sm text-text">
            <strong>Thành tiền:</strong>
            <span>{priceVN(invoiceDetail?.InvoiceSubTotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-text">
            <strong>Phí giao hàng:</strong>
            <span>{priceVN(0)}</span>
          </div>
          <div className="flex items-center justify-between mb-4 text-sm text-text">
            <strong>Tổng:</strong>
            <span>{priceVN(invoiceDetail?.InvoiceSubTotal + 0)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button kind="not-bg" height="44px" onClick={closeModal}>
          Thoát
        </Button>

        <Button kind="primary" height="44px" onClick={handleExportPDF}>
          Xuất PDF
        </Button>
      </div>
    </>
  );
};

export default OrderInvoiceDetail;
