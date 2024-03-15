import apiClient from '../apiClient';

import { Game } from "@/types/entity";

const getGameList = () => apiClient.get<Game[]>({ url: '/game/list' });
const getGameInfo = (id: string) => apiClient.get<Game>({ url: `/game/info/${id}` });
const createGame = (data: any) => apiClient.post({ url: '/game/create', data });
const deleteGame = (id: string) => apiClient.delete({ url: `/game/${id}` });

export default {
    getGameList,
    getGameInfo,
    createGame,
    deleteGame
};
