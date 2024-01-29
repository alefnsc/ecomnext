import { Metadata } from "next";
import ProductView from "../../../components/ProductView";

interface IProductPageProps {
  params: {
    productId: string;
  };
}

async function getProduct(id: string): Promise<any> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 },
    }
  );
  const product = await response.json();

  return product;
}

export async function generateMetadata({
  params,
}: IProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.productId);
  return {
    title: product.name,
  };
}

export async function ProductDetailPage({ params }: IProductPageProps) {
  const productId = params.productId;
  const product = await getProduct(productId);

  return <ProductView product={product} />;
}

export default ProductDetailPage;
