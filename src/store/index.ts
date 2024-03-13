import { create } from "zustand";

import { Game } from "@/types/entity";

type GameStore = {
    gameInfo: Partial<Game>;
    setGameInfo: (gameInfo: Game) => void;
};

const useGameStore = create<GameStore>((set) => ({
    gameInfo: {},
    setGameInfo: (gameInfo: Game) => {
        set({ gameInfo });
    },
}));

export const useGameInfo = () => useGameStore((state) => state.gameInfo);
export const useSetGameInfo = () => useGameStore((state) => state.setGameInfo);