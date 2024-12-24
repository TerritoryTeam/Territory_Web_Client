import { 
    createContext, 
    ReactNode, 
    useContext
} from "react";
import { v4 as uuidv4 } from 'uuid';

import NakamaClient from "../nakama";

interface GlobalContainer {
    id: string,
    nakama: NakamaClient
}

export const globalContainer : GlobalContainer = {
    id: uuidv4(),
    nakama: new NakamaClient()
}

const GlobalContext = createContext<GlobalContainer | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> =  ({children}) => {
    return (
        <GlobalContext.Provider value={globalContainer}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContainer => {
    const context = useContext(GlobalContext);
    if (!context) {
      throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};

