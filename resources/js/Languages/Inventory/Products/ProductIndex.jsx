import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "title": "Produk",
        "subtitle": "Kelola produk Anda di sini",
        "addbutton": "Tambah",
        "searchplaceholder": "Cari produk...",
        "tableheader": {
            "SKU": "SKU",
            "Name": "Nama Produk",
            "Brand": "Merek",
            "salesprice": "Harga Jual",
            "COGS": "COGS",
            "Stock": "Stok",
            "Action": "Aksi",
        },
        "tableaction": {
            "view": "Lihat Produk",
            "edit": "Ubah Produk",
            "delete": "Hapus Produk",
        },
        "pagination": {
            "previous": "Sebelumnya",
            "next": "Next",
            "page": "Page",
            "of": "of",
        },
        "export": {
            "pdf": "Export to PDF",
            "csv": "Export to CSV",
        },
        "info": {
            "header": "Informasi Produk",
            "code": "Kode Produk",
            "name": "Nama Produk",
            "stock": "Stok",
            "salesprice": "Harga Jual",
            "standardprice": "Harga Standar",
            "createdat": "Dibuat Pada",
            "editedat": "Terakhir Diubah Pada",
            "editbutton": "Ubah Detail",
            "closebutton": "Tutup",
        },
        "delete": {
            "header": "Notifikasi",
            "title": "Anda akan menghapus produk ini!",
            "description": "Aksi ini tidak dapat dibatalkan. Namun, kami akan tetap simpan untuk keperluan audit.",
            "confirmbutton": "Hapus",
            "cancelbutton": "Batal",
        }
    },

    en: {
        "title": "Products",
        "subtitle": "Manage your products here",
        "addbutton": "Add",
        "searchplaceholder": "Search products...",
        "tableheader": {
            "SKU": "SKU",
            "Name": "Name",
            "Brand": "Brand",
            "salesprice": "Sales Price",
            "COGS": "COGS",
            "Stock": "Stock",
            "Action": "Action",
        },
        "tableaction": {
            "view": "View Item",
            "edit": "Edit Item",
            "delete": "Delete Item",
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
            "header": "Products Detail",
            "code": "Product Code",
            "name": "Product Name",
            "stock": "Stock",
            "salesprice": "Sales Price",
            "standardprice": "Standard Price",
            "createdat": "Created At",
            "editedat": "Edited At",
            "editbutton": "Edit Detail",
            "closebutton": "Close",
        },
        "delete": {
            "header": "Notification",
            "title": "You're about to delete this product!",
            "description": "This action cannot be undone. However, we will still keep it for audit purposes.",
            "confirmbutton": "Delete",
            "cancelbutton": "Cancel",
        }
    },
});

export { Language };