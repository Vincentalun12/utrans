import React from "react";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
   HomeIcon,
   ArchiveBoxIcon,
   ChartBarIcon,
   Cog6ToothIcon,
   PowerIcon,
 } from "@heroicons/react/24/solid";
 import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {

   const [open, setOpen] = React.useState(0);
 
   const handleOpen = (value) => {
     setOpen(open === value ? 0 : value);
   };

   return (
    <Card className="h-screen sticky top-0 w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none">
   <div className="mb-2 p-4">
      <Typography variant="h5" color="blue-gray">
         Sidebar
      </Typography>
   </div>
   <List>
      <Accordion
      open={open === 1}
      icon={
      <ChevronDownIcon
      strokeWidth={2.5}
      className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
      />
      }
      >
      <ListItem>
         <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
         </ListItemPrefix>
         Dashboard
      </ListItem>
      <ListItem className="p-0" selected={open === 1}>
      <AccordionHeader onClick={() =>
         handleOpen(1)} className="border-b-0 p-3">
         <ListItemPrefix>
            <ArchiveBoxIcon className="h-5 w-5" />
         </ListItemPrefix>
         <Typography color="blue-gray" className="mr-auto font-normal">
            Inventory
         </Typography>
      </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
         <List className="p-0">
            <ListItem>
               <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
               </ListItemPrefix>
               Stock
            </ListItem>
            <ListItem>
               <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
               </ListItemPrefix>
               Idk
            </ListItem>
            <ListItem>
               <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
               </ListItemPrefix>
               Idk
            </ListItem>
         </List>
      </AccordionBody>
      </Accordion>
      <Accordion
      open={open === 2}
      icon={
      <ChevronDownIcon
      strokeWidth={2.5}
      className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
      />
      }
      >
      <ListItem className="p-0" selected={open === 2}>
      <AccordionHeader onClick={() =>
         handleOpen(2)} className="border-b-0 p-3">
         <ListItemPrefix>
            <ChartBarIcon className="h-5 w-5" />
         </ListItemPrefix>
         <Typography color="blue-gray" className="mr-auto font-normal">
            Sales
         </Typography>
      </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
         <List className="p-0">
            <ListItem>
               <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
               </ListItemPrefix>
               Point of sales
            </ListItem>
            <ListItem>
               <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
               </ListItemPrefix>
               Revenue
            </ListItem>
         </List>
      </AccordionBody>
      </Accordion>
      <ListItem>
         <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
         </ListItemPrefix>
         Settings
      </ListItem>
      <ListItem>
         <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
         </ListItemPrefix>
         Log Out
      </ListItem>
   </List>
</Card>
   );
}