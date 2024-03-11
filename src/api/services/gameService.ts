import apiClient from '../apiClient';

import { Game } from "@/types/entity";

const getGameList = () => apiClient.get<Game[]>({ url: '/game/list' });
const createGame = (data: any) => apiClient.post({ url: '/game/create', data });
const deleteGame = (id: string) => apiClient.delete({ url: `/game/${id}` });

export default {
    getGameList,
    createGame,
    deleteGame
};
