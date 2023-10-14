import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { CashierVector, Utranslogo } from '@/Assets';

export default function Guest({ children }) {
  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden bg-ungukita md:flex w-1/2 justify-around items-center hidden">
        <div className="absolute inset-8">
      <img src={Utranslogo} alt="Cashier Vector" className="lg:h-10 md:h-8"/>
      </div>
        <img src={CashierVector} alt="Cashier Vector" className="w-1/2"/>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <div className="w-full sm:max-w-md mt-6 px-6 py-4 overflow-hidden sm:rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
