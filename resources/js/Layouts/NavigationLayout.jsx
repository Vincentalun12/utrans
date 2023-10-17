import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/Linkactive';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Linkactive from '@/Components/Linkactive';
import Button from '@mui/material/Button';

export default function Authenticated({ user, header, children }) {
   const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
   return (
      <div className="min-h-screen bg-stone-100">
         {/* <nav className="bg-ungukita w-full sticky top-0">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 ml-10">
               <div className="flex justify-between h-16">
                  <div className="flex">
                     <div className="shrink-0 flex items-center">
                        <Link href="/">
                           <ApplicationLogo />
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </nav> */}
         <div className="flex flex-col">
            <div className="flex">
               <card className="sticky flex z-20 h-screen lg:flex flex-col w-64 bg-ungukita top-0">
                  <div className="flex justify-center py-6">
                     <Link href="/">
                        <ApplicationLogo />
                     </Link>
                  </div>
                  <div className="border h-full border-gray-200 bg-white">
                     <div className="flex flex-col pt-5 pb-4 overflow-y-auto px-3 divide-y space-y-1">
                        <ul className="space-y-2 pb-2">
                           <li>
                              <Linkactive href={route('dashboard')} active={route().current('dashboard')}>
                                 <svg className="w-6 h-6 text-gray-500 group-hover:text-black transition duration-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                 </svg>
                                 <span className="ml-3 group-hover:font-bold">Dashboard</span>
                              </Linkactive>
                           </li>
                           <li>
                              <Linkactive href={route('inventory')} active={route().current('inventory')}>
                                 <svg className="w-6 h-6 text-gray-500 group-hover:text-black transition duration-100 active:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                 </svg>
                                 <span className="ml-3 group-hover:font-bold">Inventory</span>
                              </Linkactive>
                           </li>
                           <li>
                              <a href="#" className="text-black font-normal rounded-lg flex items-center p-2 hover:bg-gray-200 group">
                                 <svg className="w-6 h-6 text-gray-500 group-hover:text-black transition duration-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                                 </svg>
                                 <span className="ml-3 group-hover:font-bold">Sales</span>
                              </a>
                           </li>
                           <li>
                              <a href="#" className="text-black font-normal rounded-lg flex items-center p-2 hover:bg-gray-200 group">
                                 <svg className="w-6 h-6 text-gray-500 group-hover:text-black transition duration-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                 </svg>
                                 <span className="ml-3 group-hover:font-bold">Users</span>
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </card>
               <main className="w-full">
                  <nav className="w-full sticky top-0 bg-white border-b">
                     <div className="mx-auto px-6 sm:px-6 lg:px-8 ml-10">
                        <div className="flex justify-between h-20">
                           <div className="flex">
                              <div className="shrink-0 flex items-center">
                              </div>
                           </div>
                        </div>
                     </div>
                  </nav>
                  {children}
                  {children}
                  {children}
                  {children}
                  {children}
                  {children}
               </main>
            </div>

         </div>
      </div>
   );
}