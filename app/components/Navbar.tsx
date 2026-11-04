"use client";

// import { navLinks } from './assets/data';
import React, { useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  // const t = useTranslations("T");
  // const navLinks = [
  // { href: "#top", label: t("home") },
  // { href: '#about', label: 'About' },
  // { href: '#services', label: 'Services' },
  // { href: "#projects", label: t("projects") },
  // { href: "#contact", label: t("contacts") },
  // ];

  return (
    <nav className="sticky top-0 lg:px-8 xl:px-[8%] py-4 flex justify-center z-50">
      <ul
        className=" hidden md:flex items-center gap-6 lg:gap-8 rounded-full
      px-12 py-3 bg-background shadow-xs"
      >
        {/* {navLinks.map(({ href, label }) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))} */}
      </ul>

      <div className=" ml-auto md:hidden">
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className=" fixed top-4 right-4 z-50 flex items-center px-3 py-2
        border cursor-pointer border-slate-200 text-slate-200
        hover:text-white hover:border-white"
        >
          {navbarOpen ? (
            <XMarkIcon className=" h-5 w-5" />
          ) : (
            <Bars3Icon className=" h-5 w-5" />
          )}
        </button>
      </div>

      {navbarOpen && (
        <div className=" fixed top-0 left-0 w-full py-20 space-y-6 z-40 backdrop-blur-md">
          <ul className=" flex gap-4 flex-col text-center">
            {/* {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className=" text-white text-lg">
                  {label}
                </a>
              </li>
            ))} */}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
