import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "header": {
            "title": "Ubah Journal Entries",
            "subtitle": "Ubah catatan kronologi transaksi anda di sini, mohon jangan mengubah data jika tidak perlu.",
        },
        "journal": {
            "name": "Jurnal",
            "description": "* Pilih jurnal dari bawah ini",
        },
        "reference": {
            "name": "Referensi",
            "description": "* Masukkan referensi",
            "placeholder": "Referensi",
        },
        "status": {
            "name": "Status",
            "description": "* Pilih status dari bawah ini",
        },
        "date": {
            "name": "Tanggal",
            "description": "* Tanggal akan otomatis terisi dengan tanggal hari ini. Anda dapat mengubahnya jika diinginkan.",
        },
        "account": {
            "name": "Akun",
            "description": "* Pilih akun dari bawah ini",
        },
        "table": {
            "account": "Account",
            "label": "Label",
            "debit": "Debit",
            "credit": "Credit",
            "deletetooltip": "Hapus",
        },
        "submitbutton": "Submit",
        "cancelbutton": "Batal",
    },

    en: {
        "header": {
            "title": "Edit Journal Entries",
            "subtitle": "Edit your custom Journal Entries here, please do not change the data if it is not necessary.",
        },
        "journal": {
            "name": "Journal",
            "description": "* Select the journal from below",
        },
        "reference": {
            "name": "Reference",
            "description": "* Provide the reference",
            "placeholder": "Reference",
        },
        "status": {
            "name": "Status",
            "description": "* Select the status from below",
        },
        "date": {
            "name": "Date",
            "description": "* Date are automatically filled with today's date. You can change it if you want to.",
        },
        "account": {
            "name": "Account",
            "description": "* Select the account from below",
        },
        "table": {
            "account": "Account",
            "label": "Label",
            "debit": "Debit",
            "credit": "Credit",
            "deletetooltip": "Delete",
        },
        "submitbutton": "Submit",
        "cancelbutton": "Cancel",
    },
});

export { Language };