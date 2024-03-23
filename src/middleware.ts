import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/products",
    /^\/products\/.*/,
    "/api/products",
    "/api/products/:productId",
    "/categories",
    /^\/categories\/.*/,
    "/api/categories",
    "/api/categories/:categoryId",
  ],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/products",
    "/api/products",
    "/categories",
    "/api/categories",
  ],
};
