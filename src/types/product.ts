export interface Product {
  id: string;
  name: string;
  imageUrl: string | null;
  price: number;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  ProductStock?: ProductStock[];
  orderItems?: OrderItem[];
}

export interface ProductStock {
  id: number;
  quantity: number;
  productId: number;
  Product?: Product;
}

export interface OrderItem {
  id: number;
  quantity: number;
  productId: number;
  orderId: number;
  Product?: Product;
  Order?: Order;
}

export interface Order {
  id: number;
  total: number;
  userId: number;
  OrderItems?: OrderItem[];
}
