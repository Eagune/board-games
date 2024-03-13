import { useEffect, useState } from 'react';
import { Menu, MenuProps } from 'antd';
import routes, { gameCreationRoutes } from '@/router/routes';
import { AppRouteObject } from "@/types/router";
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { Params, useLocation, useMatches, useNavigate, useParams } from 'react-router-dom';

const menuFilter = (items: AppRouteObject[]) => {
    return items.filter((item) => {
        const show = item.meta?.key;
        if (show && item.children) {
          item.children = menuFilter(item.children);
        }
        return show;
    });
};

const routeToMenuFn = function (items: AppRouteObject[], params: Params) {
    return menuFilter(items).map((item) => {
        const menuItem: any = [];
        const { meta, children } = item;
        if (meta) {
            const { key, label } = meta;
            menuItem.key = key;
            Object.keys(params).forEach(paramKey => {
                menuItem.key = menuItem.key.replace(`:${paramKey}`, params[paramKey] || '');
            })
            menuItem.label = label;
            if (children) {
                menuItem.children = routeToMenuFn(children, params);
            }
        }
        return menuItem as MenuItemType;
    }) || [];
};

export default function Nav() {
    const navigate = useNavigate();
    const matches = useMatches();
    const { pathname } = useLocation();
    const params = useParams();

    // state
    const [menuList, setMenuList] = useState<MenuItemType[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    useEffect(() => {
        if (pathname.indexOf('/game-creation') >= 0) {
            setMenuList(routeToMenuFn(gameCreationRoutes, params));
        } else {
            setMenuList(routeToMenuFn(routes, params));
        }
        const openKeys = matches
            .filter((match) => match.pathname !== '/')
            .map((match) => match.pathname);
        setOpenKeys(openKeys);
        setSelectedKeys([pathname]);
    }, [pathname, matches, params]);

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
