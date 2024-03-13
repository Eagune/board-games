import { useEffect, useState } from 'react';
import { Menu, MenuProps } from 'antd';
import routes, { gameCreationRoutes } from '@/router/routes';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useLocation, useMatches, useNavigate, useParams } from 'react-router-dom';
import { useRouteToMenuFn } from '@/router/hooks/use-route-to-menu';
import { RouteMeta } from '@/types/router';

export default function Nav() {
    const navigate = useNavigate();
    const matches = useMatches();
    const { pathname } = useLocation();
    const params = useParams();
    const routeToMenuFn = useRouteToMenuFn();

    // state
    const [menuList, setMenuList] = useState<MenuItemType[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    useEffect(() => {
        if (pathname.indexOf('/game-creation') >= 0) {
            setMenuList(routeToMenuFn(gameCreationRoutes));
        } else {
            setMenuList(routeToMenuFn(routes));
        }
        const keys = matches
            .filter((match) => match.pathname !== '/' && match.handle)
            .map((match) => (match.handle as RouteMeta)?.key);
        setOpenKeys(keys);
        setSelectedKeys(keys.slice(-1));
    }, [pathname, matches, params]);

    // events
    const onClick: MenuProps['onClick'] = ({ key }) => {
        let url = key;
        Object.keys(params).forEach(paramKey => {
            url = url.replace(`:${paramKey}`, params[paramKey] || '');
        })
        navigate(url);
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
