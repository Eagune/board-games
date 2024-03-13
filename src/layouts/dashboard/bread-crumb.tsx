import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGameInfo } from '@/store';

export default function BreadCrumb() {
    const { pathname } = useLocation();
    const { name } = useGameInfo();
    const [breadcrumbItems, setBreadcrumbItems] = useState([{ href: '', title: 'Home' }]);
    const [showBreadcrumb, setShowBreadcrumb] = useState(false);

    useEffect(() => {
        if (pathname.indexOf('/game-creation') >= 0) {
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