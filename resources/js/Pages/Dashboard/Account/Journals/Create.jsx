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

export default function Createjournals({ auth }) {
  return (
    <AdditemLayout user={auth.user}>
      <Head title="Create Journals" />
      <div className="sm:mt-18 sm:mb-20 mt-12 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">

          <Card className="h-full w-full overflow-hidden rounded-none">
            <div className="grid lg:gap-8 grid-cols-1 gap-4 p-4 mx-4 mt-5">
              <div>
                <div className="p-2 text-black font-bold text-xl mb-2">Create Journals</div>
                </div>
                <div>
                <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                    <Input variant="static" label="Short code" className='border-none focus:shadow-none' placeholder="Short code" />
                  </div>
                  <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                    *Please enter short code.
                </div>
                </div>
                <div>
                <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                    <Input variant="static" label="Account name" className='border-none focus:shadow-none' placeholder="Account Name" />
                  </div>
                  <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                    *Please enter account name.
                </div>
                </div>
              <div>
              <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
              <label className="">Type</label>
                  <Select variant="static">
                  <Option>Bank and Cash</Option>
                  <Option>Bank and Cash</Option>
                  <Option>Bank and Cash</Option>
                  <Option>Bank and Cash</Option>
                  <Option>Bank and Cash</Option>
                </Select>
                  </div>
              <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                  *Please select any from the above.
                </div>
              </div>
              <div>
              <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
              <label className="">Default account</label>
                  <Select variant="static">
                  <Option>Kas kecil</Option>
                  <Option>Kas Besar</Option>
                </Select>
                  </div>
              <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                  *Please select any from the above.
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