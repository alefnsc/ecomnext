import { FaShoppingBasket } from "react-icons/fa";
import Link from "next/link";

type Props = {};

export default function AdminPanel({}: Props) {
  return (
    <>
      <div className="flex flex-row flex-0 max-w-[1200px] items-center justify-center">
        <Link href="/admin/products">
          <div className="flex flex-col items-center justify-center border-cyan-600 text-gray-600 border m-6 hover:bg-cyan-600 group px-8 py-6 rounded-xl">
            <span className="text-xl">Products</span>
            <FaShoppingBasket className="w-20 h-20 mt-16 group-hover:text-white" />
          </div>
        </Link>
      </div>
    </>
  );
}
