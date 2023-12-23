import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "title": "Pesanan Penjualan",
        "customer": "Pelanggan",
        "creationdate": "Tanggal Pembuatan",
        "expectedarrival": "Tanggal Tiba",
        "customerphonenumber": "Nomor Telepon Pelanggan",
        "customeremail": "Email Pelanggan",
        "customerreference": "Referensi Pelanggan",
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
            "duenow": "Sisa Pembayaran",
            "paid": "Dibayarkan",
            "total": "Total",
        }
    },

    en: {
        "title": "SALES ORDER",
        "customer": "Customer",
        "creationdate": "Creation Date",
        "expectedarrival": "Expected Arrival",
        "customerphonenumber": "Customer Phone Number",
        "customeremail": "Customer Email",
        "customerreference": "Customer Reference",
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
            "duenow": "Due Now",
            "paid": "Paid",
            "total": "Total",
        }
    },
});

export { Language };