import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "title": "Buat Jurnal Kustom",
        "description": "Buat data jurnal kustom anda. Mohon jangan mengubah data jika tidak perlu.",
        "accounttype": {
            "name": "Tipe Akun",
            "description": "Pilih tipe akun dari bawah ini",
        },
        "chartofaccounttype": {
            "name": "Chart of Account Type",
            "description": "Pilih tipe chart of account dari bawah ini",
        },
        "journalname": {
            "name": "Nama Jurnal",
            "description": "* Silahkan isi nama jurnal",
            "placeholder": "Nama",
        },
        "codename": {
            "name": "Nama Kode",
            "description": "* Silahkan isi nama kode, kosongkan jika diinginkan.",
            "placeholder": "Nama Kode",
        },
        "savebutton": "Simpan", 
    },

    en: {
        "title": "Create Custom Journal",
        "description": "Create your custom journal data. Please do not change the data if it is not necessary.",
        "accounttype": {
            "name": "Journal Type",
            "description": "Select the account type from below",
        },
        "chartofaccounttype": {
            "name": "Chart of Account",
            "description": "Select the chart of account type from below",
        },
        "journalname": {
            "name": "Journal Name",
            "description": "* Provide the journal name",
            "placeholder": "Name",
        },
        "codename": {
            "name": "Code Name",
            "description": "* Provide the code name, leave blank if unknown.",
            "placeholder": "Code Name",
        },
        "savebutton": "Save", 
    },
});

export { Language };