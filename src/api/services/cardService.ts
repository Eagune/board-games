import apiClient from '../apiClient';

import { GameCard } from "@/types/entity";

type TQueryFnData = {
    queryKey: ReadonlyArray<unknown>
}

const getCardList = ({ queryKey: [_, gameId] }: TQueryFnData) => apiClient.get<GameCard[]>({ url: `/game/card/list/${gameId}` });
const createGameCard = (data: any) => apiClient.post({ url: '/game/card/create', data });

export default {
    getCardList,
    createGameCard
};
