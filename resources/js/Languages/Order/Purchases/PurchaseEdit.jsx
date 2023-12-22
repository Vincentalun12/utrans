import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    
    id: {
        "header": {
            "title": "Ubah Data Pembelian",
            "subtitle": "Ubah data pembelian anda. Disarankan untuk tidak mengubah data jika tidak perlu",
        },
        "vendor": {
            "name": "Vendor/Supplier",
            "description": "* Pilih vendor/supplier dari bawah ini",
        },
        "reference": {
            "name": "Referensi",
            "description": "* Masukkan nomor referensi",
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
        "productname": {
            "name": "Nama Produk",
            "description": "* Pilih produk dari bawah ini",
        },
        "table": {
            "SKU": "SKU",
            "item": "Nama Barang",
            "quantity": "Kuantitas",
            "unitprice": "Harga Satuan",
            "discount": "Diskon",
            "total": "Total",
            "deletetooltip": "Hapus",
        },
        "submitbutton": "Ubah",
        "cancelbutton": "Batal",
    },

    en: {
        "header": {
            "title": "Edit Purchases Data",
            "subtitle": "Edit your purchases data. This data will be used when you create a purchase invoice.",
        },
        "vendor": {
            "name": "Vendor",
            "description": "* Select the vendors from below",
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
        "productname": {
            "name": "Product Name",
            "description": "* Pick up the products from below",
        },
        "table": {
            "SKU": "SKU",
            "item": "Item",
            "quantity": "Quantity",
            "unitprice": "Unit Price",
            "discount": "Discount",
            "total": "Total",
            "deletetooltip": "Delete",
        },
        "submitbutton": "Update",
        "cancelbutton": "Cancel",
    },
});

export { Language };