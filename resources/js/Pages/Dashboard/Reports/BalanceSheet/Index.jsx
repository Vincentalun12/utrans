import { useState } from "react";
import BalancesheetLayout from "@/Layouts/NavigationLayout";
import { Head } from "@inertiajs/react";
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
import { Language } from '@/Languages/Inventory/Brand/BrandIndex';

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
  DocumentArrowDownIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/solid";

export default function Balancesheet({ auth, coa }) {

  const accountNames = coa.map(account => account.account_type);

  const currentAssetsAccountNames = coa
  .filter(account => account.account_type === 'current_assets')
  .map(account => account.account_name);

  const inventoryAccount = Array.isArray(coa)
  ? coa.find((coa) => coa.account_type === "Inventory Account")
  : null;

  const inventoryAccountBalance = inventoryAccount ? parseFloat(inventoryAccount.balance) : 0;
  const inventoryAccountBalanceFormatted = inventoryAccountBalance.toLocaleString('id-ID');

  console.log(inventoryAccountBalanceFormatted)
  const [isOpenBank, setIsOpenBank] = useState(false);
  const [isOpenReceivables, setIsOpenReceivables] = useState(false);
  const [isOpenCurrentAssets, setIsOpenCurrentAssets] = useState(false);
  const [isOpenPrepayments, setIsOpenPrepayments] = useState(false);
  const [isOpenPayables, setIsOpenPayables] = useState(false);


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
    spaceBetween : {
        flex : 1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
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
        width:'100%',
    },
    tableColHeader: {
        flex: 1,
        paddingTop: 4 ,
        borderBottomWidth:1,
        textAlign: "left",
    },
    tableCol: {
      flex: 1,
      paddingTop: 4 , 
      textAlign: "left",
      minWidth: '50%',
    },

    tableColHeader2: {
      flex: 1,
      paddingTop: 4 , 
      borderBottomWidth:1,
      textAlign: "right",
    },

    tableCol2: {
      flex: 1,
      paddingTop: 4 , 
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
        paddingTop: 4 ,
        borderBottomWidth:1,
        borderColor: "#a0a4ac",
    },

    tableCellnone: {
      color: "#FFFFFF",
      fontSize: 9,
      paddingTop: 4 ,
      borderBottomWidth:1,
      borderColor: "#a0a4ac",
    },

    tableCellnonelast: {
      color: "#FFFFFF",
      fontSize: 9,
      paddingTop: 4 ,
      borderBottomWidth:1,
    },

    tableCelltab: {
      fontSize: 9,
      paddingTop: 4 ,
      borderBottomWidth:1,
      borderColor: "#a0a4ac",
      paddingLeft: 10,
    },
    tableCelltab3: {
      fontSize: 9,
      paddingTop: 4 ,
      borderBottomWidth:1,
      borderColor: "#a0a4ac",
      paddingLeft: 20,
    },

    tableCelllast: {
      fontSize: 9,
      paddingTop: 4 ,
      borderBottomWidth:1,
    },

    tableCellBold: {
      fontSize: 10,
      paddingTop: 4 ,
      fontStyle: "bold",
      paddingBottom: 10 ,
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
                    <Text style={styles.title}>Balance Sheet</Text>
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
                                <Text style={styles.tableCellHeader}>ASSETS</Text>
                            </View>
                            <View style={[styles.tableColHeader2]}>
                                <Text style={styles.tableCellHeader}>Rp 2.394.000.000,00</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Current Assets</Text>
                                <Text style={styles.tableCelltab}>Bank And Cash Accounts</Text>
                                <Text style={styles.tableCelltab3}>001.0001 Kas Kecil (IDR)</Text>
                                <Text style={styles.tableCelltab}>Receivables</Text>
                                <Text style={styles.tableCelltab3}>002.0002 Account Receivable (IDR)</Text>
                                <Text style={styles.tableCelltab}>Current Assets</Text>
                                <Text style={styles.tableCelltab3}>1000011 Bank Suspense Account</Text>
                                <Text style={styles.tableCelltab3}>1000012 Outstanding Receipts</Text>
                                <Text style={styles.tableCelltab3}>1000013 Good in Transit</Text>
                                <Text style={styles.tableCelltab3}>003.0001 Persediaan Barang</Text>
                                <Text style={styles.tableCell}>Plus fixed Assets</Text>
                                <Text style={styles.tableCelllast}>Plus Non-current Assets</Text>
                                <Text style={styles.tableCellBold}>Total Assets</Text>

                            </View>
                            <View style={styles.tableCol2}>
                                <Text style={styles.tableCellnone}>-</Text>
                                <Text style={styles.tableCell}>Rp 132.047.000,00</Text>
                                <Text style={styles.tableCell}>Rp 83.143.000,00</Text>
                                <Text style={styles.tableCell}>Rp 180.523.000,00</Text>
                                <Text style={styles.tableCell}>Rp 43.000.000,00</Text>
                                <Text style={styles.tableCell}>Rp 2.467.431.839,00</Text>
                                <Text style={styles.tableCell}>Rp 2.394.242.258,00</Text>
                                <Text style={styles.tableCellnone}>-</Text>
                                <Text style={styles.tableCell}>Rp -6.286.422.524,25</Text>
                                <Text style={styles.tableCell}>Rp 6.213.232.943,25</Text>
                                <Text style={styles.tableCellnone}>-</Text>
                                <Text style={styles.tableCellnonelast}>-</Text>
                                <Text style={styles.tableCellBold}>Rp 245.695.940,00</Text>
                            </View>
                      </View>
                </View>
                <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>LIABILITES</Text>
                            </View>
                            <View style={[styles.tableColHeader2]}>
                                <Text style={styles.tableCellHeader}>Rp 21.216.514,00</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Current Liabilities</Text>
                                <Text style={styles.tableCelltab}>Current Liabilities</Text>
                                <Text style={styles.tableCelltab}>Payables</Text>
                                <Text style={styles.tableCelltab3}>004.0001 Hutang usaha (IDR)</Text>
                                <Text style={styles.tableCelllast}>Plus Non-current Liabilities</Text>
                                <Text style={styles.tableCellBold}>Total Liabilities</Text>

                            </View>
                            <View style={styles.tableCol2}>
                                <Text style={styles.tableCell}>Rp 21.216.514,00</Text>
                                <Text style={styles.tableCellnone}>-</Text>
                                <Text style={styles.tableCell}>Rp 21.216.514,00</Text>
                                <Text style={styles.tableCell}>Rp 11.314.501,00</Text>
                                <Text style={styles.tableCellnonelast}>-</Text>
                                <Text style={styles.tableCellBold}>Rp 245.695.940,00</Text>
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
                    Balance Sheet
                  </Typography>
                  <Typography variant="paragraph">
                    Manage your balance sheet reports here
                  </Typography>
                </div>
              </div>
          </div>
          <Card className="h-full w-full overflow-hidden rounded-none inline-flex">
            <div className="p-4 pt-5 flex justify-between">
              <div className="flex">
                <CalendarDaysIcon className="w-6 h-6 text-black" />
                <span className="text-black font-bold mx-1">Date :</span>
                <span className="">Thur Nov 2, 2020</span>
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
                      <PDFDownloadLink document={<MyDocument/>} fileName="Balance sheet.pdf">
                        {({ blob, url, loading, error }) =>
                          loading ? 'Loading document...' : `${Language.export.pdf}`
                        }
                      </PDFDownloadLink>
                    </MenuItem>
                    <MenuItem className="flex items-center gap-2">
                      <DocumentChartBarIcon
                        className="w-5 h-5"
                        stroke="green"
                      />
                      {Language.export.csv}
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
                  Balance
                </Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="h6" color="black" className="border-b border-black w-full pt-2">
                  ASSETS
                </Typography>
                <Typography variant="small" color="black" className="border-b border-black w-full text-right pt-3">
                  Rp 2.394.000.000,00
                </Typography>
              </div>
              <div className="flex-inline justify-between">
                <p className="border-b w-full border-gray-400">Current Assets</p>
                <details className="w-full cursor-default">
                  <summary className="border-b w-full border-gray-400 block cursor-pointer" onClick={toggleDetailsBank}>
                    <div className="flex">
                      {isOpenBank ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Bank and Cash Accounts</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 132.047.000,00</span>
                    </div>
                  </summary>
                  <details className="w-full cursor-default">
                    <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>001.0001 Kas Kecil (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 83.143.000,00</span>
                    </div>
                    </summary>
                  </details>
                </details>
                <details className="w-full cursor-default">
                  <summary className="border-b w-full border-gray-400 block cursor-pointer" onClick={toggleDetailsReceivables}>
                    <div className="flex">
                      {isOpenReceivables ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Receivables</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 180.523.000,00</span>
                    </div>
                  </summary>
                  <details className="w-full cursor-default">
                  <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>002.0002 Account Receivable (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 43.000.000,00</span>
                    </div>
                    </summary>
                  </details>
                </details>
                <details className="w-full cursor-default">
                  <summary className="border-b w-full border-gray-400 block cursor-pointer" onClick={toggleDetailsCurrentAssets}>
                    <div className="flex">
                      {isOpenCurrentAssets ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Current Assets</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 2.467.431.839,00</span>
                    </div>
                  </summary>
                  {currentAssetsAccountNames.map((name, index) => (
                      <details key={index} className="w-full cursor-default">
                      <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                        <div className="flex">
                          <span>{name}</span>
                          <span className="flex-1 text-right text-sm text-black pt-1">Rp 1.000.000</span>
                        </div>
                        </summary>
                      </details>
                  ))}
                  <details className="w-full cursor-default">
                  <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span></span>
                      <span className="flex-1 text-right text-sm text-black pt-1">asdadadadadasd</span>
                    </div>
                    </summary>
                  </details>
                </details>
                <p className="border-b w-full border-gray-400">Plus fixed Assets</p>
                <p className="border-b w-full border-black">Plus Non-current Assets</p>
                <div className="flex justify-between">
                <Typography variant="h6" color="black" className="w-full pt-1">
                  Total Assets
                </Typography>
                <Typography variant="h6" color="black" className="w-full text-right pt-1">
                  Rp 245.695.940,00
                </Typography>
                </div>
                <div className="flex justify-between pt-5">
                <Typography variant="h6" color="black" className="border-b border-black w-full pt-2">
                  LIABILITIES
                </Typography>
                <Typography variant="small" color="black" className="border-b border-black w-full text-right pt-3">
                Rp 21.216.514,00
                </Typography>
                </div>
              <div className="flex-inline justify-between">
                <div className="border-b w-full border-gray-400">
                <div className="flex">
                <p>Current Liabilities</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp 21.216.514,00</p>
                </div>
                </div>
                <p className="border-b w-full border-gray-400 pl-6">Current Liabilities</p>
                <details className="w-full cursor-default">
                  <summary className="border-b w-full border-gray-400 block cursor-pointer" onClick={toggleDetailsPayables}>
                    <div className="flex">
                      {isOpenPayables ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Payables</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 21.216.514,00</span>
                    </div>
                  </summary>
                  <details className="w-full cursor-default">
                    <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>004.0001 Hutang usaha (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 11.314.501,00</span>
                    </div>
                    </summary>
                  </details>
                </details>
                <p className="border-b w-full border-black">Plus Non-current Liabilities</p>
              </div>
              <div className="flex justify-between">
                <Typography variant="h6" color="black" className="w-full pt-1">
                  Total Liabilities
                </Typography>
                <Typography variant="h6" color="black" className="w-full text-right pt-1">
                  Rp 245.695.940,00
                </Typography>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </BalancesheetLayout>
  );
}


