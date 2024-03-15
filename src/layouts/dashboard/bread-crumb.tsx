import { Breadcrumb } from 'antd';
import { UIMatch, useLocation, useMatches } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function BreadCrumb() {
    const { pathname } = useLocation();
    const matches = useMatches();
    const [breadcrumbItems, setBreadcrumbItems] = useState([{ href: '', title: 'Home' }]);
    const [showBreadcrumb, setShowBreadcrumb] = useState(false);

    useEffect(() => {
        if (pathname.indexOf('/game-creation') >= 0) {
            const breadcrumbItems = matches.filter((item) => item.pathname !== '/').map((item: UIMatch<any, any>) => {
                if (item.data?.name) {
                    return { href: `/#${item.pathname}`, title: item.data.name }
                } else if (item.handle?.label) {
                    return { href: `/#${item.pathname}`, title: item.handle.label }
                }
                return { href: item.pathname, title: '' };
            });
            setShowBreadcrumb(true);
            setBreadcrumbItems([
                { href: '', title: '主页' },
                ...breadcrumbItems
            ]);
        } else {
            setShowBreadcrumb(false);
        }
    }, [pathname]);

    return (
        showBreadcrumb ? <Breadcrumb className='pl-5 pt-5' items={breadcrumbItems} /> : <></>
    );
}