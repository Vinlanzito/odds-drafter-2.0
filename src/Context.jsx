import { createContext, useState, useEffect } from "react";
import Papa from "papaparse";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
    const [pointValues, setPointValues] = useState({
        passingYardValue: 0.04,
        passingTouchdownValue: 4,
        interceptionValue: -2,
        receivingYardValue: 0.1,
        rushingYardValue: 0.1,
        touchdownValue: 6,
        receptionValue: 1,
        fumbleValue: -2,
        sackValue: 0,
    });
    const [repLevels, setRepLevels] = useState({
        qbRepLevel: 12,
        wrRepLevel: 29,
        rbRepLevel: 29,
        flexRepLevel: 14,
        teRepLevel: 12
    });
    const [tiers, setTiers] = useState({
        tier1: 6,
        tier2: 4.5,
        tier3: 3,
        tier4: 2,
        tier5: 1,
        tier6: -0,
        tier7: -1
    });
    const [adpSetting, setAdpSetting] = useState('average');
    const [data, setData] = useState([])
    const [allPlayers, setAllPlayers] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}players.csv`)
            .then((response) => response.text())
            .then((csv) => {
                const results = Papa.parse(csv, {
                header: true,
                dynamicTyping: true,
                });
                
                setData(results.data)
            });
    }, []);

    return (
        <AppContext.Provider value={{ pointValues, setPointValues, allPlayers, setAllPlayers, repLevels, setRepLevels, tiers, setTiers, adpSetting, setAdpSetting, data }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };