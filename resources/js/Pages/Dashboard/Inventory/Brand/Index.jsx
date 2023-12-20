import BrandLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from "react";
import Linkactive from "@/Components/Linkactive";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Utranslogo2 } from '@/Assets';
import { Language } from '@/Languages/Inventory/Brand/BrandIndex';

import {
    Card,
    Typography,
    Input,
    Button,
    Tooltip,
    IconButton,
    Alert,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    EllipsisHorizontalIcon,
    ChevronUpDownIcon,
    InformationCircleIcon,
    PencilIcon,
    UserPlusIcon,
    DocumentTextIcon,
    ArchiveBoxIcon,
    PlusIcon,
    DocumentArrowDownIcon,
    DocumentChartBarIcon,
} from "@heroicons/react/24/solid";


import { ButtonPrimary } from "@/Components";

import { twMerge } from "tailwind-merge";


export default function Brand({ auth, brands, deleteSuccess }) {

    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        Language.setLanguage(selectedLanguage);
    }, [selectedLanguage]);

    const TABLE_HEAD = [
        { display: Language.tableheader.code, field: "SKU" },
        { display: Language.tableheader.Name, field: "name" },
        { display: Language.tableheader.Action, field: null },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [paginated, setpaginated] = useState([]);
    const [sorting, setsorting] = useState(null);
    const [sortdirection, setsortdirection] = useState(null);
    const [searchbar, setsearchbar] = useState("");
    const { flash } = usePage().props;

    const { delete: destroy } = useForm({});

    const [isShowAlert, setIsShowAlert] = useState(false);

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
        let sortedItems = [...brands];

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
    }, [currentPage, sorting, sortdirection, searchbar, brands]);

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
            currentPage < Math.ceil(brands.length / itemsPerPage)
        ) {
            setCurrentPage(currentPage + 1);
        }
    };

    const [deletebrandsId, setDeletebrandsId] = useState(null);
    const [open, setOpen] = useState(false);
  
    const handleOpen = (id) => {
      setDeletebrandsId(id);
      setOpen(!open);
    };
  
    const [selectedbrands, setSelectedbrands] = useState(null);
    const [opendetail, setOpendetail] = React.useState(false);
    const handleOpendetail = (id) => {
      setOpendetail(!opendetail);
      const brandsData = brands.find((brands) => brands.id === id);
      setSelectedbrands(brandsData);
      console.log(brands);
      console.log(brandsData);
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
        width: 90,
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
            <Image src={Utranslogo2} style={styles.image} />
                <Text style={styles.title}>Brand Report</Text>
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
                            <Text style={styles.tableCellHeader}>Code</Text>
                        </View>
                        <View style={[styles.tableCol, styles.tableColHeader2]}>
                            <Text style={styles.tableCellHeader}>Name</Text>
                        </View>
                    </View>

                {data.map((brand, index) => (
                    <View style={styles.tableRow} key={index}>
                        <View style={[styles.tableCol, styles.tableCol2]}>
                            <Text style={styles.tableCell}>{brand.code}</Text>
                        </View>
                        <View style={[styles.tableCol, styles.tableCol2]}>
                            <Text style={styles.tableCell}>{brand.name}</Text> 
                        </View>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

    return (
        <BrandLayout user={auth.user}>
            <Head title={Language.title} />
                <Dialog open={opendetail} handler={handleOpendetail} className="overflow-auto max-h-[80vh]">
                <DialogHeader>
                    <Typography variant="h5">{Language.info.header}</Typography>
                </DialogHeader>
                <DialogBody divider>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                    <Typography variant="small" color="blue-gray">
                    {Language.info.code}
                    </Typography>
                    <Typography variant="body" color="blue-gray">
                        {selectedbrands && <div>{selectedbrands.code}</div>}
                    </Typography>
                    </div>
                    <div className="flex flex-col">
                    <Typography variant="small" color="blue-gray">
                    {Language.info.name}
                    </Typography>
                    <Typography variant="body" color="blue-gray">
                        {selectedbrands && <div>{selectedbrands.name}</div>}
                    </Typography>
                    </div>
                    <div className="flex flex-col">
                    <Typography variant="small" color="blue-gray">
                    {Language.info.email}
                    </Typography>
                    <Typography variant="body" color="blue-gray">
                        {selectedbrands && <div>{selectedbrands.email}</div>}
                    </Typography>
                    </div>
                    <div className="flex flex-col">
                    <Typography variant="small" color="blue-gray">
                    {Language.info.phone}
                    </Typography>
                    <Typography variant="body" color="blue-gray">
                        {selectedbrands && <div>{selectedbrands.number}</div>}
                    </Typography>
                    </div>
                </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                <Button variant="gradient" color="green"
                onClick={() => window.location.href = route("brands.edit", selectedbrands.id)}>
                    {Language.info.editbutton}
                </Button>
                <Button variant="outlined" onClick={handleOpendetail}>
                    <span>{Language.info.closebutton}</span>
                </Button>
                </DialogFooter>
            </Dialog>
            <Dialog open={open} size="sm" onClose={handleOpen}>
                <DialogHeader>
                <Typography variant="h5">{Language.delete.header}</Typography>
                </DialogHeader>
                <DialogBody divider className="grid place-items-center gap-4">
                <InformationCircleIcon className="w-20 h-20 text-red-400" />
                <Typography className="text-red-900" variant="h4">
                {Language.delete.title}
                </Typography>
                <Typography className="text-center font-normal">
                {Language.delete.description}
                </Typography>
                </DialogBody>
                <DialogFooter className="space-x-2">
                <Button
                    variant="gradient"
                    color="red"
                    onClick={async () => {
                    if (deletebrandsId) {
                        await destroy(route("brands.destroy", deletebrandsId), {
                        onSuccess: () => {
                            setIsShowAlert(true);
                            setDeletebrandsId(null);
                        },
                        });
                    }
                    handleOpen(null);
                    }}
                >
                    {Language.delete.confirmbutton}
                </Button>
                <Button variant="outlined" onClick={handleOpen}>
                {Language.delete.cancelbutton}
                </Button>
                </DialogFooter>
            </Dialog>
            <Alert
                className="fixed top-4 right-4 z-50 lg:w-1/4 w-1/2"
                color={flash.message?.type == "success" ? "green" : "red"}
                open={isShowAlert}
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
                                    {Language.title}
                                </Typography>
                                <Typography variant="paragraph">
                                    {Language.subtitle}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-tl-lg rounded-tr-lg overflow-hidden shadow-md h-20 py-2">
                        <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
                            <div className="flex gap-3">
                            <Linkactive href={route("brands.create")}>
                                <Button className="bg-ungukita md:flex hidden">
                                    {Language.addbutton}
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
                                                <DocumentArrowDownIcon className="w-5 h-5" stroke="red" />
                                                <PDFDownloadLink document={<MyDocument data={brands} />} fileName="brands.pdf">
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
                                <Linkactive href={route("brands.create")}>
                                <IconButton className="bg-ungukita flex md:hidden">
                                    <PlusIcon className="w-5 h-5" />
                                </IconButton>
                            </Linkactive>
                            </div>
                            <div className="inline-flex items-center">
                                <Input
                                    type="search"
                                    placeholder={Language.searchplaceholder}
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
                                {paginated.map(({ id, code, name }, index) => {
                                    const isLast = index === brands.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr
                                            key={code}
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
                                            <td className="p-4 flex">
                                                <Tooltip content={Language.tableaction.view}>
                                                        <IconButton variant="text" onClick={() => handleOpendetail(id)}>
                                                            <EyeIcon className="h-5 w-5 text-blue-800" />
                                                        </IconButton>
                                                </Tooltip>
                                                <Tooltip content={Language.tableaction.edit}>
                                                    <a
                                                        href={route(
                                                            "brands.edit",
                                                            id
                                                        )}
                                                    >
                                                        <IconButton variant="text">
                                                            <PencilSquareIcon className="h-5 w-5 text-green-500" />
                                                        </IconButton>
                                                    </a>
                                                </Tooltip>
                                                <Tooltip content={Language.tableaction.delete}>
                                                        <IconButton
                                                        variant="text"
                                                        onClick={() => handleOpen(id)}
                                                        >                                                   
                                                            <TrashIcon className="h-5 w-5 text-red-500" />
                                                        </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                })}
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
                                    {Language.pagination.page} {currentPage} {Language.pagination.of} {" "}
                                    {Math.ceil(brands.length / itemsPerPage)}
                                </Typography>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                >
                                    {Language.pagination.previous}
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={handleNext}
                                    disabled={paginated.length < itemsPerPage}
                                >
                                    {Language.pagination.next}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </BrandLayout>
    );
}
