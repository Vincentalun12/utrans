import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        login_id: "Masuk",
        email_id: "Email",
        password_id: "Kata Sandi",
        remember_id: "Ingat Saya",
        forgot_id: "Lupa kata sandi?",
    },
    en: {
        login_en: "Login",
        email_en: "Email",
        password_en: "Password",
        remember_en: "Remember me",
        forgot_en: "Forgot your password?",
    },
});

export default Language;