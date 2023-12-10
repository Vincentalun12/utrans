import AdditemLayout from "@/Layouts/NavigationLayout";
import { Head } from "@inertiajs/react";
import {
  Card,
  Typography,
  Input,
  Button,
  Breadcrumbs,
  Select,
  Option,
  Label,
  Textarea
} from "@material-tailwind/react";

import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  PlusCircleIcon
} from "@heroicons/react/24/solid";

export default function Createjournalentries({ auth }) {
  return (
    <AdditemLayout user={auth.user}>
      <Head title="Create Journal Entries" />
      <div className="lg:py-4 py-1">
        <div className="mx-auto px-4 sm:px-6 lg:px-6">
          <div className="lg:hidden flex justify-between">
            <Breadcrumbs>
              <a href="#" className="opacity-60">
                Dashboard
              </a>
              <a href="#" className="Opacity-60">
                Stock
              </a>
              <a href="#">Edit</a>
            </Breadcrumbs>
          </div>
          <Card className="h-full w-full overflow-hidden rounded-none">
            <div className="grid lg:gap-8 grid-cols-1 gap-4 p-4 mx-4 mt-5">
              <div>
                <div className="p-2 text-black font-bold text-xl mb-2">Create Journal Entries</div>
                </div>
                <div>
              <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
              <label className="">Costumer name</label>
                  <Select variant="static">
                  <Option>Aliong</Option>
                  <Option>Jarwo</Option>
                  <Option>wakwak</Option>
                  <Option>wekwek</Option>
                  <Option>wokwok</Option>
                </Select>
                  </div>
              <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                  *Please select any from the above.
                </div>
              </div>
                <div>
                <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                    <Input variant="static" label="Reference" className='border-none focus:shadow-none' placeholder="Reference" />
                  </div>
                  <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                    *Please enter Reference.
                </div>
                </div>
              <div>
              <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
              <label className="">Journal</label>
                  <Select variant="static">
                  <Option>Inventory valuation</Option>
                  <Option>Inventory valuation</Option>
                  <Option>Inventory valuation</Option>
                  <Option>Inventory valuation</Option>
                  <Option>Inventory valuation</Option>
                </Select>
                  </div>
              <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                  *Please select any from the above.
                </div>
              </div>
              <div>
                <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                    <Input variant="static" label="Total" className='border-none focus:shadow-none' placeholder="Total" />
                  </div>
                  <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                    *Please enter Total.
                </div>
                </div>
              <div>
                <Button className="w-full lg:w-4/6 h-12 bg-ungukita">Save</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdditemLayout>
  );
}