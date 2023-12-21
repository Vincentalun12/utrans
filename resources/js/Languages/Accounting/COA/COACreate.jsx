import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "title": "Buat Bagan Akun (COA)",
        "description": "Buat data bagan akun anda. Mohon jangan mengubah data jika tidak perlu.",
        "journaltype": {
            "name": "Tipe Jurnal",
            "description": "Pilih tipe jurnal dari bawah ini",
            "placeholder": "Pilih Tipe Jurnal",
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
        "title": "Create Chart of Account",
        "description": "Create your chart of account data. Please do not change the data if it is not necessary.",
        "journaltype": {
            "name": "Journal Type",
            "description": "Select the journal type from below",
            "placeholder": "Select Journal Type",
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