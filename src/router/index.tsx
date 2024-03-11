import { Navigate, RouteObject, RouterProvider, createHashRouter } from "react-router-dom";
import routes from "./routes";

import DashboardLayout from "@/layouts/dashboard";

export default function Router() {
    const layoutRoutes: RouteObject[] = [
        {
            path: '/',
            element: (
                <DashboardLayout />
            ),
            children: [
                {
                    index: true,
                    element: <Navigate to="game-list" replace />,
                },
                ...routes as RouteObject[]
            ]
        }, 
    ]
    const router = createHashRouter(layoutRoutes);
    return <RouterProvider router={router} />;
}
  