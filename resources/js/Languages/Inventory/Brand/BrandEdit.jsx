import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "title": "Edit Data Merek",
        "description": "Edit data merek anda. Mohon jangan mengubah data jika tidak perlu.",
        "brand": {
            "name": "Nama Merek",
            "description": "* Silahkan isi nama merek",
            "placeholder": "Nama",
        },
        "emailaddress": {
            "name": "Alamat Email",
            "description": "* Silahkan isi alamat email merek. Kosongkan jika tidak diketahui.",
            "placeholder": "nama@mail.com",
        },
        "productnumber": {
            "name": "Nomor Produk",
            "description": "* Silahkan isi nomor produk merek. Kosongkan jika tidak diketahui.",
            "placeholder": "Contoh: 0001",
        },
        "website": {
            "name": "Website",
            "description": "* Silahkan isi website merek. Kosongkan jika tidak diketahui.",
            "placeholder": "www.website.com",
        },
        "savebutton": "Simpan",
    },

    en: {
        "title": "Edit Data Brand",
        "description": "Edit your brand data. Please do not change the data if it is not necessary.",
        "brand": {
            "name": "Brand Name",
            "description": "* Provide the brand name",
            "placeholder": "Name",
        },
        "emailaddress": {
            "name": "Email Address",
            "description": "* Provide the brand's email address. Leave blank if unknown.",
            "placeholder": "nama@mail.com",
        },
        "productnumber": {
            "name": "Product Number",
            "description": "* Silahkan isi nomor produk merek. Kosongkan jika tidak diketahui.",
            "placeholder": "Contoh: 0001",
        },
        "website": {
            "name": "Website",
            "description": "* Silahkan isi website merek. Kosongkan jika tidak diketahui.",
            "placeholder": "www.website.com",
        },
        "savebutton": "Save",
    },
});

export { Language };