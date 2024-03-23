import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/products",
    /^\/products\/.*/,
    "/api/products",
    "/api/products/:productId",
    "/api/products/:productId/toggleProduct",
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
    "/api/products/:productId",
    "/api/products/:productId/toggleProduct",
    "/categories",
    "/api/categories",
  ],
};
