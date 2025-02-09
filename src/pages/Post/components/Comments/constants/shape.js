import * as yup from "yup";
export const shapeObject = {
  comment: yup
    .string()
    .min(10, "Минимальный размер комментария - 10 символов.")
    .max(1000, "Длина символов в комментарии не может превышать 1000 символов."),
};
