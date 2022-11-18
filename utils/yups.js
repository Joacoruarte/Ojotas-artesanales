import * as yup from 'yup';
export const registerSchema = yup.object().shape({
    name: yup.string().required("El nombre es obligatorio"),
    email: yup.string().email("Debes ingresar un mail valido").required("El email es obligatorio"),
    password: yup.string().min(6 , "La contraseña debe tener al menos 6 caracteres").max(32 , "La contraseña debe tener maximo 32 caracteres").required("La contraseña es obligatoria"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Las contraseñas no coinciden").required()
});

export const loginSchema = yup.object().shape({
    email: yup.string().email("Debes ingresar un mail valido").required("El email es obligatorio"),
})