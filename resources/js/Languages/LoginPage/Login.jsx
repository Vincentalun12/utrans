import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        login_id: "Masuk",
        //email_id: "Email",
        password_id: "Kata Sandi",
        remember_id: "Ingat saya",
        forgot_id: "Lupa kata sandi?",
        error_emailfield_id: "Alamat email dibutuhkan di kolom ini.",
        error_passwordfield_id: "Kata sandi dibutuhkan di kolom ini.",
        error_loginfail_id: "Alamat email atau kata sandi tidak cocok dengan data kami."
    },
    en: {
        login_en: "Login",
        //email_en: "Email",
        password_en: "Password",
        remember_en: "Remember me",
        forgot_en: "Forgot your password?",
        error_emailfield_id: "The email field is required.",
        error_passwordfield_id: "The password field is required.",
        error_loginfail_id: "These credentials do not match our records."
    },
});

export default Language;