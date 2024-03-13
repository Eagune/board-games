import { useCallback, useMemo } from 'react';

import routes from '@/router/routes';

import { flattenMenuRoutes, menuFilter } from '../utils';
  
export function useFlattenedRoutes() {
    const flattenRoutes = useCallback(flattenMenuRoutes, []);
    return useMemo(() => {
        const menuRoutes = menuFilter(routes);
        return flattenRoutes(menuRoutes);
    }, [routes]);
}
