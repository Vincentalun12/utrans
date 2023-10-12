import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
export default function Guest({ children }) {
return (
<div className="h-screen md:flex">
  <div
    className="relative overflow-hidden bg-ungukita md:flex w-1/2 justify-around items-center hidden">
  </div>
  <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
    <div className="w-full sm:max-w-md mt-6 px-6 py-4 overflow-hidden sm:rounded-lg">
      {children}  
    </div>
  </div>
</div>
);
}
