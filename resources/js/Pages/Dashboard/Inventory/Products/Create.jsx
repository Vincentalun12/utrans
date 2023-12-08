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

export default function Additem({ auth }) {
  return (
    <AdditemLayout user={auth.user}>
      <Head title="Add item" />
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
                <div className="p-2 text-black font-bold text-xl mb-2">Name and brands</div>
                  <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                    <Input variant="static" label="Name" className='border-none focus:shadow-none' placeholder="Input your product name" />
                  </div>
                  <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                  *Provide the name of your brands that is suitable for the
                  item you are selling.
                </div>
                </div>
              <div>
                <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                  <label className="">Brand</label>
                  <Select variant="static" placeholder="Select brand from the following..">
                  <Option>1</Option>
                  <Option>2</Option>
                  <Option>3</Option>
                  <Option>4</Option>
                  <Option>5</Option>
                </Select>
                </div>
                <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                  *Provide the name of your brands that is suitable for the
                  item you are selling.
                </div>
              </div>
            <div>
              <div className="p-2 text-black font-bold text-xl mb-2">Prices and stock</div>
              <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                    <Input variant="static" label="Retail" className='border-none focus:shadow-none' placeholder="Input your retail price" />
                  </div>
              <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                  *For each items.
                </div>
            </div>
            <div>
              <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                    <Input variant="static" label="Wholesale" className='border-none focus:shadow-none' placeholder="Input your wholesale price" />
                </div>
              <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                  *For each items.
                </div>
              </div>
              <div>
              <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                    <Input variant="static" label="Stocks" className='border-none focus:shadow-none' placeholder="Input your stocks" />
                  </div>
              <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                  *Put your stock x1.
                </div>
              </div>
              <div>
              <div className="p-2 text-black font-bold text-xl mb-2">Product image</div>
              <div className="mx-2">
                  <label className="flex justify-center items-center outline-dashed outline-2 outline-offset-2 px-4 py-4 h-48 lg:h-64 lg:w-4/6 w-full hover:outline-blue-800 hover:text-blue-800">
                    <div className="flex flex-col items-center justify-center">
                      <PlusCircleIcon className="h-6 w-6" />
                    <div className="">Add image</div>
                    </div>
                    <input className="cursor-pointer hidden" type="file"/>
                  </label>
                  </div>
                  <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                  *SVG, PNG, JPG or GIF (MAX. 300x300px or 1:1 ratio)
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