import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "title": "Pemesanan Pembelian",
        "vendor": "Referensi Vendor",
        "creationdate": "Tanggal Pembuatan",
        "expectedarrival": "Tanggal Tiba",
        "currency": "Mata Uang",
        "total": "Total Item",
        "createbill": "Buat Tagihan",
        "tableheader": {
            "sku": "SKU",
            "item": "Nama Item",
            "quantity": "Kuantitas",
            "unitprice": "Unit Price",
            "discount": "Diskon",
            "total": "Total",
        },
        "calculation": {
            "discount": "Diskon",
            "shipping": "Pengiriman",
            "total": "Total",
        }
    },

    en: {
        "title": "Purchase Order",
        "vendor": "Vendor reference",
        "creationdate": "Creation Date",
        "expectedarrival": "Expected Arrival",
        "currency": "Currency",
        "total": "Total Item",
        "createbill": "Create Bill",
        "tableheader": {
            "sku": "SKU",
            "item": "Item Name",
            "quantity": "Quantity",
            "unitprice": "Unit Price",
            "discount": "Discount",
            "total": "Total",
        },
        "calculation": {
            "discount": "Discount",
            "shipping": "Shipping",
            "total": "Total",
        }
    },
});

export { Language };