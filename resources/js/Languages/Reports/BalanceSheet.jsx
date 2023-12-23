import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "header": {
            "title": "Neraca Keuangan",
            "subtitle": "Halaman ini menunjukkan neraca Anda. Ini adalah laporan keuangan yang merangkum aset, kewajiban, dan ekuitas pemegang saham perusahaan pada titik waktu tertentu.",
        },
        "assets": {
            "title": "Aset",
            "bankandcashaccounts": "Rekening Bank dan Tunai",
            "currentassets": "Aset Lancar",
            "revenue": "Pendapatan",
            "plusfixedassets": "Plus Aset Tetap",
            "plusnoncurrentassets": "Plus Aset Tidak Lancar",
            "totalassets": "Total Aset",
        },
        "liabilities": {
            "title": "LIALIBITAS",
            "currentliabilities": "Liabilitas Saat Ini",
            "plusnoncurrentliabilities": "Plus Liabilitas Tidak Lancar",
            "payables": "Transaksi Kredit",
            "totalliabilities": "Total Liabilitas",
        },
        "export": {
            "pdf": "Cetak menjadi PDF",
        },
        "date": "Tanggal",
        "balance": "Saldo",
    },

    en: {
        "header": {
            "title": "Balance Sheet",
            "subtitle": "This page shows your balance sheet. It is a financial statement that summarizes a company's assets, liabilities and shareholders' equity at a specific point in time.",
        },
        "assets": {
            "title": "Assets",
            "bankandcashaccounts": "Bank and Cash Accounts",
            "currentassets": "Current Assets",
            "revenue": "Revenue",
            "plusfixedassets": "Plus Fixed Assets",
            "plusnoncurrentassets": "Plus Non-Current Assets",
            "totalassets": "Total Assets",
        },
        "liabilities": {
            "title": "LIABILITIES",
            "currentliabilities": "Current Liabilities",
            "plusnoncurrentliabilities": "Plus Non-Current Liabilities",
            "payables": "Payables",
            "totalliabilities": "Total Liabilities",
        },
        "export": {
            "pdf": "Cetak menjadi PDF",
        },
        "date": "Date",
        "balance": "Balance",
    },
});

export { Language };