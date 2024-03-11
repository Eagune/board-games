import apiClient from '../apiClient';

import { Game } from "@/types/entity";

const getGameList = () => apiClient.get<Game[]>({ url: '/game/list' });

export default {
    getGameList,
};
