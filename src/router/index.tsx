import { RouteObject, RouterProvider, createHashRouter } from "react-router-dom";

export default function Router() {
    const routes: RouteObject[] = [
        {
            path: '/',
            element: (
                <div></div>
            ),
        }, 
    ];
  
    const router = createHashRouter(routes);
    return <RouterProvider router={router} />;
}
  