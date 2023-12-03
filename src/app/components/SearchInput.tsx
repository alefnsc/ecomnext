import { IoSearchSharp } from "react-icons/io5";

export default function SearchInput() {
  return (
    <div className="flex flex-row w-full justify-center">
      <input
        className="w-[80%] flex max-w-screen py-2 px-4 bg-gray-100 text-gray-800 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:bg-gray-200 focus:text-gray-900  rounded-r-none rounded-l-full"
        placeholder="Search"
      />
      <button className="flex py-2 px-4 bg-red-700 text-gray-100 transition duration-300 ease-in-out hover:outline-none focus:ring-1 hover:ring-gray-100 hover:bg-red-600 hover:text-gray-900 rounded-l-none rounded-r-full">
        <IoSearchSharp className="w-5 h-5" />
      </button>
    </div>
  );
}
