/** @format */

export default function formatHourDate(date) {
  const pad = (n) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
  return (
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ", " +
    pad(date.getDate()) +
    "/" +
    pad(date.getMonth() + 1) +
    "/" +
    date.getFullYear()
  );
}
