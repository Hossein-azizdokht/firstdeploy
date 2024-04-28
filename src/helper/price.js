function NumberWithCommas(x) {
  const t = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return t;
}
export default NumberWithCommas;

export function NumberRemoveCommas(x) {
  const t = x.toString().replace(",", "");
  return t;
}
