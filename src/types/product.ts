export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
  description: string | null;
  active?: boolean;
}
