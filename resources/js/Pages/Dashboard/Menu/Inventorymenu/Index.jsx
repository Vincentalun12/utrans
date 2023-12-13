import InventoryLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from 'react';
import Linkactive from "@/Components/Linkactive";
import { Head, Link } from "@inertiajs/react";
import { Global, css } from '@emotion/react';
import {
  Card,
  Typography,
  Input,
  Button,
  ThemeProvider,
  IconButton,
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
  ArchiveBoxIcon
} from "@heroicons/react/24/solid";

import { ButtonPrimary } from "@/Components";

import { twMerge } from 'tailwind-merge'
import { Backdrop } from "@mui/material";

const TABLE_HEAD = [
  { display: "Code", field: "code" },
  { display: "Accout Name", field: "name" },
  { display: "Type", field: "type" },
  { display: "View", field: "null" },
];

const TABLE_ROWS = [
  {
    code: "1",
    name: "Kas Kecil",
    type: "Bank and Cash",
  },
  {
    code: "1",
    name: "Kas Kecil",
    type: "Bank and Cash",
  },
  {
    code: "1",
    name: "Kas Kecil",
    type: "Bank and Cash",
  },
  {
    code: "1",
    name: "Kas Kecil",
    type: "Bank and Cash",
  },
];

export default function Inventory({ auth }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [paginated, setpaginated] = useState([]);
  const [sorting, setsorting] = useState(null);
  const [sortdirection, setsortdirection] = useState(null);
  const [searchbar, setsearchbar] = useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    let sortedItems = [...TABLE_ROWS];

    if (searchbar) {
      const terms = searchbar.toLowerCase().split(' ');
      sortedItems = sortedItems.filter(item =>
        terms.every(term =>
          Object.values(item).some(val =>
            String(val).toLowerCase().includes(term)
          )
        )
      );
    }

    if (sorting && sortdirection) {
      sortedItems.sort((a, b) => {
        let aValue = a[sorting];
        let bValue = b[sorting];
    
        if (sorting === 'retail' || sorting === 'wholesale') {
          aValue = Number(aValue.replace(/\D/g, ''));
          bValue = Number(bValue.replace(/\D/g, ''));
        }
    
        if (aValue < bValue) {
          return sortdirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortdirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setpaginated(sortedItems.slice(start, end));
  }, [currentPage, sorting, sortdirection, searchbar]);

  const handleSort = (field) => {
    if (field === sorting) {
      setsortdirection(sortdirection === 'asc' ? 'desc' : 'asc');
    } else {
      setsorting(field);
      setsortdirection('asc');
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (paginated.length === itemsPerPage && currentPage < Math.ceil(TABLE_ROWS.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const theme = {
    dialog: {
      defaultProps: {
        size: "md",
        dismiss: {},
        animate: {
          unmount: {},
          mount: {},
        },
        className: "",
      },
      valid: {
        sizes: ["xs", "sm", "md", "lg", "xl", "xxl"],
      },
      styles: {
        base: {
          backdrop: {
            display: "grid",
            placeItems: "place-items-center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "w-screen",
            height: "h-screen",
            backgroundOpacity: "bg-opacity-60", // Change this to adjust the opacity of the backdrop
            backdropFilter: "backdrop-blur-md", // Change this to adjust
          },
          container: {
            position: "relative",
            bg: "bg-white",
            m: "m-4",
            borderRadius: "rounded-lg",
            boxShadow: "shadow-2xl",
            color: "text-blue-gray-500",
            fontSmoothing: "antialiased",
            fontFamily: "font-sans",
            fontSize: "text-base",
            fontWeight: "font-light",
            lineHeight: "leading-relaxed",
          },
        },
      },
    },
  };


  return (
    <InventoryLayout user={auth.user}>
      <Head title="Inventory Menu" />

    </InventoryLayout>
  );
}
