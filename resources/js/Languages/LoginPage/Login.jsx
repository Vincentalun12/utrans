import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        login: "Masuk",
        password: "Kata Sandi",
        remember: "Ingat saya",
        forgot: "Lupa kata sandi?",
        error_emailfield: "Alamat email dibutuhkan di kolom ini.",
        error_passwordfield: "Kata sandi dibutuhkan di kolom ini.",
        error_loginfail: "Alamat email atau kata sandi tidak cocok dengan data kami."
    },
    en: {
        login: "Login",
        password: "Password",
        remember: "Remember me",
        forgot: "Forgot your password?",
        error_emailfield: "The email field is required.",
        error_passwordfield: "The password field is required.",
        error_loginfail: "These credentials do not match our records."
    },
});

export { Language };