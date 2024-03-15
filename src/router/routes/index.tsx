import { Navigate } from "react-router-dom";
import { AppRouteObject } from "@/types/router";

import GameListPage from "@/pages/game/list";
import CardPage from "@/pages/game/creation/card";
import CardTypePage from "@/pages/game/creation/card/type";
import gameService from "@/api/services/gameService";
import GameCreation from "@/layouts/dashboard/game-creation";
import cardService from "@/api/services/cardService";

export const gameCreationRoutes: AppRouteObject[] = [
    {
        index: true,
        element: <Navigate to="card" replace />,
    },
    {
        path: 'card',
        handle: {
            label: '卡牌定义',
            key: '/game-creation/:id/card'
        },
        children: [
            {
                index: true,
                element: <CardPage />,
            },
            {
                path: ':cardId',
                element: <CardTypePage />,
                loader: async ({ params }) => {
                    return cardService.getCardInfo(params.cardId as string)
                },
                errorElement: (<div />),
            },
        ]
    },
    {
        path: 'area',
        handle: {
            label: '游戏区域',
            key: '/game-creation/:id/area'
        }
    },
    {
        path: 'role',
        handle: {
            label: '角色定义',
            key: '/game-creation/:id/role'
        }
    },
]

const routes: AppRouteObject[] = [
    {
        path: 'game-creation/:id',
        element: <GameCreation />,
        loader: async ({ params }) => {
            return gameService.getGameInfo(params.id as string)
        },
        errorElement: (<div />),
        children: gameCreationRoutes
    },
    {
        path: 'game-list',
        element: <GameListPage />,
        handle: { label: '游戏列表', key: '/game-list' },
    },
    {
        path: 'business-analysis',
        handle: { label: '运营数据', key: '/business-analysis' },
        children: [
            {
                path: 'game-traffic',
                handle: { label: '游戏流量', key: '/business-analysis/game-traffic' }
            },
            {
                path: 'user-feedback',
                handle: { label: '用户反馈', key: '/business-analysis/user-feedback' }
            }
        ]
    }
];

export default routes;