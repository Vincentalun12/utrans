import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "title": "Buat Data Vendor",
        "description": "Buat data vendor anda. Mohon jangan mengubah data jika tidak perlu.",
        "vendor": {
            "generalinformation": "Informasi Umum",
            "name": "Nama Vendor",
            "description": "* Silahkan isi nama vendor",
            "placeholder": "Nama",
        },
        "phonenumber": {
            "name": "Nomor Telepon",
            "description": "* Gunakan format 08xxxxxxxxxx. Kosongkan jika tidak diketahui.",
            "placeholder": "08xxxxxxxxxx",
        },
        "emailaddress": {
            "name": "Alamat Email",
            "description": "* Silahkan isi alamat email vendor. Kosongkan jika tidak diketahui.",
            "placeholder": "nama@mail.com",
        },
        "address": {
            "generalinformation": "Informasi Alamat",
            "name": "Alamat",
            "description": "* Silahkan isi alamat vendor. Kosongkan jika tidak diketahui.",
            "placeholder": "Alamat",
        },
        "district": {
            "name": "Kecamatan",
            "description": "* Bisa berupa kota, kabupaten, atau kecamatan, Kosongkan jika tidak diketahui.",
            "placeholder": "Kecamatan",
        },
        "city": {
            "name": "Kota",
            "description": "* Kosongkan jika tidak diketahui.",
            "placeholder": "Kota / Provinsi",
        },
        "savebutton": "Simpan",
    },

    en: {
        "title": "Create Data Vendor",
        "description": "Create your loyal customers data. Please do not change the data if it is not necessary.",
        "vendor": {
            "generalinformation": "General Information",
            "name": "Vendor Name",
            "description": "* Provide the name vendor name",
            "placeholder": "Name",
        },
        "phonenumber": {
            "name": "Phone Number",
            "description": "* Please use 08xxxxxxxxxx format. Leave blank if unknown.",
            "placeholder": "08xxxxxxxxxx",
        },
        "emailaddress": {
            "name": "Email Address",
            "description": "* Provide the vendor's email address. Leave blank if unknown.",
            "placeholder": "name@mail.com",
        },
        "address": {
            "name": "Address",
            "description": "* Provide the vendor's address. Leave blank if unknown.",
            "placeholder": "Address",
        },
        "district": {
            "name": "District",
            "description": "* Could be city, regency, or district, Leave blank if unknown.",
            "placeholder": "District",
        },
        "city": {
            "name": "City",
            "description": "* Blankable",
            "placeholder": "City / Province",
        },
        "savebutton": "Save",
    },
});

export { Language };