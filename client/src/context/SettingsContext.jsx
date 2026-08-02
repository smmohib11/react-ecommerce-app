import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {

    const [settings, setSettings] = useState({});

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const res = await api.get("/settings");
            setSettings(res.data.data || {});
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <SettingsContext.Provider
            value={{
                settings,
                loadSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => useContext(SettingsContext);