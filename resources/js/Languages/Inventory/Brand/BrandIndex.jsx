import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "title": "Merek",
        "subtitle": "Kelola merek Anda di sini",
        "addbutton": "Tambah",
        "searchplaceholder": "Cari merek...",
        "tableheader": {
            "code": "Kode",
            "Name": "Nama",
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
        },
        "export": {
            "pdf": "Ekspor ke PDF",
            "csv": "Ekspor ke CSV",
        }
    },

    en: {
        "title": "Brand",
        "subtitle": "Manage your brands here",
        "addbutton": "Add",
        "searchplaceholder": "Search brand...",
        "tableheader": {
            "code": "Code",
            "Name": "Name",
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
        },
        "export": {
            "pdf": "Export to PDF",
            "csv": "Export to CSV",
        }

    },
});

export { Language };