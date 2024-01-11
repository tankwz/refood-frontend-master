/** @format */

import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function useNotification() {
  function notifySuccess(message) {
    return Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  }
  function notifyError(message) {
    return toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
  return {
    notifySuccess,
    notifyError,
  };
}
