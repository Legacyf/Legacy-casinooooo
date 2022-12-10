import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [isSound, setIsSound] = useState(false);

    return (
        <AppContext.Provider value={{ isSound, setIsSound }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}