export const formatPrice = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";

export const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().trim();
