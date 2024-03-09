import { RouteObject, RouterProvider, createHashRouter } from "react-router-dom";
import routes from "./routes";

import DashboardLayout from "@/layouts/dashboard";

export default function Router() {
    const layoutRoutes: RouteObject[] = [
        {
            path: '/',
            element: (
                <DashboardLayout />
            ),
            children: routes as RouteObject[]
        }, 
    ]
    const router = createHashRouter(layoutRoutes);
    return <RouterProvider router={router} />;
}
  