import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "title": "Buat Data Pelanggan",
        "description": "Buat data pelanggan setia anda. Mohon jangan mengubah data jika tidak perlu.",
        "customer": {
            "generalinformation": "Informasi Umum",
            "name": "Nama Pelanggan",
            "description": "* Silahkan isi nama pelanggan",
            "placeholder": "Nama",
        },
        "phonenumber": {
            "name": "Nomor Telepon",
            "description": "* Gunakan format 08xxxxxxxxxx. Kosongkan jika tidak diketahui.",
            "placeholder": "08xxxxxxxxxx",
        },
        "emailaddress": {
            "name": "Alamat Email",
            "description": "* Silahkan isi alamat email pelanggan. Kosongkan jika tidak diketahui.",
            "placeholder": "nama@mail.com",
        },
        "address": {
            "generalinformation": "Informasi Alamat",
            "name": "Alamat",
            "description": "* Silahkan isi alamat pelanggan. Kosongkan jika tidak diketahui.",
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
        "title": "Create Data Customer",
        "description": "Create your loyal customers data. Please do not change the data if it is not necessary.",
        "customer": {
            "generalinformation": "General Information",
            "name": "Customer Name",
            "description": "* Provide the name customer name",
            "placeholder": "Name",
        },
        "phonenumber": {
            "name": "Phone Number",
            "description": "* Please use 08xxxxxxxxxx format. Leave blank if unknown.",
            "placeholder": "08xxxxxxxxxx",
        },
        "emailaddress": {
            "name": "Email Address",
            "description": "** Provide the customer's email address. Leave blank if unknown.",
            "placeholder": "name@mail.com",
        },
        "address": {
            "name": "Address",
            "description": "* Provide the customer's address. Leave blank if unknown.",
            "placeholder": "Address",
        },
        "district": {
            "name": "District",
            "description": "* Could be city, regency, or district, Leave blank if unknown.",
            "placeholder": "District",
        },
        "city": {
            "name": "city",
            "description": "* Blankable",
            "placeholder": "City / Province",
        },
        "savebutton": "Save",
    },
});

export { Language };