/** @format */

export default function priceVN(price) {
  const priceVN = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return priceVN;
}
