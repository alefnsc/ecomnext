import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["/", "/products", "/products/[id]"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+.[w]+$)", "/admin"],
};
