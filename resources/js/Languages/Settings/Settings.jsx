import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        title: "Pengaturan",
        subtitle: "Ubah pengaturan akun Anda",

        accountsettingstitle: "Pengaturan Akun",
        salesaccount: "Akun Penjualan",
        purchaseaccount: "Akun Pembelian",   
        assetsaccount: "Akun Aset",
        currentassetsaccount: "Akun Aset Lancar",
        fixedassetsaccount: "Akun Aset Tetap",
        costofgoodsoldaccount: "Akun Harga Pokok Penjualan",

        journalsettingstitle: "Pengaturan Jurnal",
        stockvaluationjournal: "Jurnal Penilaian Persediaan",
        salesjournal: "Jurnal Penjualan",
        purchasejournal: "Jurnal Pembelian",

        appearancesettingstitle: "Pengaturan Tampilan",
        language: "Bahasa",
        theme: "Tema",

        savebutton: "Simpan",
    },
    en: {
        title: "Settings",
        subtitle: "Change your account settings",

        accountsettingstitle: "Account Settings",
        salesaccount: "Sales Account",
        purchaseaccount: "Purchase Account",    
        assetsaccount: "Assets Account",
        currentassetsaccount: "Current Assets Account",
        fixedassetsaccount: "Fixed Assets Account",
        costofgoodsoldaccount: "Cost of Goods Sold Account",

        journalsettingstitle: "Journal Settings",
        stockvaluationjournal: "Stock Valuation Journal",
        salesjournal: "Sales Journal",
        purchasejournal: "Purchase Journal",

        appearancesettingstitle: "Appearance Settings",
        language: "Language",
        theme: "Theme",

        savebutton: "Save",
    },
});

export { Language };