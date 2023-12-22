import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "title": "Buat Data Produk",
        "description": "Buat data produk anda. Mohon jangan mengubah data jika tidak perlu.",
        "name": {
            "name": "Nama Produk",
            "description": "* Silahkan isi nama produk",
            "placeholder": "Nama",
        },
        "brand": {
            "name": "Merek",
            "description": "* Pilih merek produk ini. Jika Anda belum menambahkan merek apa pun, Anda dapat menambahkannya <a href='/brand'>di sini</a>.",
            "placeholder": "Pilih...",
        },
        "description": {
            "name": "Deskripsi",
            "description": "* Silahkan isi deskripsi produk. Kosongkan jika tidak perlu.",
            "placeholder": "Masukkan deskripsi produk di sini...",
        },
        "salesprice": {
            "name": "Harga Jual",
            "description": "* Masukkan harga jual produk ini. Harga ini akan digunakan saat Anda membuat faktur penjualan.",
            "placeholder": "0",
        },
        "savebutton": "Simpan",
    },

    en: {
        "title": "Create Product Data",
        "description": "Create your product data. Please do not change the data if it is not necessary.",
        "name": {
            "name": "Product Name",
            "description": "* Provide the product name",
            "placeholder": "Name",
        },
        "brand": {
            "name": "Brand",
            "description": "* Pick up the brand of this product. If you haven't added any brand, you can add it <a href='/brand'>here</a>.",
            "placeholder": "Select...",
        },
        "description": {
            "name": "Description",
            "description": "* Provide the product description. Leave blank if unnecessary",
            "placeholder": "Enter product description here...",
        },
        "salesprice": {
            "name": "Sales Price",
            "description": "* Input the sales price of this product. This price will be used when you create a sales invoice.",
            "placeholder": "0",
        },
        "savebutton": "Save",
    },
});

export { Language };