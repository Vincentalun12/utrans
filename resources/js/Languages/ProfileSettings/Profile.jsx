import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "profile": {
            "header": "Informasi Profil",
            "description": "Perbarui informasi profil dan alamat email akun Anda.",
            "name": "Nama",
            "email": "Email",
            "updatebutton": "Perbarui Profil",
            "unverified": "Alamat email Anda belum terverifikasi.",
            "resendbutton": "Klik di sini untuk mengirim ulang email verifikasi.",
            "verificationlink": "Tautan verifikasi baru telah dikirim ke alamat email Anda.",
            "saved": "Profil berhasil diperbarui!",
        },
        "password": {
            "header": "Perbarui Kata Sandi",
            "description": "Pastikan akun Anda menggunakan kata sandi yang panjang dan acak untuk tetap aman.",
            "currentpassword": "Kata Sandi Saat Ini",
            "newpassword": "Kata Sandi Baru",
            "confirmpassword": "Konfirmasi Kata Sandi",
            "updatebutton": "Perbarui Kata Sandi",
            "success": "Kata sandi berhasil diperbarui!",
        },
        "delete": {
            "header": "Penghapusan Akun",
            "description": "Hapus akun Anda secara permanen. Jika Anda ingin melanjutkan, silakan hubungi operator.",
            "deletebutton": "Hapus Akun",
            "prompt": "Apakah Anda yakin ingin menghapus akun Anda?",
            "promptdesc": "Setelah akun Anda dihapus, semua sumber daya dan data akan dihapus secara permanen. Masukkan kata sandi Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun Anda secara permanen.",
            "confirmbutton": "Hapus Akun",
            "cancelbutton": "Batal",
        },
    },
    en : {
        "profile": {
            "header": "Profile Information",
            "description": "Update your account's profile information and email address.",
            "name": "Name",
            "email": "Email",
            "updatebutton": "Update Profile",
            "unverified": "Your email address is unverified.",
            "resendbutton": "Click here to re-send the verification email.",
            "verificationlink": "A new verification link has been sent to your email address.",
            "saved": "Profile updated successfully!",
        },
        "password": {
            "header": "Update Password",
            "description": "Ensure your account is using a long, random password to stay secure.",
            "currentpassword": "Current Password",
            "newpassword": "New Password",
            "confirmpassword": "Confirm Password",
            "updatebutton": "Update Password",
            "success": "Password updated successfully!",
        },
        "delete": {
            "header": "Account Deletion",
            "description": "Permanently delete your account. If you wish to proceed, please contact operator.",
            "deletebutton": "Delete Account",
            "prompt": "Are you sure you want to delete your account?",
            "promptdesc": "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.",
            "confirmbutton": "Delete Account",
            "cancelbutton": "Cancel",
        },
    },
});

export { Language };