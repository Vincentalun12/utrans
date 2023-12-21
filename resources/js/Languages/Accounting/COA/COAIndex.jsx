import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "header": {
            "title": "Bagan Akun (COA)",
            "subtitle": "Kelola bagan akun anda di sini",
        },
        "addbutton": "Tambah",
        "searchplaceholder": "Cari COA...",
        "tableheader": {
            "code": "Kode",
            "account_name": "Nama Akun",
            "account_type": "Tipe Akun",
            "balance": "Saldo",
            "Action": "Aksi",
        },
        "tableaction": {
            "view": "Lihat",
            "edit": "Ubah",
            "delete": "Hapus",
        },
        "pagination": {
            "previous": "Sebelumnya",
            "next": "Selanjutnya",
            "page": "Halaman",
            "of": "dari",
        },
        "detail": {
            "header": "Informasi Bagan Akun (COA)",
            "code": "Kode",
            "account_name": "Nama Akun",
            "account_type": "Tipe Akun",
            "balance": "Saldo",
            "createdat": "Dibuat Pada",
            "editedat": "Terakhir Diubah Pada",
            "editbutton": "Ubah Detail",
            "closebutton": "Tutup",
        },
        "delete": {
            "header": "Notifikasi",
            "title": "Anda akan menghapus COA ini!",
            "description": "Aksi ini tidak dapat dibatalkan. Namun, kami akan tetap simpan untuk keperluan audit.",
            "confirmbutton": "Hapus",
            "cancelbutton": "Batal",
        }
    },

    en: {
        "header": {
            "title": "Chart of Accounts",
            "subtitle": "Manage your chart of accounts here",
        },
        "addbutton": "Add",
        "searchplaceholder": "Search COA...",
        "tableheader": {
            "code": "Code",
            "account_name": "Account Name",
            "account_type": "Account Type",
            "balance": "Balance",
            "Action": "Action",
        },
        "tableaction": {
            "view": "View",
            "edit": "Edit",
            "delete": "Delete",
        },
        "pagination": {
            "previous": "Previous",
            "next": "Next",
            "page": "Page",
            "of": "of",
        },
        "detail": {
            "header": "COA Information",
            "code": "Code",
            "account_name": "Account Name",
            "account_type": "Account Type",
            "balance": "Balance",
            "createdat": "Created At",
            "editedat": "Edited At",
            "editbutton": "Edit Detail",
            "closebutton": "Close",
        },
        "delete": {
            "header": "Notification",
            "title": "You will delete this COA!",
            "description": "This action cannot be undone. However, we will still keep it for audit purposes.",
            "confirmbutton": "Delete",
            "cancelbutton": "Cancel",
        }
    },
});

export { Language };