import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  HomeIcon,
  CubeIcon,
  ChartBarIcon,
  InformationCircleIcon,
  PlusIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const { hasPermission } = useAuth();

  // Define navigation items with permissions
  const navigationItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: HomeIcon,
      permission: "view_dashboard",
    },
    {
      name: "Products",
      href: "/products",
      icon: CubeIcon,
      permission: "view_products",
    },
    {
      name: "Add Product",
      href: "/products/add",
      icon: PlusIcon,
      permission: "create_products",
    },
    {
      name: "Reports",
      href: "/reports",
      icon: ChartBarIcon,
      permission: "view_reports",
    },
    {
      name: "About",
      href: "/about",
      icon: InformationCircleIcon,
      permission: "view_about",
    },
  ];

  // Filter navigation based on user permissions
  const navigation = navigationItems.filter((item) =>
    hasPermission(item.permission)
  );

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-800 focus:outline-none">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  <div className="flex flex-shrink-0 items-center px-4">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">IMS</h1>
                  </div>
                  <nav aria-label="Sidebar" className="mt-5">
                    <div className="space-y-1 px-2">
                      {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                              isActive
                                ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                            }`}
                            onClick={() => setOpen(false)}
                          >
                            <item.icon
                              className={`mr-4 h-6 w-6 flex-shrink-0 ${
                                isActive
                                  ? "text-blue-500"
                                  : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                              }`}
                            />
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 pt-5 pb-4 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">IMS</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 flex-shrink-0 ${
                      isActive
                        ? "text-blue-500"
                        : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
