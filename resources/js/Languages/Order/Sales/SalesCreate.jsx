import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    
    id: {
        "header": {
            "title": "Buat Data Pembelian",
            "subtitle": "Buat data pembelian anda. Data ini akan digunakan ketika anda membuat faktur pembelian.",
        },
        "customer": {
            "name": "Customer",
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
        "submitbutton": "Buat",
        "cancelbutton": "Batal",
    },

    en: {
        "header": {
            "title": "Create Sales Data",
            "subtitle": "Create your sales data. This data will be used when you create a sales invoice.",
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