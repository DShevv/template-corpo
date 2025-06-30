import * as Yup from "yup";

export const feedbackValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов")
    .required("Обязательное поле"),
  phone: Yup.string()
    .min(19, "Неверный формат")
    .max(19, "Неверный формат")
    .required("Обязательное поле"),
  email: Yup.string()
    .email("Введите корректный email")
    .required("Обязательное поле"),
  comment: Yup.string()
    .max(500, "Комментарий не должен превышать 500 символов"),
}); 