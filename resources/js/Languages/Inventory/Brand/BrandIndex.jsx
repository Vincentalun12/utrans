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
            "page": "Halaman",
            "of": "dari",
        },
        "export": {
            "pdf": "Ekspor ke PDF",
            "csv": "Ekspor ke CSV",
        },
        "info": {
            "header": "Informasi Merek",
            "code": "Kode Merek",
            "name": "Nama Merek",
            "email": "Email Merek",
            "phone": "Nomor Telepon Merek",
            "createdat": "Dibuat Pada",
            "editedat": "Terakhir Diubah Pada",
            "editbutton": "Ubah Detail",
            "closebutton": "Tutup",
        },
        "delete": {
            "header": "Notifikasi",
            "title": "Anda akan menghapus pelanggan ini!",
            "description": "Aksi ini tidak dapat dibatalkan. Namun, kami akan tetap simpan untuk keperluan audit.",
            "confirmbutton": "Hapus",
            "cancelbutton": "Batal",
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
            "page": "Halaman",
            "of": "dari",
        },
        "export": {
            "pdf": "Export to PDF",
            "csv": "Export to CSV",
        },
        "info": {
            "header": "Brand Information",
            "code": "Brand Code",
            "name": "Brand Name",
            "email": "Brand Email",
            "phone": "Brand Phone Number",
            "createdat": "Created At",
            "editedat": "Edited At",
            "editbutton": "Edit Detail",
            "closebutton": "Close",
        },
        "delete": {
            "header": "Notification",
            "title": "You will delete this brand!",
            "description": "This action cannot be undone. However, we will still save it for audit purposes.",
            "confirmbutton": "Delete",
            "cancelbutton": "Cancel",
        }

    },
});

export { Language };