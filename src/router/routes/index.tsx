import { Navigate } from "react-router-dom";
import { AppRouteObject } from "@/types/router";

import GameListPage from "@/pages/game/list";

const gameCreationRoutes: AppRouteObject[] = [
    {
        index: true,
        element: <Navigate to="list" replace />,
    },
    {
        path: 'area'
    }
]

const routes: AppRouteObject[] = [
    {
        path: 'game-creation',
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