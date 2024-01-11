/** @format */

export default function selectState(state) {
  switch (state) {
    case 0:
      return "Chờ xác nhận";
    case 1:
      return "Đang thực hiện";
    case 2:
      return "Đã hoàn thành";
    case 3:
      return "Đã hủy";
    default:
      break;
  }
}
