import { Navigate, Outlet } from "react-router-dom";
import { AppRouteObject } from "@/types/router";

import GameListPage from "@/pages/game/list";
import GameGuard from "../components/game-guard";
import CardPage from "@/pages/game/creation/card";
import CardTypePage from "@/pages/game/creation/card/type";

export const gameCreationRoutes: AppRouteObject[] = [
    {
        index: true,
        element: <Navigate to="card" replace />,
    },
    {
        path: 'card',
        meta: { label: '卡牌定义', key: '/game-creation/:id/card' },
        element: <CardPage />,
    },
    {
        path: 'card/:cardId',
        element: <CardTypePage />,
    },
    {
        path: 'area',
        meta: { label: '游戏区域', key: '/game-creation/:id/area' },
    },
    {
        path: 'role',
        meta: { label: '角色定义', key: '/game-creation/:id/role' },
    },
]

const routes: AppRouteObject[] = [
    {
        path: 'game-creation/:id',
        element: (
            <GameGuard>
                <Outlet />
            </GameGuard>
        ),
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