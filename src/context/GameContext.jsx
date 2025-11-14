// Archivo: frontend/src/context/GameContext.jsx

import { createContext } from 'react';
import useGamesHook from '../hooks/useGamesHook';

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
    const { games, isLoading, error, dispatch } = useGamesHook();

    return (
        <GameContext.Provider value={{ games, isLoading, error, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}; 