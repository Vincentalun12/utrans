import InventoryLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from "react";
import Linkactive from "@/Components/Linkactive";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { Global, css } from "@emotion/react";
import { Batamwater } from '@/Assets';
import {
    PDFDownloadLink,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import {
    Card,
    Typography,
    Input,
    Button,
    Tooltip,
    IconButton,
    Alert,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";

import {
    CalendarDaysIcon,
    ChevronUpDownIcon,
    PencilIcon,
    DocumentTextIcon,
    PlusIcon,
    InformationCircleIcon,
    EyeIcon,
    PlusCircleIcon,
    TrashIcon,
    ArrowDownTrayIcon,
    CreditCardIcon,
    EllipsisVerticalIcon,
    ChevronLeftIcon,
    PencilSquareIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/solid";

import {
    DocumentArrowDownIcon,
    DocumentChartBarIcon,
}
from "@heroicons/react/24/outline";

import {
    TrashIcon as TrashIconSolid,
    PencilIcon as PencilIconSolid,
    PrinterIcon as PrinterIconSolid,
} from "@heroicons/react/24/solid";

import { ButtonPrimary } from "@/Components";

import { twMerge } from "tailwind-merge";

const TABLE_HEAD = [
    { display: "SKU", field: "SKU" },
    { display: "Name", field: "name" },
    { display: "Brand", field: "brand" },
    { display: "Sales Price", field: "sales_price" },
    { display: "COGS", field: "standard_price" },
    { display: "Stock", field: "stock" },
    { display: "Action", field: null },
];

export default function Inventory({ auth, products }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [paginated, setpaginated] = useState([]);
    const [sorting, setsorting] = useState(null);
    const [sortdirection, setsortdirection] = useState(null);
    const [searchbar, setsearchbar] = useState("");
    const { flash } = usePage().props;

    const { delete: destroy } = useForm({});

    const [isShowAlert, setIsShowAlert] = useState(false);

    const [deleteProductId, setDeleteProductId] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (id) => {
        setDeleteProductId(id);
        setOpen(!open);
    };

    useEffect(() => {
        if (flash.message) {
            setIsShowAlert(true);
            setTimeout(() => {
                setIsShowAlert(false);
                flash.message = null;
            }, 3000);
        }
    }, [isShowAlert]);

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        let sortedItems = [...products];

        if (searchbar) {
            const terms = searchbar.toLowerCase().split(" ");
            sortedItems = sortedItems.filter((item) =>
                terms.every((term) =>
                    Object.values(item).some((val) =>
                        String(val).toLowerCase().includes(term)
                    )
                )
            );
        }

        if (sorting && sortdirection) {
            sortedItems.sort((a, b) => {
                let aValue = a[sorting];
                let bValue = b[sorting];

                if (sorting === "retail" || sorting === "wholesale") {
                    aValue = Number(aValue.replace(/\D/g, ""));
                    bValue = Number(bValue.replace(/\D/g, ""));
                }

                if (aValue < bValue) {
                    return sortdirection === "asc" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortdirection === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

        setpaginated(sortedItems.slice(start, end));
    }, [currentPage, sorting, sortdirection, searchbar, isShowAlert]);

    const handleSort = (field) => {
        if (field === sorting) {
            setsortdirection(sortdirection === "asc" ? "desc" : "asc");
        } else {
            setsorting(field);
            setsortdirection("asc");
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (
            paginated.length === itemsPerPage &&
            currentPage < Math.ceil(products.length / itemsPerPage)
        ) {
            setCurrentPage(currentPage + 1);
        }
    };

    const [selectedProducts, setselectedProducts] = useState(null);
    const [opendetail, setOpendetail] = React.useState(false);
    const handleOpendetail = (id) => {
        setOpendetail(!opendetail);
        const productsData = products.find((products) => products.id === id);
        setselectedProducts(productsData);
    };

    //print pdf
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
            display: "table",
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
            backgroundColor: "#f8f4f4",
            paddingTop: 4 , paddingLeft: 7 ,
            borderColor : 'whitesmoke',
            backgroundColor : '#DEDEDE',
            borderRightWidth:1, borderBottomWidth:1
        },
        tableCol: {
            flex: 1,
            borderWidth: 1,
            paddingTop: 4 , paddingLeft: 7 ,
            borderColor : 'whitesmoke',
            borderRightWidth:1, borderBottomWidth:1
        },

        tableColHeader2: {
            flex:2, 
            borderRightWidth:0, 
            borderBottomWidth:1,
            backgroundColor : '#DEDEDE',
        },

        tableCol2: {
            flex:2, 
            borderRightWidth:0, 
            borderBottomWidth:1,
        },

        tableCellHeader: {
            fontSize: 10,
            fontStyle: "bold",
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },

        tableCell: {
            paddingTop: 4 , paddingLeft: 7 ,
            fontSize: 9,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
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
            <Page size="A4" orientation="landscape">
            <View style={styles.titleContainer}>
                <View style={styles.spaceBetween}>
            <Image src={Batamwater} style={styles.image} />
                <Text style={styles.title}>Products Report</Text>
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
                        <View style={[styles.tableColHeader, styles.tableColHeader2 ]}>
                            <Text style={styles.tableCellHeader}>SKU</Text>
                        </View>
                        <View style={[styles.tableCol, styles.tableColHeader2]}>
                            <Text style={styles.tableCellHeader}>Name</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Stock</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>
                                Sales price
                            </Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>
                                Standard price
                            </Text>
                        </View>
                    </View>

                    {data.map((products, index) => (
                        <View style={styles.tableRow} key={index}>
                            <View style={[styles.tableCol, styles.tableCol2]}>
                                <Text style={styles.tableCell}>
                                    {products.code}
                                </Text>
                            </View>
                            <View style={[styles.tableCol, styles.tableCol2]}>
                                <Text style={styles.tableCell}>
                                    {products.name}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {products.stock}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {products.sales_price}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {products.standard_price}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    return (
        <InventoryLayout user={auth.user}>
            <Head title="Products" />
            <Global
                styles={css`
                    .bg-opacity-60 {
                        --tw-bg-opacity: 0.15;
                    }
                    .backdrop-blur-sm {
                        --tw-backdrop-blur: blur(1px);
                        -webkit-backdrop-filter: var(--tw-backdrop-blur)
                            var(--tw-backdrop-brightness)
                            var(--tw-backdrop-contrast)
                            var(--tw-backdrop-grayscale)
                            var(--tw-backdrop-hue-rotate)
                            var(--tw-backdrop-invert) var(--tw-backdrop-opacity)
                            var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
                        backdrop-filter: var(--tw-backdrop-blur)
                            var(--tw-backdrop-brightness)
                            var(--tw-backdrop-contrast)
                            var(--tw-backdrop-grayscale)
                            var(--tw-backdrop-hue-rotate)
                            var(--tw-backdrop-invert) var(--tw-backdrop-opacity)
                            var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
                    }
                    .shadow-2xl {
                        --tw-shadow: 0 10px 25px -12px rgb(0 0 0 / 0.25);
                        --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);
                        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                            var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                    }
                `}
            />
            <Dialog
                open={opendetail}
                handler={handleOpendetail}
                className="overflow-auto max-h-[80vh]"
            >
                <DialogHeader>
                    <Typography variant="h5">Products Detail</Typography>
                </DialogHeader>
                <DialogBody divider>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray">
                                Code
                            </Typography>
                            <Typography variant="body" color="blue-gray">
                                {selectedProducts && (
                                    <div>{selectedProducts.code}</div>
                                )}
                            </Typography>
                        </div>
                        <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray">
                                Name
                            </Typography>
                            <Typography variant="body" color="blue-gray">
                                {selectedProducts && (
                                    <div>{selectedProducts.name}</div>
                                )}
                            </Typography>
                        </div>
                        <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray">
                                Stock
                            </Typography>
                            <Typography variant="body" color="blue-gray">
                                {selectedProducts && (
                                    <div>{selectedProducts.stock}</div>
                                )}
                            </Typography>
                        </div>
                        <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray">
                                Brand
                            </Typography>
                            <Typography variant="body" color="blue-gray">
                                {selectedProducts && (
                                    <div>{selectedProducts.brand?.name}</div>
                                )}
                            </Typography>
                        </div>
                        <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray">
                                Sales price
                            </Typography>
                            <Typography variant="body" color="blue-gray">
                                Rp{" "}
                                {selectedProducts &&
                                    Intl.NumberFormat("id").format(
                                        selectedProducts.sales_price
                                    )}
                            </Typography>
                        </div>
                        <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray">
                                Standard price
                            </Typography>
                            <Typography variant="body" color="blue-gray">
                                Rp{" "}
                                {selectedProducts &&
                                    Intl.NumberFormat("id").format(
                                        selectedProducts.standard_price
                                    )}
                            </Typography>
                        </div>
                        <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray">
                                Created at
                            </Typography>
                            <Typography variant="body" color="blue-gray">
                                {selectedProducts && (
                                    <div>{new Date(selectedProducts.created_at).toLocaleString()}</div>
                                )}
                            </Typography>
                        </div>
                        <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray">
                                Edited at
                            </Typography>
                            <Typography variant="body" color="blue-gray">
                                {selectedProducts && (
                                    <div>{new Date(selectedProducts.updated_at).toLocaleString()}</div>
                                )}
                            </Typography>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={() =>
                            (window.location.href = route(
                                "products.edit",
                                selectedProducts.id
                            ))
                        }
                    >
                        Edit Detail
                    </Button>
                    <Button variant="outlined" onClick={handleOpendetail}>
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <Dialog open={open} size="sm" onClose={handleOpen}>
                <DialogHeader>
                    <Typography variant="h5">Notification</Typography>
                </DialogHeader>
                <DialogBody divider className="grid place-items-center gap-4">
                    <InformationCircleIcon className="w-20 h-20 text-red-400" />
                    <Typography className="text-red-900" variant="h4">
                        You're about to delete this item!
                    </Typography>
                    <Typography className="text-center font-normal">
                        This action cannot be undone. However, we will keep your
                        data for audit purposes.
                    </Typography>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={async () => {
                            if (deleteProductId) {
                                await destroy(
                                    route("products.destroy", deleteProductId),
                                    {
                                        onSuccess: () => {
                                            setIsShowAlert(true);
                                            setDeleteProductId(null);
                                        },
                                    }
                                );
                            }
                            handleOpen(null);
                        }}
                    >
                        Delete
                    </Button>
                    <Button variant="outlined" onClick={handleOpen}>
                        Cancel
                    </Button>
                </DialogFooter>
            </Dialog>
            <Alert
                className="fixed top-4 right-4 z-50 lg:w-1/4 w-1/2"
                color={flash.message?.type == "success" ? "green" : "red"}
                open={isShowAlert}
                // icon={<Icon />}
            >
                {flash.message?.content}
            </Alert>
            <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
                    <div className="w-full mx-auto pb-5">
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <Typography
                                    variant="h4"
                                    className="text-ungukita"
                                    textGradient
                                >
                                    Products
                                </Typography>
                                <Typography variant="paragraph">
                                    Manage your products here
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-tl-lg rounded-tr-lg overflow-hidden shadow-md h-20 py-2">
                        <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
                            <div className="flex gap-3">
                                <Linkactive href={route("products.create")}>
                                    <Button className="bg-ungukita md:flex hidden">
                                        Add
                                    </Button>
                                </Linkactive>
                                <div className="md:flex hidden">
                                    <Menu placement="right-start">
                                        <MenuHandler>
                                            <IconButton className="bg-ungukita">
                                                <DocumentTextIcon className="w-5 h-5" />
                                            </IconButton>
                                        </MenuHandler>
                                        <MenuList>
                                            <MenuItem className="flex items-center gap-2">
                                                <DocumentArrowDownIcon
                                                    className="w-5 h-5"
                                                    stroke="red"
                                                />
                                                <PDFDownloadLink
                                                    document={
                                                        <MyDocument
                                                            data={products}
                                                        />
                                                    }
                                                    fileName="products.pdf"
                                                >
                                                    {({
                                                        blob,
                                                        url,
                                                        loading,
                                                        error,
                                                    }) =>
                                                        loading
                                                            ? "Loading document..."
                                                            : "Export as PDF"
                                                    }
                                                </PDFDownloadLink>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </div>
                                <Linkactive href={route("products.create")}>
                                    <IconButton className="bg-ungukita flex md:hidden">
                                        <PlusIcon className="w-5 h-5" />
                                    </IconButton>
                                </Linkactive>
                            </div>
                            <div className="inline-flex items-center">
                                <Input
                                    type="search"
                                    placeholder="Search"
                                    value={searchbar}
                                    onChange={(e) =>
                                        setsearchbar(e.target.value)
                                    }
                                    className=" focus:!border-ungukita focus:ring-ungukita placeholder:opacity-100 !border-t-blue-gray-200"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <Card className="lg:overflow-auto overflow-x-scroll overflow-y-hidden px-0 rounded-none">
                        <table className="w-full min-w-max lg:min-w-full table-auto text-left">
                            <thead>
                                <tr className="sticky top-0 z-50">
                                    {TABLE_HEAD.map(
                                        ({ display, field }, index) => (
                                            <th
                                                key={display}
                                                className="cursor-pointer border-b border-gray-300 bg-gray-100 p-4 transition-colors hover:bg-gray-400"
                                                onClick={() =>
                                                    field && handleSort(field)
                                                }
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                                >
                                                    {display}{" "}
                                                    {index !==
                                                        TABLE_HEAD.length - 1 &&
                                                        field && (
                                                            <ChevronUpDownIcon
                                                                strokeWidth={2}
                                                                className="h-4 w-4"
                                                            />
                                                        )}
                                                </Typography>
                                            </th>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map(
                                    (
                                        {
                                            id,
                                            code,
                                            name,
                                            brand,
                                            sales_price,
                                            standard_price,
                                            stock,
                                        },
                                        index
                                    ) => {
                                        const isLast =
                                            index === products.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr
                                                key={id}
                                                className="even:bg-gray-100"
                                            >
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {code}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {name}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {brand?.name}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        Rp{" "}
                                                        {Intl.NumberFormat(
                                                            "id"
                                                        ).format(sales_price)}
                                                    </Typography>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        Rp{" "}
                                                        {Intl.NumberFormat(
                                                            "id"
                                                        ).format(
                                                            standard_price
                                                        )}
                                                    </Typography>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {stock}
                                                    </Typography>
                                                </td>

                                                <td className="p-2 flex">
                                                    <Tooltip content="View Item">
                                                        <IconButton
                                                            variant="text"
                                                            onClick={() =>
                                                                handleOpendetail(
                                                                    id
                                                                )
                                                            }
                                                        >
                                                            <EyeIcon className="h-5 w-5 text-blue-800" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="Edit Item">
                                                        <a href={route("products.edit",id)}>
                                                            <IconButton variant="text">
                                                                <PencilSquareIcon className="h-5 w-5 text-green-500" />
                                                            </IconButton>
                                                        </a>
                                                    </Tooltip>
                                                    <Tooltip content="Delete Item">
                                                        <a
                                                            as="button"
                                                            onClick={() =>
                                                                handleOpen(id)
                                                            }
                                                        >
                                                            <IconButton variant="text">
                                                                <TrashIcon className="h-5 w-5 text-red-500" />
                                                            </IconButton>
                                                        </a>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </Card>
                    <Card className="flex border-t bg-white rounded-tr-none rounded-tl-none rounded-bl-lg rounded-br-lg border-gray-200 p-4">
                        <div className="flex justify-between">
                            <div className="pt-2">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    Page {currentPage} of{" "}
                                    {Math.ceil(products.length / itemsPerPage)}
                                </Typography>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={handleNext}
                                    disabled={paginated.length < itemsPerPage}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </InventoryLayout>
    );
}
