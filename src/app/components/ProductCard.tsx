import Link from "next/link";
import Image from "next/image";

interface IProductCardProps {
  product: {
    id: number;
    title: string;
    image: string;
  };
}

export default function ProductCard({ product }: IProductCardProps) {
  return (
    <div
      key={product.id}
      className="flex flex-col max-w-[300px] py-8 px-4 mx-4 my-6 rounded-lg shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 border-2 border-gray-200"
    >
      <Link href={`/products/${product.id}`}>
        <Image
          alt={product.title}
          src={product.image}
          width={200}
          height={200}
          className="rounded-lg object-cover object-center w-64 h-64"
        />
        <h2 className="p-4 w-[90%] text-lg">{product.title}</h2>
      </Link>
    </div>
  );
}
