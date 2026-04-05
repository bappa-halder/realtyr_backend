import yup from "yup";

export const userSchema = yup.object({
    userName: yup
        .string()
        .trim()
        .min(3, "UserName must be atleast 3 characters")
        .required(),

    phone: yup
        .string()
        .required("Mobile number is required")
        .matches(
            /^[6-9]\d{9}$/,
            "Mobile number must be a valid 10-digit Indian number"
        ),

    email: yup
        .string()
        .email("The email is not valid one")
        .required(),

    password: yup
        .string()
        .required('Please Enter your password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),

});