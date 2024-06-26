import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../Account/Login/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom"; // Importer Link depuis react-router-dom
import iconProfile from "../../assets/iconProfile.jpg";
import headerVector from "../../assets/headerVector.svg";
import Login from "@components/Account/Login/Login";

const navigation = [
  { name: "Accueil", href: "/", current: true },
  { name: "Découvrir", href: "/decouvrir", current: false },
  { name: "Mes tournois", href: "/mes-tournois", current: false },
  { name: "Contact", href: "/contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { logout, isAuthenticated, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Disclosure as="nav" className="bg-opacity-0">
      {({ open }) => (
        <>
          <div className="mx-auto">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-primary hover:text-white focus:outline-none">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Navigation buttons */}
              <div className="flex flex-1 items-center justify-center sm:justify-center">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 mx-auto">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-primary text-white"
                            : "text-white hover:bg-53B84A hover:text-white",
                          "relative rounded-md px-3 py-2 text-sm font-medium before:ease overflow-hidden text-white shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-primary before:duration-300 hover:text-white hover:shadow-[0_4px_6px_-1px_rgba(83,184,74,1),0_2px_4px_-2px_rgba(83,184,74,1)] hover:before:h-64 hover:before:-translate-y-32"
                        )}
                        data-text={item.name}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <span className="relative z-10">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Header Vector */}
              <div
                className="absolute right-0 top-0 mt-0"
                style={{ transform: "translateY(-15%)" }}
              >
                <img
                  src={headerVector}
                  alt="Header Vector"
                  className="h-auto w-auto"
                />
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full text-sm focus:outline-none">
                      <span className="absolute" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full -translate-x-14"
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
                            href="*"
                            className={classNames(
                              active ? "bg-primary" : "",
                              "block px-4 py-2 text-sm text-black hover:text-white"
                            )}
                          >
                            {userData
                              ? `Logged in as ${userData.name}`
                              : "your profile"}
                          </a>
                        )}
                      </MenuItem>

                      <MenuItem>
                        {({ active }) => (
                          <a
                            href="/register"
                            className={classNames(
                              active ? "bg-primary" : "",
                              "block px-4 py-2 text-sm text-black hover:text-white"
                            )}
                          >
                            Sign up
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) =>
                          isAuthenticated ? (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? "bg-red-600" : "bg-red-500",
                                "block w-full text-left px-4 py-2 text-sm text-white hover:bg-red-600 hover:text-white"
                              )}
                            >
                              Se déconnecter
                            </button>
                          ) : (
                            <a
                              href="/Login"
                              className={classNames(
                                active ? "bg-primary" : "",
                                "block px-4 py-2 text-sm text-black hover:text-white"
                              )}
                            >
                              Se connecter
                            </a>
                          )
                        }
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile navigation */}
          <Disclosure.Panel className="sm:hidden min-[320px]">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-primary text-white"
                      : "text-white hover:bg-primary hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium glitch-btn"
                  )}
                  data-text={item.name}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}