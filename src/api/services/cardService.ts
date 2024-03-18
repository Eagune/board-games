import apiClient from '../apiClient';

import { GameCard } from "@/types/entity";

type TQueryFnData = {
    queryKey: ReadonlyArray<unknown>
}

const getCardList = ({ queryKey: [_, gameId] }: TQueryFnData) => apiClient.get<GameCard[]>({ url: `/game/card/list/${gameId}` });
const getCardInfo = (id: string) => apiClient.get<GameCard>({ url: `/game/card/info/${id}` });
const createGameCard = (data: any) => apiClient.post({ url: '/game/card/create', data });
const deleteGameCard = (id: string) => apiClient.delete({ url: `/game/card/${id}` });

export default {
    getCardList,
    getCardInfo,
    createGameCard,
    deleteGameCard
};
