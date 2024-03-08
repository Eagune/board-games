import DashboardLayout from "@/layouts/dashboard";
import { RouteObject, RouterProvider, createHashRouter } from "react-router-dom";

export default function Router() {
    const routes: RouteObject[] = [
        {
            path: '/',
            element: (
                <DashboardLayout />
            ),
        }, 
    ];
  
    const router = createHashRouter(routes);
    return <RouterProvider router={router} />;
}
  