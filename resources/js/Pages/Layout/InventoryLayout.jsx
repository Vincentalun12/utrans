import InventoryLayout from "@/Layouts/NavigationLayout";
import { Head } from "@inertiajs/react";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = [
  "SKU",
  "Name",
  "Categories",
  "Retail",
  "Wholesale",
  "Stock",
  "Action",
];

const TABLE_ROWS = [
  {
    SKU: "SKU001",
    Name: "Baju",
    Categories: "Pakaian",
    Retail: "10000",
    Wholesale: "9000",
    Stock: "10",
  },
  {
    SKU: "SKU002",
    Name: "Celana",
    Categories: "Pakaian",
    Retail: "15000",
    Wholesale: "14000",
    Stock: "15",
  },
  {
    SKU: "SKU003",
    Name: "Sepatu",
    Categories: "Pakaian",
    Retail: "20000",
    Wholesale: "19000",
    Stock: "20",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Categories: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Categories: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Categories: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Categories: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Categories: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Categories: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Categories: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Categories: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
];

export default function Inventory({ auth }) {
  return (
    <InventoryLayout user={auth.user}>
      <Head title="Inventory" />
      <div className="py-6">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="h-full w-full lg:overflow-auto overflow-x-scroll overflow-y-hidden max-h-[470px] rounded-none">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(
                  (
                    { SKU, Name, Categories, Retail, Wholesale, Stock },
                    index
                  ) => (
                    <tr key={SKU} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {SKU}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Categories}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Retail}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Wholesale}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Stock}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </InventoryLayout>
  );
}
