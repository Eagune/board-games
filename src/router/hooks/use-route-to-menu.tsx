import { AppRouteObject } from "@/types/router";
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { menuFilter } from "../utils";
import { useCallback } from "react";

export function useRouteToMenuFn() {
    const routeToMenuFn = useCallback(
        (items: AppRouteObject[]) => {
            return menuFilter(items).map((item) => {
                const menuItem: any = [];
                const { handle, children } = item;
                if (handle) {
                    const { key, label } = handle;
                    menuItem.key = key;
                    menuItem.label = label;
                    if (children) {
                        const childrenMenu = routeToMenuFn(children)
                        if (childrenMenu.length) menuItem.children = childrenMenu;
                    }
                }
                return menuItem as MenuItemType;
            }) || [];
        },
        []
    );
    return routeToMenuFn;
}