import { Outlet } from "react-router-dom";
import { useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { useSetGameInfo } from "@/store";
import { Game } from "@/types/entity";

export default function GameCreation() {
    const data = useLoaderData();
    const setGameInfo = useSetGameInfo();

    useEffect(() => {
        setGameInfo(data as Game);
    }, [data]);

    return (<Outlet />)
}