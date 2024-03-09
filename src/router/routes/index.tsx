import { Navigate, Outlet } from "react-router-dom";
import { AppRouteObject } from "@/types/router";

import GameListPage from "@/pages/game/list";

export const gameCreationRoutes: AppRouteObject[] = [
    {
        index: true,
        element: <Navigate to="area" replace />,
    },
    {
        path: 'area',
        meta: { label: '游戏区域', key: '/game-creation/area' },
    },
    {
        path: 'role',
        meta: { label: '角色定义', key: '/game-creation/role' },
    },
    {
        path: 'card',
        meta: { label: '卡牌定义', key: '/game-creation/card' },
    }
]

const routes: AppRouteObject[] = [
    {
        path: 'game-creation',
        element: <Outlet />,
        children: gameCreationRoutes
    },
    {
        path: 'game-list',
        element: <GameListPage />,
        meta: { label: '游戏列表', key: '/game-list' },
    },
    {
        path: 'business-analysis',
        meta: { label: '运营数据', key: '/business-analysis' },
        children: [
            {
                path: 'game-traffic',
                meta: { label: '游戏流量', key: '/business-analysis/game-traffic' }
            },
            {
                path: 'user-feedback',
                meta: { label: '用户反馈', key: '/business-analysis/user-feedback' }
            }
        ]
    }
];

export default routes;