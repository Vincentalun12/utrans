import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "header": {
            "title": "Jurnal",
            "subtitle": "Kelola jurnal Anda di sini",
        },
        "addbutton": "Tambah",
        "searchplaceholder": "Cari Jurnal...",
        "tableheader": {
            "code": "Kode Singkat",
            "journalname": "Nama Jurnal",
            "journaltype": "Tipe Jurnal",
            "Accountname": "Nama Akun",
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
            "header": "Detail Jurnal",
            "code": "Kode",
            "account_name": "Nama Akun",
            "type": "Type",
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
            "title": "Journals",
            "subtitle": "Manage your Journals here",
        },
        "addbutton": "Add",
        "searchplaceholder": "Search Journal...",
        "tableheader": {
            "code": "Short Code",
            "journalname": "Journal Name",
            "journaltype": "Journal Type",
            "Accountname": "Account Name",
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
            "header": "Journal Details",
            "code": "Code",
            "account_name": "Account Name",
            "type": "Type",
            "createdat": "Created At",
            "editedat": "Edited At",
            "editbutton": "Edit Detail",
            "closebutton": "Close",
        },
        "delete": {
            "header": "Notification",
            "title": "You will delete this journal!",
            "description": "This action cannot be undone. However, we will still keep it for audit purposes.",
            "confirmbutton": "Delete",
            "cancelbutton": "Cancel",
        }
    },
});

export { Language };