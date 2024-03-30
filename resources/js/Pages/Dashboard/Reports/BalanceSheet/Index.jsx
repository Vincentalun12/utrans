import BalancesheetLayout from "@/Layouts/NavigationLayout";
import { Head } from "@inertiajs/react";
import { Language } from "@/Languages/Reports/BalanceSheet";
import React, { useEffect, useState } from "react";
import {
    Card,
    Typography,
    Input,
    Button,
    Breadcrumbs,
    CardHeader,
    Menu,
    MenuList,
    MenuItem,
    MenuHandler,
    IconButton,
} from "@material-tailwind/react";

import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Batamwater } from '@/Assets';

import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    EllipsisHorizontalIcon,
    PlusCircleIcon,
    CalendarDaysIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/solid";

import {
    DocumentArrowDownIcon,
    DocumentChartBarIcon,
}
    from "@heroicons/react/24/outline";

export default function Balancesheet({ auth, coa }) {

    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        Language.setLanguage(selectedLanguage);
    }, [selectedLanguage]);

    const currentAssetsAccountNames = coa
        .filter(account => account.account_type === 'current_assets')
        .map(account => ({
            code: account.code,
            name: account.account_name,
            balance: parseFloat(account.balance)
        }));

    const receivableAccountNames = coa
        .filter(account => account.account_type === 'receivable')
        .map(account => ({
            code: account.code,
            name: account.account_name,
            balance: parseFloat(account.balance)
        }));

    const payableAccountNames = coa
        .filter(account => account.account_type === 'payable')
        .map(account => ({
            code: account.code,
            name: account.account_name,
            balance: parseFloat(account.balance)
        }));

    const equityAccountNames = coa
        .filter(account => account.account_type === 'equity')
        .map(account => ({
            code: account.code,
            name: account.account_name,
            balance: parseFloat(account.balance)
        }));

    const BankAndCashAccountNames = coa
        .filter(account => account.account_type === 'bank_and_cash')
        .map(account => ({
            code: account.code,
            name: account.account_name,
            balance: parseFloat(account.balance)
        }));

    const inventoryAccount = Array.isArray(coa)
        ? coa.find((coa) => coa.account_type === "Inventory Account")
        : null;

    const totalBalance = currentAssetsAccountNames.reduce((total, account) => {
        const balance = parseFloat(account.balance);
        return isNaN(balance) ? total : total + balance;
    }, 0);

    const totalBalance2 = BankAndCashAccountNames.reduce((total, account) => {
        const balance = parseFloat(account.balance);
        return isNaN(balance) ? total : total + balance;
    }, 0);

    const totalBalance3 = payableAccountNames.reduce((total, account) => {
        const balance = parseFloat(account.balance);
        return isNaN(balance) ? total : total + balance;
    }, 0);

    const totalBalance4 = equityAccountNames.reduce((total, account) => {
        const balance = parseFloat(account.balance);
        return isNaN(balance) ? total : total + balance;
    }, 0);

    const totalBalance5 = receivableAccountNames.reduce((total, account) => {
        const balance = parseFloat(account.balance);
        return isNaN(balance) ? total : total + balance;
    }, 0);

    const balance5 = totalBalance5.toLocaleString('id-ID');

    const balances4 = totalBalance4.toLocaleString('id-ID');

    const balances3 = totalBalance3.toLocaleString('id-ID');

    const balances2 = totalBalance2.toLocaleString('id-ID');

    const balances = totalBalance.toLocaleString('id-ID');

    const grandTotalBalance = totalBalance + totalBalance2;

    const grandTotalEquityLiabilites = totalBalance3 + totalBalance4;

    const grandTotalBalance2 = totalBalance3;
    const grandTotalBalance3 = totalBalance4;
    const grandTotalBalance4 = totalBalance5;
    const grandTotalBalanceFormatted2 = grandTotalBalance2.toLocaleString('id-ID');
    const grandTotalBalanceFormatted = grandTotalBalance.toLocaleString('id-ID');
    const grandTotalBalanceFormatted3 = grandTotalBalance3.toLocaleString('id-ID');
    const grandTotalBalanceFormatted4 = grandTotalEquityLiabilites.toLocaleString('id-ID');
    const grandTotalBalanceFormatted5 = grandTotalBalance4.toLocaleString('id-ID');

    const inventoryAccountBalance = inventoryAccount ? parseFloat(inventoryAccount.balance) : 0;
    const inventoryAccountBalanceFormatted = inventoryAccountBalance.toLocaleString('id-ID');

    console.log(inventoryAccountBalanceFormatted)
    const [isOpenBank, setIsOpenBank] = useState(false);
    const [isOpenReceivables, setIsOpenReceivables] = useState(false);
    const [isOpenCurrentAssets, setIsOpenCurrentAssets] = useState(false);
    const [isOpenPrepayments, setIsOpenPrepayments] = useState(false);
    const [isOpenPayables, setIsOpenPayables] = useState(false);
    const [isOpenEquities, setIsOpenEquities] = useState(false);


    const toggleDetailsBank = () => {
        setIsOpenBank(!isOpenBank);
    };

    const toggleDetailsPrepayments = () => {
        setIsOpenPrepayments(!isOpenPrepayments);
    };

    const toggleDetailsReceivables = () => {
        setIsOpenReceivables(!isOpenReceivables);
    };

    const toggleDetailsCurrentAssets = () => {
        setIsOpenCurrentAssets(!isOpenCurrentAssets);
    };

    const toggleDetailsPayables = () => {
        setIsOpenPayables(!isOpenPayables);
    };

    const toggleDetailsEquities = () => {
        setIsOpenEquities(!isOpenEquities);
    };

    const styles = StyleSheet.create({
        page: {
            fontSize: 11,
            paddingTop: 20,
            paddingLeft: 40,
            paddingRight: 40,
            lineHeight: 1.5,
            flexDirection: 'column'
        },

        title: {
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 5,
            marginLeft: "9%",
            marginRight: "9%",
            marginTop: 10,
        },
        dateTime: {
            textAlign: "right",
            fontSize: 10,
            marginBottom: 30,
            marginLeft: "9%",
            marginRight: "9%",
        },
        spaceBetween: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: "#3E3E3E"
        },

        titleContainer: {
            flexDirection: 'row',
            marginTop: 24
        },

        table: {
            display: "flex",
            width: "80%",
            marginLeft: "10%",
            marginRight: "10%",
            borderStyle: "solid",
            borderRightWidth: 0,
            borderBottomWidth: 0,
        },

        tableRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: '100%',
        },
        tableColHeader: {
            flex: 1,
            paddingTop: 4,
            borderBottomWidth: 1,
            textAlign: "left",
        },
        tableCol: {
            flex: 1,
            paddingTop: 4,
            textAlign: "left",
            minWidth: '50%',
        },

        tableColHeader2: {
            flex: 1,
            paddingTop: 4,
            borderBottomWidth: 1,
            textAlign: "right",
        },

        tableCol2: {
            flex: 1,
            paddingTop: 4,
            textAlign: "right",
        },

        tableCellHeader: {
            fontSize: 10,
            fontStyle: "bold",
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },

        tableCell: {
            fontSize: 9,
            paddingTop: 4,
            borderBottomWidth: 1,
            borderColor: "#a0a4ac",
        },

        tableCellnone: {
            color: "#FFFFFF",
            fontSize: 9,
            paddingTop: 4,
            borderBottomWidth: 1,
            borderColor: "#a0a4ac",
        },

        tableCellnonelast: {
            color: "#FFFFFF",
            fontSize: 9,
            paddingTop: 4,
            borderBottomWidth: 1,
        },

        tableCelltab: {
            fontSize: 9,
            paddingTop: 4,
            borderBottomWidth: 1,
            borderColor: "#a0a4ac",
            paddingLeft: 10,
        },
        tableCelltab3: {
            fontSize: 9,
            paddingTop: 4,
            borderBottomWidth: 1,
            borderColor: "#a0a4ac",
            paddingLeft: 20,
        },

        tableCelllast: {
            fontSize: 9,
            paddingTop: 4,
            borderBottomWidth: 1,
        },

        tableCellBold: {
            fontSize: 10,
            paddingTop: 4,
            fontStyle: "bold",
            paddingBottom: 10,
        },

        image: {
            width: 180,
            marginLeft: "9%",
            marginRight: "9%",
        },

        address: {
            textAlign: "right",
            fontSize: 10,
            marginBottom: 30,
            marginLeft: "9%",
            marginRight: "9%",
        },
        address2: {
            textAlign: "right",
            fontSize: 10,
            marginLeft: "9%",
            marginRight: "9%",
        },
    });

    const MyDocument = ({ data }) => (
        <Document>
            <Page size="A4">
                <View style={styles.titleContainer}>
                    <View style={styles.spaceBetween}>
                        <Image src={Batamwater} style={styles.image} />
                        <Text style={styles.title}>{Language.header.title}</Text>
                    </View>
                </View>
                <Text style={styles.dateTime}>
                    {new Date().toLocaleString()}
                </Text>
                <Text style={styles.address2}>Kec. Batam kota,</Text>
                <Text style={styles.address2}>Belian,</Text>
                <Text style={styles.address}>Unnamed Road</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>{Language.assets.title}</Text>
                        </View>
                        <View style={[styles.tableColHeader2]}>
                            <Text style={styles.tableCellHeader}>{grandTotalBalanceFormatted},00</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{Language.assets.title}</Text>
                            <Text style={styles.tableCelltab}>{Language.assets.bankandcashaccounts}</Text>
                            {BankAndCashAccountNames.map((account, index) => (
                                <View key={index}>
                                    <Text style={styles.tableCelltab3}>{account.code} {account.name}</Text>
                                </View>
                            ))}
                            <Text style={styles.tableCelltab}>{Language.assets.currentassets}</Text>
                            {currentAssetsAccountNames.map((account, index) => (
                                <View key={index}>
                                    <Text style={styles.tableCelltab3}>{account.code} {account.name}</Text>
                                </View>
                            ))}
                            <Text style={styles.tableCell}>{Language.assets.plusfixedassets}</Text>
                            <Text style={styles.tableCelllast}>{Language.assets.plusnoncurrentassets}</Text>
                            <Text style={styles.tableCellBold}>{Language.assets.totalassets}</Text>

                        </View>
                        <View style={styles.tableCol2}>
                            <Text style={styles.tableCellnone}>-</Text>
                            <Text style={styles.tableCell}>Rp {balances2},00</Text>
                            {BankAndCashAccountNames.map((account, index) => (
                                <View key={index}>
                                    <Text style={styles.tableCell}>Rp {account.balance.toLocaleString('id-ID')},00</Text>
                                </View>
                            ))}
                            <Text style={styles.tableCell}>Rp {balances},00</Text>
                            {currentAssetsAccountNames.map((account, index) => (
                                <View key={index}>
                                    <Text style={styles.tableCell}>Rp {account.balance.toLocaleString('id-ID')},00</Text>
                                </View>
                            ))}
                            <Text style={styles.tableCellnone}>-</Text>
                            <Text style={styles.tableCellnonelast}>-</Text>
                            <Text style={styles.tableCellBold}>Rp {grandTotalBalanceFormatted},00</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>{Language.liabilities.title}</Text>
                        </View>
                        <View style={[styles.tableColHeader2]}>
                            <Text style={styles.tableCellHeader}>Rp {grandTotalBalanceFormatted2},00</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{Language.liabilities.currentliabilities}s</Text>
                            <Text style={styles.tableCelltab}>{Language.liabilities.currentliabilities}</Text>
                            <Text style={styles.tableCelltab}>{Language.liabilities.payables}</Text>
                            {payableAccountNames.map((account, index) => (
                                <View key={index}>
                                    <Text style={styles.tableCelltab3}>{account.code} {account.name}</Text>
                                </View>
                            ))}
                            <Text style={styles.tableCelllast}>{Language.liabilities.plusnoncurrentliabilities}</Text>
                            <Text style={styles.tableCellBold}>{Language.liabilities.totalliabilities}</Text>

                        </View>
                        <View style={styles.tableCol2}>
                            <Text style={styles.tableCell}>Rp {balances3},00</Text>
                            <Text style={styles.tableCellnone}>-</Text>
                            <Text style={styles.tableCell}>Rp {balances3},00</Text>
                            {payableAccountNames.map((account, index) => (
                                <View key={index}>
                                    <Text style={styles.tableCell}>Rp {account.balance.toLocaleString('id-ID')},00</Text>
                                </View>
                            ))}
                            <Text style={styles.tableCellnonelast}>-</Text>
                            <Text style={styles.tableCellBold}>Rp {grandTotalBalanceFormatted2},00</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );

    return (
        <BalancesheetLayout user={auth.user}>
            <Head title="Balance sheet" />
            <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">


                    <div className="w-full mx-auto pb-5">
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <Typography variant="h4" className="text-ungukita" textGradient>
                                    {Language.header.title}
                                </Typography>
                                <Typography variant="paragraph">
                                    {Language.header.subtitle}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <Card className="h-full w-full overflow-hidden rounded-none inline-flex">
                        <div className="p-4 pt-5 flex justify-between">
                            <div className="flex">
                                <CalendarDaysIcon className="w-6 h-6 text-black" />
                                <span className="text-black font-bold mx-1">{Language.date}: </span>
                                <span className="">{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="md:flex hidden justify-end">
                                <Menu placement="right-start">
                                    <MenuHandler>
                                        <IconButton className="bg-ungukita">
                                            <DocumentTextIcon className="w-5 h-5" />
                                        </IconButton>
                                    </MenuHandler>
                                    <MenuList>
                                        <MenuItem className="flex items-center gap-2">
                                            <DocumentArrowDownIcon className="w-5 h-5" stroke="red" />
                                            <PDFDownloadLink document={<MyDocument />} fileName="Balance sheet.pdf">
                                                {({ blob, url, loading, error }) =>
                                                    loading ? 'Loading document...' : `${Language.export.pdf}`
                                                }
                                            </PDFDownloadLink>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>
                        </div>
                    </Card>
                    <Card className="h-full w-full overflow-hidden rounded-none">
                        <div className="p-4">
                            <div className="flex justify-between">
                                <Typography variant="small" color="black" className="w-full text-right">
                                    {Language.balance}
                                </Typography>
                            </div>
                            <div className="flex justify-between">
                                <Typography variant="h6" color="black" className="border-b border-black w-full pt-2">
                                    {Language.assets.title}
                                </Typography>
                                <Typography variant="small" color="black" className="border-b border-black w-full text-right pt-3">
                                    Rp {grandTotalBalanceFormatted},00
                                </Typography>
                            </div>
                            <div className="flex-inline justify-between">
                                <p className="border-b w-full border-gray-400">{Language.assets.currentassets}</p>
                                <details className="w-full cursor-default">
                                    <summary className="border-b w-full border-gray-400 block cursor-pointer" onClick={toggleDetailsBank}>
                                        <div className="flex">
                                            {isOpenBank ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                                            <span>{Language.assets.bankandcashaccounts}</span>
                                            <span className="flex-1 text-right text-sm text-black pt-1">Rp {balances2},00</span>
                                        </div>
                                    </summary>
                                    {BankAndCashAccountNames.map((account, index) => (
                                        <details key={index} className="w-full cursor-default">
                                            <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                                                <div className="flex">
                                                    <span>{account.code} {account.name}</span>
                                                    <span className="flex-1 text-right text-sm text-black pt-1">Rp {account.balance.toLocaleString('id-ID')},00</span>
                                                </div>
                                            </summary>
                                        </details>
                                    ))}
                                </details>
                                <details className="w-full cursor-default">
                                    <summary className="border-b w-full border-gray-400 block cursor-pointer" onClick={toggleDetailsCurrentAssets}>
                                        <div className="flex">
                                            {isOpenReceivables ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                                            <span>Receivables</span>
                                            <span className="flex-1 text-right text-sm text-black pt-1">Rp {balance5},00</span>
                                        </div>
                                    </summary>
                                    {receivableAccountNames.map((account, index) => (
                                        <details key={index} className="w-full cursor-default">
                                            <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                                                <div className="flex">
                                                    <span>{account.code} {account.name}</span>
                                                    <span className="flex-1 text-right text-sm text-black pt-1">Rp {account.balance.toLocaleString('id-ID')},00</span>
                                                </div>
                                            </summary>
                                        </details>
                                    ))}
                                </details>
                                <details className="w-full cursor-default">
                                    <summary className="border-b w-full border-gray-400 block cursor-pointer" onClick={toggleDetailsCurrentAssets}>
                                        <div className="flex">
                                            {isOpenCurrentAssets ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                                            <span>{Language.assets.currentassets}</span>
                                            <span className="flex-1 text-right text-sm text-black pt-1">Rp {balances},00</span>
                                        </div>
                                    </summary>
                                    {currentAssetsAccountNames.map((account, index) => (
                                        <details key={index} className="w-full cursor-default">
                                            <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                                                <div className="flex">
                                                    <span>{account.code} {account.name}</span>
                                                    <span className="flex-1 text-right text-sm text-black pt-1">Rp {account.balance.toLocaleString('id-ID')},00</span>
                                                </div>
                                            </summary>
                                        </details>
                                    ))}
                                </details>
                                <p className="border-b w-full border-gray-400">{Language.assets.plusfixedassets}</p>
                                <p className="border-b w-full border-black">{Language.assets.plusnoncurrentassets}</p>
                                <div className="flex justify-between">
                                    <Typography variant="h6" color="black" className="w-full pt-1">
                                        Total Assets
                                    </Typography>
                                    <Typography variant="h6" color="black" className="w-full text-right pt-1">
                                        Rp {grandTotalBalanceFormatted},00
                                    </Typography>
                                </div>
                                <div className="flex justify-between pt-5">
                                    <Typography variant="h6" color="black" className="border-b border-black w-full pt-2">
                                        LIABILITIES
                                    </Typography>
                                    <Typography variant="small" color="black" className="border-b border-black w-full text-right pt-3">
                                        Rp {grandTotalBalanceFormatted2},00
                                    </Typography>
                                </div>
                                <div className="flex-inline justify-between">
                                    <div className="border-b w-full border-gray-400">
                                        <div className="flex">
                                            <p>{Language.liabilities.currentliabilities}</p>
                                            <p className="flex-1 text-right text-sm text-black pt-1">Rp {balances3},00</p>
                                        </div>
                                    </div>
                                    <p className="border-b w-full border-gray-400 pl-6">{Language.liabilities.currentliabilities}</p>
                                    <details className="w-full cursor-default">
                                        <summary className="border-b w-full border-gray-400 block cursor-pointer" onClick={toggleDetailsPayables}>
                                            <div className="flex">
                                                {isOpenPayables ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                                                <span>{Language.liabilities.payables}</span>
                                                <span className="flex-1 text-right text-sm text-black pt-1">Rp {balances3},00</span>
                                            </div>
                                        </summary>
                                        {payableAccountNames.map((account, index) => (
                                            <details key={index} className="w-full cursor-default">
                                                <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                                                    <div className="flex">
                                                        <span>{account.code} {account.name}</span>
                                                        <span className="flex-1 text-right text-sm text-black pt-1">Rp {account.balance.toLocaleString('id-ID')},00</span>
                                                    </div>
                                                </summary>
                                            </details>
                                        ))}
                                    </details>
                                    <p className="border-b w-full border-black">{Language.liabilities.plusnoncurrentliabilities}</p>
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="h6" color="black" className="w-full pt-1">
                                        {Language.liabilities.totalliabilities}
                                    </Typography>
                                    <Typography variant="h6" color="black" className="w-full text-right pt-1">
                                        Rp {grandTotalBalanceFormatted2},00
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className="h-full w-full overflow-hidden rounded-none">
                        <div className="p-4">
                            <div className="flex-inline justify-between">
                                <div className="flex justify-between">
                                    <Typography variant="h6" color="black" className="border-b border-black w-full pt-2">
                                        Equity
                                    </Typography>
                                    <Typography variant="small" color="black" className="border-b border-black w-full text-right pt-3">
                                        Rp {grandTotalBalanceFormatted3},00
                                    </Typography>
                                </div>
                                <div className="flex-inline justify-between">
                                    <details className="w-full cursor-default">
                                        <summary className="border-b w-full border-gray-400 block cursor-pointer" onClick={toggleDetailsEquities}>
                                            <div className="flex">
                                                {isOpenEquities ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                                                <span>Retained Earnings</span>
                                                <span className="flex-1 text-right text-sm text-black pt-1">Rp {grandTotalBalanceFormatted3},00</span>
                                            </div>
                                        </summary>
                                        {equityAccountNames.map((account, index) => (
                                            <details key={index} className="w-full cursor-default">
                                                <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                                                    <div className="flex">
                                                        <span>{account.code} {account.name}</span>
                                                        <span className="flex-1 text-right text-sm text-black pt-1">Rp {account.balance.toLocaleString('id-ID')},00</span>
                                                    </div>
                                                </summary>
                                            </details>
                                        ))}
                                    </details>
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="h6" color="black" className="w-full pt-1">
                                        Total Equity
                                    </Typography>
                                    <Typography variant="h6" color="black" className="w-full text-right pt-1">
                                        Rp {grandTotalBalanceFormatted3},00
                                    </Typography>
                                </div>
                                <div className="border-b w-full border-gray-400 mt-4">
                                    <div className="flex">
                                        <p>Equities + Liabilities</p>
                                        <p className="flex-1 text-right text-sm text-black pt-1">Rp {grandTotalBalanceFormatted4},00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </BalancesheetLayout>
    );
}


