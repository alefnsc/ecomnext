"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import { IoHomeOutline } from "react-icons/io5";
import { RiProductHuntLine } from "react-icons/ri";

export default function ListMenu() {
  const menuRef = useRef<HTMLDivElement>(null);

  function toggleDropdownMenu() {
    const dropdownMenu = menuRef.current;
    dropdownMenu?.classList.toggle("none");
    if (!dropdownMenu?.classList.contains("none")) {
      dropdownMenu?.focus();
    }
  }

  function handleOutsideClick(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      menuRef.current.classList.add("none");
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative">
      <TiThMenu
        onClick={toggleDropdownMenu}
        className="lg:w-8 lg:h-8 w-6 h-6 text-gray-100 transition duration-300 ease-in-out hover:outline-none focus:ring-1 hover:ring-gray-100  hover:text-gray-900"
      />
      {/* Dropdown menu */}
      <div
        id="menuList"
        ref={menuRef}
        className="none flex flex-col items-start justify-start absolute top-9 left-0 w-64 bg-white text-gray-500 shadow-lg rounded-2xl py-2 px-4 transition-shadow ease-in focus-visible:translate-y-1"
      >
        <Link
          className="flex flex-row items-center lg:py-2 py-1 hover:text-red-600 w-full transition duration-300 ease-in-out"
          href="/"
        >
          <IoHomeOutline className="pr-2 lg:w-7 lg:h-7 w-6 h-6" />
          Home
        </Link>
        <Link
          className="flex flex-row items-center  lg:py-2 py-1 hover:text-red-600 w-full transition duration-300 ease-in-out"
          href="/products"
        >
          <RiProductHuntLine className="pr-2 lg:w-7 lg:h-7 w-6 h-6" />
          Products
        </Link>
      </div>
    </div>
  );
}
