import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "purchasesdue": "Hutang Pembelian",
        "salesdue": "Piutang Penjualan",
        "salesvalue": "Nilai Penjualan",
        "inventoryvalue": "Nilai Persediaan",
        "customers": "Pelanggan",
        "vendors": "Vendor/Supplier",
        "purchaseinvoices": "Faktur Pembelian",
        "salesinvoices": "Faktur Penjualan",
        "graph": {
            "title": "Grafik Penjualan & Pembelian",
            "description": "Grafik ini menunjukkan penjualan dan pembelian bisnis Anda selama 30 hari terakhir."
        },
        "products": {
            "title": "Produk Terbaru",
            "description": "Tabel ini menunjukkan 5 produk terbaru yang ditambahkan ke persediaan Anda.",
            "view": "Lihat Semua",
            "totalproduct": "Total Produk:",
            "newproduct": "Produk Baru Hari Ini:",
        },
        "tableheader": {
            "no": "No",
            "name": "Nama Produk",
            "stock": "Stok",
            "price": "Harga Jual",
            "edit": "Ubah",
        },
    },

    en: {
        "purchasesdue": "Purchases Due",
        "salesdue": "Sales Due",
        "salesvalue": "Sales Value",
        "inventoryvalue": "Inventory Value",
        "customers": "Customers",
        "vendors": "Vendors/Suppliers",
        "purchaseinvoices": "Purchase Invoices",
        "salesinvoices": "Sales Invoices",
        "graph": {
            "title": "Sales & Purchase Graph",
            "description": "This graph shows the sales and purchase of your business for the last 30 days."
        },
        "products": {
            "title": "Recently Added Products",
            "description": "This table shows newest 5 products added to your inventory.",
            "view": "View All",
            "totalproduct": "Total Product:",
            "newproduct": "New Product Today:",
        },
        "tableheader": {
            "no": "No",
            "name": "Product Name",
            "stock": "Stock",
            "price": "Retail Price",
            "edit": "Edit",
        },
    },
});

export { Language };