import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGameInfo } from '@/store';

type Props = {
  children: React.ReactNode;
};

export default function GameGuard({ children }: Props) {
    const navigate = useNavigate();
    const gameInfo = useGameInfo();

    // todo: 没有根据id直接获取然后跳转
    const check = useCallback(() => {
        if (!Object.keys(gameInfo).length) {
            navigate('/game-list', { replace: true })
        }
    }, [gameInfo]);

    useEffect(() => {
        check();
    }, [check]);

  return children;
}
