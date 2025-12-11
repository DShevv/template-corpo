
export function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const formatted = new Date(date).toLocaleDateString("ru-RU", options);
  return formatted.replace(" г.", "");
}


export function formatPhone(phone: string) {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly;
}