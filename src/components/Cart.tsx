import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  return (
    <div className="flex flex-row">
      <FaShoppingCart className="lg:w-8 lg:h-8 w-6 h-6 text-gray-100 transition duration-300 ease-in-out hover:outline-none focus:ring-1 hover:ring-gray-100  hover:text-gray-900" />
    </div>
  );
}
