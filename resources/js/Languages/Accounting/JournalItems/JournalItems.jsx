import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "header": {
            "title": "Jurnal Barang",
            "subtitle": "Halaman ini melacak semua pembelian dan penjualan persediaan anda",
        },
        "searchplaceholder": "Cari Barang...",
        "tableheader": {
            "journalentry": "Journal Entry",
            "account": "",
            "number": "Number",
            "debit": "Debit",
            "credit": "Credit",
            "balance": "Saldo",
        },
        "pagination": {
            "previous": "Sebelumnya",
            "next": "Selanjutnya",
            "page": "Halaman",
            "of": "dari",
        },
    },

    en: {
        "header": {
            "title": "Journal Items",
            "subtitle": "This page tracks all purchases and sales of your inventory",
        },
        "searchplaceholder": "Search Items...",
        "tableheader": {
            "journalentry": "Journal Entry",
            "account": "Account",
            "number": "Number",
            "debit": "Debit",
            "credit": "Credit",
            "balance": "Balance",
        },
        "pagination": {
            "previous": "Previous",
            "next": "Next",
            "page": "Page",
            "of": "of",
        },
    },
});

export { Language };