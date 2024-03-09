import { useEffect, useState } from 'react';
import { Menu, MenuProps } from 'antd';
import routes from '@/router/routes';
import { AppRouteObject } from "@/types/router";
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';

const menuFilter = (items: AppRouteObject[]) => {
    return items.filter((item) => {
        const show = item.meta?.key;
        if (show && item.children) {
          item.children = menuFilter(item.children);
        }
        return show;
    });
};

const routeToMenuFn = function (items: AppRouteObject[]) {
    return menuFilter(items).map((item) => {
        const menuItem: any = [];
        const { meta, children } = item;
        if (meta) {
            const { key, label } = meta;
            menuItem.key = key;
            menuItem.label = label;
            if (children) {
                menuItem.children = routeToMenuFn(children);
            }
        }
        return menuItem as MenuItemType;
    }) || [];
};

export default function Nav() {
    const navigate = useNavigate();
    const matches = useMatches();
    const { pathname } = useLocation();

    // state
    const menuList = routeToMenuFn(routes);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    useEffect(() => {
        const openKeys = matches
            .filter((match) => match.pathname !== '/')
            .map((match) => match.pathname);
        setOpenKeys(openKeys);
        setSelectedKeys([pathname]);
    }, [pathname, matches]);

    // events
    const onClick: MenuProps['onClick'] = ({ key }) => {
        navigate(key);
    };
    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey) {
          setOpenKeys(keys);
        } else {
          setOpenKeys([]);
        }
    };

    return (
        <div className="flex-shrink-0">
            <Menu
                mode='inline'
                className="h-full !border-none"
                items={menuList}
                onClick={onClick}
                openKeys={openKeys}
                defaultOpenKeys={openKeys}
                selectedKeys={selectedKeys}
                defaultSelectedKeys={selectedKeys}
                onOpenChange={onOpenChange}
            />
        </div>
    )
}
