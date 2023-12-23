import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "title": "PEMESANAN PEMBELIAN",
        "vendor":  "Vendor/Supplier",
        "vendorreference": "Referensi Vendor",
        "creationdate": "Tanggal Pembuatan",
        "expectedarrival": "Tanggal Tiba",
        "currency": "Mata Uang",
        "total": "Total Item",
        "createbill": "Buat Tagihan",
        "status": "Status",
        "paymentstatus": "Status Pembayaran",
        "tableheader": {
            "reference": "Reference",
            "item": "Nama Item",
            "quantity": "Kuantitas",
            "unitprice": "Unit Price",
            "discount": "Diskon",
            "total": "Total",
        },
        "calculation": {
            "paid": "Dibayarkan",
            "due": "Sisa Pembayaran",
            "total": "Total",
        }
    },

    en: {
        "title": "PURCHASE ORDER",
        "vendor": "Vendor",
        "status": "Status",
        "paymentstatus": "Payment Status",
        "vendorreference": "Referensi Vendor",
        "creationdate": "Creation Date",
        "expectedarrival": "Expected Arrival",
        "currency": "Currency",
        "total": "Total Item",
        "createbill": "Create Bill",
        "tableheader": {
            "reference": "Reference",
            "item": "Item Name",
            "quantity": "Quantity",
            "unitprice": "Unit Price",
            "discount": "Discount",
            "total": "Total",
        },
        "calculation": {
            "paid": "Paid",
            "due": "Due Now",
            "total": "Total",
        }
    },
});

export { Language };