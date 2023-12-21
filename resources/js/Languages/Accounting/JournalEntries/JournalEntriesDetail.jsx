import LocalizedStrings from "react-localization";

let Language = new LocalizedStrings({
    id: {
        "title": "Detail Jurnal Entry",
        "date": "Tanggal Akuntansi",
        "serialnumber": "Seri pembuatan",
        "journal": "Jurnal",
        "edit": "Ubah",
        "tableheader": {
            "account": "Akun",
            "label": "Label",
            "debit": "Debit",
            "credit": "Credit",
        },
    },

    en: {
        "title": "Journal Entry Detail",
        "date": "Accounting Date",
        "serialnumber": "Serial number",
        "journal": "Journal",
        "edit": "Edit",
        "tableheader": {
            "account": "Account",
            "label": "Label",
            "debit": "Debit",
            "credit": "Credit",
        },
    },
});

export { Language };