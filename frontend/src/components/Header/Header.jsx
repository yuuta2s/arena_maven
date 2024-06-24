import React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import iconProfile from '../../assets/iconProfile.jpg';
import headerVector from '../../assets/headerVector.svg';

const navigation = [
  { name: 'Accueil', href: '#', current: true },
  { name: 'Découvrir', href: '#', current: false },
  { name: 'Mes tournois', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-opacity-0">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-primary hover:text-white focus:outline-none">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Navigation buttons */}
              <div className="flex flex-1 items-center justify-center sm:justify-center">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 mx-auto">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-primary text-white' : 'text-white hover:bg-53B84A hover:text-white',
                          'relative rounded-md px-3 py-2 text-sm font-medium before:ease overflow-hidden   text-white shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-primary before:duration-300 hover:text-white hover:shadow-[0_4px_6px_-1px_rgba(83,184,74,1),0_2px_4px_-2px_rgba(83,184,74,1)] hover:before:h-64 hover:before:-translate-y-32'
                        )}
                        data-text={item.name}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <span className="relative z-10">{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Header Vector */}
              <div className="absolute right-0 top-0 mt-0" style={{ transform: 'translateY(-15%)', marginRight: '-80px' }}>
                <img src={headerVector} alt="Header Vector" className="h-auto w-auto" />
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={iconProfile}
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-primary' : '', 'block px-4 py-2 text-sm text-black hover:text-white')}
                          >
                            Your Profile
                          </a>
                        )}
                      </MenuItem>
                      
                      <MenuItem>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-primary' : '', 'block px-4 py-2 text-sm text-black hover:text-white')}
                          >
                            Sign out
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile navigation */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-primary text-white' : 'text-white hover:bg-primary hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium glitch-btn'
                  )}
                  data-text={item.name}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
