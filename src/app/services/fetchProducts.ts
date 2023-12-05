export async function getProductData() {
  return await fetch("https://fakestoreapi.com/products?limit=15", {
    next: { revalidate: 30 },
  }).then((res) => res.json());
}

export async function getProductById(id: number) {
  return await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 10 },
  }).then((res) => res.json());
}
