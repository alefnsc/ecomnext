import Container from "@/app/components/Container";
import { Metadata } from "next";
import Image from "next/image";
import { getProductById } from "@/app/services/fetchProducts";
import { formatCurrency } from "@/app/helpers/numberHelpers";

interface IProductPageProps {
  params: {
    productId: string;
  };
}

export async function generateMetadata({
  params,
}: IProductPageProps): Promise<Metadata> {
  const product = await getProductById(Number(params.productId));
  return {
    title: product.title,
  };
}

export async function ProductDetailPage({ params }: IProductPageProps) {
  const productId = Number(params.productId);
  const {
    title,
    image,
    description,
    price,
    category,
    active = 1,
  } = await getProductById(productId);

  if (!title) {
    return <div>Product not found</div>;
  }
  return (
    <>
      <Container title={title}>
        <div className="flex flex-row items-center justify-center text-justify w-full">
          <div className="flex flex-col  w-full  py-8 px-4 mx-4 my-6 ">
            <Image
              alt={title}
              src={image}
              width={200}
              height={200}
              className="object-cover w-64 h-64 sm:w-96 sm:h-96 md:w-96 md:h-96 lg:w-96 lg:h-96 xl:w-96 xl:h-96 transform-gpu rounded-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-150 "
            />
            <p className="p-1 mt-4 ml-4 w-[50%] text-lg text-center bg-yellow-600 text-gray-100">
              {category}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center text-justify">
            <p className="p-4 w-[90%] text-lg">{description}</p>
            <p className="p-4 w-[90%] text-lg font-bold my-4 border-2">
              {formatCurrency(price)}
            </p>
            {active ? (
              <>
                <p className="p-2 w-[90%] text-lg text-center text-green-700">
                  Available
                </p>
                <button className="my-4 p-4 w-[90%] text-lg text-gray-100 bg-cyan-700 shadow-md hover:shadow-2xl transition duration-500 ease-in-out hover:shadow-cyan-600 hover:text-gray-900  ">
                  Add to Cart
                </button>
              </>
            ) : (
              <p className="p-4 w-[90%] text-lg">Unavailable</p>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default ProductDetailPage;
