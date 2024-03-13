import { AppRouteObject, RouteMeta } from "@/types/router";

export const menuFilter = (items: AppRouteObject[]) => {
    return items.filter((item) => {
        const show = item.handle?.key;
        if (show && item.children) {
          item.children = menuFilter(item.children);
        }
        return show;
    });
};

export const flattenMenuRoutes = (routes: AppRouteObject[]) => {
    return routes.reduce<RouteMeta[]>((prev, item) => {
        const { handle, children } = item;
        if (handle) prev.push(handle);
        if (children) prev.push(...flattenMenuRoutes(children));
        return prev;
    }, []);
}