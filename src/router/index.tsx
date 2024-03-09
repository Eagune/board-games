import DashboardLayout from "@/layouts/dashboard";
import { Navigate, RouteObject, RouterProvider, createHashRouter } from "react-router-dom";
import GameListPage from "@/pages/game/list";

export default function Router() {
    const routes: RouteObject[] = [
        {
            path: '/',
            element: (
                <DashboardLayout />
            ),
            children: [
                {
                    path: 'game',
                    children: [
                        {
                            index: true,
                            element: <Navigate to="list" replace />,
                        },
                        {
                            path: 'list',
                            element: <GameListPage />
                        },
                        {
                            path: 'creation'
                        }
                    ]
                },
            ]
        }, 
    ];
  
    const router = createHashRouter(routes);
    return <RouterProvider router={router} />;
}
  