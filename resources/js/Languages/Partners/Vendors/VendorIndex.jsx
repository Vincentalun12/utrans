import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "title": "Vendor",
        "subtitle": "Kelola vendor Anda di sini",
        "addbutton": "Tambah",
        "searchplaceholder": "Cari vendor...",
        "tableheader": {
            "no": "Nomor",
            "name": "Nama",
            "address": "Alamat",
            "phone": "Nomor Telepon",
            "action": "Aksi",
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
            "header": "Informasi vendor",
            "code": "Kode vendor",
            "name": "Nama vendor",
            "email": "Email vendor",
            "phone": "Nomor Telepon vendor",
            "address": "Alamat vendor",
            "editbutton": "Ubah Detail",
            "closebutton": "Tutup",
        },
        "delete": {
            "header": "Notifikasi",
            "title": "Anda akan menghapus vendor ini!",
            "description": "Aksi ini tidak dapat dibatalkan. Namun, kami akan tetap simpan untuk keperluan audit.",
            "confirmbutton": "Hapus",
            "cancelbutton": "Batal",
        }
    },

    en: {
        "title": "Customers",
        "subtitle": "Manage your customers information here.",
        "addbutton": "Add",
        "searchplaceholder": "Search customers...",
        "tableheader": {
            "no": "No",
            "name": "Name",
            "address": "Address",
            "phone": "Phone Number",
            "action": "Action",
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
        "export": {
            "pdf": "Export to PDF",
            "csv": "Export to CSV",
        },
        "info": {
            "header": "Customer Information",
            "code": "Customer Code",
            "name": "Customer Name",
            "email": "Customer Email",
            "phone": " Customer Phone Number",
            "address": "Customer Address",
            "editbutton": "Edit Detail",
            "closebutton": "Close",
        },
        "delete": {
            "header": "Notification",
            "title": "You will delete this customer!",
            "description": "This action cannot be undone. However, we will still keep it for audit purposes.",
            "confirmbutton": "Delete",
            "cancelbutton": "Cancel",
        }

    },
});

export { Language };