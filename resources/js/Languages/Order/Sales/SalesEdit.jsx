import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    
    id: {
        "header": {
            "title": "Ubah Data Pembelian",
            "subtitle": "Ubah data pembelian anda. Disarankan untuk tidak mengubah data jika tidak perlu",
        },
        "customer": {
            "name": "Pelanggan",
            "description": "* Pilih pelanggan dari bawah ini",
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
            "title": "Edit Sales Data",
            "subtitle": "Edit your sales data. Please do not edit the data if it is not necessary.",
        },
        "customer": {
            "name": "customer",
            "description": "* Select the customer from below",
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
        "submitbutton": "Submit",
        "cancelbutton": "Cancel",
    },
});

export { Language };