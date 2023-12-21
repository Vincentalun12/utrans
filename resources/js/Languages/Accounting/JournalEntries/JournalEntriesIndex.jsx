import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "header": {
            "title": "Catatan Kronologi Transaksi (Journal Entries)",
            "subtitle": "Kelola catatan kronologi transaksi anda di sini",
        },
        "addbutton": "Tambah",
        "searchplaceholder": "Cari...",
        "tableheader": {
            "date": "Tanggal",
            "number": "Nomor Jurnal",
            "reference": "Referensi",
            "journal": "Jurnal",
            "status": "Status",
            "Action": "Action",
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
        "delete": {
            "header": "Notifikasi",
            "title": "Anda akan menghapus catatan kronologi transaksi ini!",
            "description": "Aksi ini tidak dapat dibatalkan. Namun, kami akan tetap simpan untuk keperluan audit.",
            "confirmbutton": "Hapus",
            "cancelbutton": "Batal",
        }
    },

    en: {
        "header": {
            "title": "Journal Entries",
            "subtitle": "Manage your Journal Entries here",
        },
        "addbutton": "Add",
        "searchplaceholder": "Search Journal Entries...",
        "tableheader": {
            "date": "Date",
            "number": "Journal Number",
            "reference": "Reference",
            "journal": "Journal",
            "status": "Status",
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
        "delete": {
            "header": "Notification",
            "title": "You will delete this journal entries!",
            "description": "This action cannot be undone. However, we will still keep it for audit purposes.",
            "confirmbutton": "Delete",
            "cancelbutton": "Cancel",
        }
    },
});

export { Language };