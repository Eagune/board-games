import { Breadcrumb } from 'antd';
import { useLocation, useMatches } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGameInfo } from '@/store';
import { useFlattenedRoutes } from '@/router/hooks/use-flattened-routes';

export default function BreadCrumb() {
    const { pathname } = useLocation();
    const { name } = useGameInfo();
    const matches = useMatches();
    const flattenedRoutes = useFlattenedRoutes();
    const [breadcrumbItems, setBreadcrumbItems] = useState([{ href: '', title: 'Home' }]);
    const [showBreadcrumb, setShowBreadcrumb] = useState(false);

    useEffect(() => {
        if (pathname.indexOf('/game-creation') >= 0) {
            const paths = matches.filter((item) => item.pathname !== '/').map((item) => item.pathname);
            const pathRouteMetas = flattenedRoutes.filter((item) => paths.indexOf(item.key) !== -1);

            setShowBreadcrumb(true);
            setBreadcrumbItems([
                { href: '', title: 'Home' },
                { href: '', title: name || '' }
            ]);
        } else {
            setShowBreadcrumb(false);
        }
    }, [pathname]);

    return (
        showBreadcrumb ? <Breadcrumb className='pl-5 pt-5' items={breadcrumbItems} /> : <></>
    );
}