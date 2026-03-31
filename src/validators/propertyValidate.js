import yup from "yup"

export const propertyValidateSchema = yup.object({

  title: yup
    .string()
    .trim()
    .min(3, "Title must be at least 5 characters")
    .max(10, "Title must be at most 20 characters")
    .required("Title is required"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),

  location: yup
    .string()
    .trim()
    .required("Location is required"),

  bedroom: yup
    .number()
    .typeError("Bedroom must be a number")
    .integer("Bedroom must be an integer")
    .min(1, "Bedroom cannot be negative")
    .required("Bedroom is required"),

  bathroom: yup
    .number()
    .typeError("Bathroom must be a number")
    .integer("Bathroom must be an integer")
    .min(1, "Bathroom cannot be negative")
    .required("Bathroom is required"),

  area: yup
    .number()
    .typeError("Area must be a number")
    .positive("Area must be greater than 0")
    .required("Area is required"),

  purpose: yup
    .string()
    .trim()
    .oneOf(["rent", "sale"], "Purpose must be either rent or sale")
    .required("Purpose is required"),
});