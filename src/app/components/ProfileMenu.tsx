import { CgProfile } from "react-icons/cg";

export default function ProfileMenu() {
  return (
    <div className="flex flex-row">
      <CgProfile className="w-8 h-8  text-gray-100 transition duration-300 ease-in-out hover:outline-none focus:ring-1 hover:ring-gray-100  hover:text-gray-900" />
    </div>
  );
}
