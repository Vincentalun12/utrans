import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "title": "Penjualan",
        "subtitle": "Buat, Kelola, dan Lihat penjualan anda di sini",
        "addbutton": "Buat",
        "searchplaceholder": "Cari penjualan...",
        "tableheader": {
            "reference": "reference",
            "creationdate": "Creation date",
            "vendor": "Vendor",
            "totalitem": "Total Barang",
            "total": "Total",
            "paid": "Dibayarkan",
            "status": "Status",
            "payment": "Status Pembayaran",
            "due": "Sisa Pembayaran",
            "Action": "Aksi",
        },
        "action": {
            "salesdetail": "Detail Penjualan",
            "editsales": "Ubah Data Penjualan",
            "createpayment": "Buat Pembayaran",
            "showpayment": "Lihat Pembayaran",
            "downloadpdf": "Unduh PDF",
            "deletesales": "Hapus Penjualan",
        },
        "pagination": {
            "previous": "Sebelumnya",
            "next": "Selanjutnya",
            "page": "Halaman",
            "of": "dari",
        },
        "export": {
            "pdf": "Cetak menjadi PDF",
            "csv": "Ekspor menjadi CSV",
        },
        "createpayment": {
            "header": "Buat Pembayaran",
            "paymenttype": {
                "title": "Tipe Pembayaran",
                "description": "* Pilih tipe pembayaran",
            },
            "paymentdate": {
                "title": "Tanggal Pembayaran",
                "description": "* Pilih tanggal pembayaran",
            },
            "payingamount": {
                "title": "Jumlah Pembayaran",
                "description": "* Masukkan jumlah pembayaran",
            },
            "receivedamount": {
                "title": "Jumlah Diterima",
                "description": "* Input your received amount",
            },
            "reference": {
                "title": "Referensi",
                "description": "* Buat referensi anda sendiri, contoh: INV/2023/11/001",
            },
            "additionalnote": {
                "title": "Catatan Tambahan",
                "description": "* Buat catatan tambahan untuk pembayaran ini",
            },
            "submitbutton": "Buat",
            "closebutton": "Tutup",
        },
        "delete": {
            "header": "Notifikasi",
            "title": "Anda akan menghapus data penjualan ini!",
            "description": "Aksi ini tidak dapat dibatalkan. Namun, kami akan tetap simpan untuk keperluan audit.",
            "confirmbutton": "Hapus",
            "cancelbutton": "Batal",
        }
    },

    en: {
        "title": "Sales",
        "subtitle": "Create, Manage, and View your sales here",
        "addbutton": "Create",
        "searchplaceholder": "Search sales...",
        "tableheader": {
            "reference": "reference",
            "creationdate": "Creation date",
            "vendor": "Vendor",
            "totalitem": "Total Item",
            "total": "Total",
            "paid": "Paid",
            "status": "Status",
            "payment": "Payment",
            "due": "Sisa Pembayaran",
            "Action": "Action",
        },
        "action": {
            "salesdetail": "Sales Detail",
            "editsales": "Edit Sales",
            "createpayment": "Create Payment",
            "showpayment": "Show Payment",
            "downloadpdf": "Download PDF",
            "deletesales": "Delete Sales",
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
        "createpayment": {
            "header": "Create Payment",
            "paymenttype": {
                "title": "Payment Type",
                "description": "* Select your payment type",
            },
            "paymentdate": {
                "title": "Payment Date",
                "description": "* Select your payment date",
            },
            "payingamount": {
                "title": "Paying Amount",
                "description": "* Input your paying account",
            },
            "receivedamount": {
                "title": "Received Amount",
                "description": "* Input your received amount",
            },
            "reference": {
                "title": "Reference",
                "description": "* Create your own reference, example: INV/2023/11/001",
            },
            "additionalnote": {
                "title": "Additional Note",
                "description": "* Set some additional note for this payment",
            },
            "submitbutton": "Submit",
            "closebutton": "Close",
        },
        "delete": {
            "header": "Notification",
            "title": "You're about to delete this sales!",
            "description": "This action cannot be undone. However, we will still keep it for audit purposes.",
            "confirmbutton": "Confirm Deletion",
            "cancelbutton": "Cancel",
        }
    },
});

export { Language };