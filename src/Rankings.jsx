import { useContext, useState, useEffect } from 'react'
import { AppContext } from "./Context";
import './Rankings.css'

function RankingsBody({ currentBody }) {
  const { allPlayers, setAllPlayers } = useContext(AppContext);
  const [currentPlayers, setCurrentPlayers] = useState([...allPlayers]);
  const [hideDraftedPlayers, setHideDraftedPlayers] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("all");

  return (
    <div className={`${currentBody === 'rankings' ? "" : "hide"}`}>
      <TableFilters allPlayers={allPlayers} setAllPlayers={setAllPlayers} currentPlayers={currentPlayers} setCurrentPlayers={setCurrentPlayers} hideDraftedPlayers={hideDraftedPlayers} setHideDraftedPlayers={setHideDraftedPlayers} currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
      <RankingsTable allPlayers={allPlayers} setAllPlayers={setAllPlayers} currentPlayers={currentPlayers} setCurrentPlayers={setCurrentPlayers} hideDraftedPlayers={hideDraftedPlayers} currentFilter={currentFilter} />
    </div>
  );
}

function TableFilters({allPlayers, setAllPlayers, currentPlayers, setCurrentPlayers, hideDraftedPlayers, setHideDraftedPlayers, currentFilter, setCurrentFilter}) {
  const [draftMode, setDraftMode] = useState(false);

  useEffect(() => {
    const handleUnload = (event) => {
      if (draftMode) {
        event.preventDefault();
        event.returnValue = 'Are you sure you want to leave? Changes may not be saved.';
        return 'Are you sure you want to leave? Changes may not be saved.';
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [draftMode]);

  const positionClick = (position) => {
    setCurrentFilter(position);
    if (position === 'topTen') {
      setCurrentPlayers(allPlayers.filter((player) => !player.drafted).slice(0, 10));
      return;
    }

    setCurrentPlayers(allPlayers.filter((player) => position === "all" || position.toUpperCase() === player.position));
  };


  return (
    <div id="table-filters">
        <button onClick={() => positionClick('all')} className={currentFilter === 'all' ? "current-position" : ""}>All</button>
        <button onClick={() => positionClick('qb')} className={currentFilter === 'qb' ? "current-position" : ""}>QB</button>
        <button onClick={() => positionClick('rb')} className={currentFilter === 'rb' ? "current-position" : ""}>RB</button>
        <button onClick={() => positionClick('wr')} className={currentFilter === 'wr' ? "current-position" : ""}>WR</button>
        <button onClick={() => positionClick('te')} className={currentFilter === 'te' ? "current-position" : ""}>TE</button>
        <button onClick={() => positionClick('topTen')} className={currentFilter === 'topTen' ? "current-position" : ""}>Top 10</button>
        <label className="switch">
          <input id="toggle-drafted" type="checkbox" checked={hideDraftedPlayers} onChange={() => setHideDraftedPlayers(!hideDraftedPlayers)} />
          <span className="slider"></span>
        </label>
        <label htmlFor="toggle-drafted" id="hide-drafted">Hide drafted</label>
        <label className="switch">
          <input id="toggle-draft-mode" type="checkbox" checked={draftMode} onChange={() => setDraftMode(!draftMode)} />
          <span className="slider"></span>
        </label>
        <label htmlFor="toggle-draft-mode" id="draft-mode">Draft Mode</label>
      </div>
  );
}

function RankingsTable({allPlayers, setAllPlayers, currentPlayers, setCurrentPlayers, hideDraftedPlayers, currentFilter}) {
  const { pointValues, repLevels, tiers } = useContext(AppContext);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    let updatedAllPlayers = allPlayers.map(player => ({...player}));
    updateFantasyScores(updatedAllPlayers);
    sortByPoints(updatedAllPlayers);
    updateValues(updatedAllPlayers);
    sortByValue(updatedAllPlayers);
    updateTiers(updatedAllPlayers);
    updateScarcity(updatedAllPlayers);
    updateRank(updatedAllPlayers);
    updateBye(updatedAllPlayers);

    setAllPlayers(updatedAllPlayers);
  }, [pointValues, repLevels, tiers]);

  useEffect(() => {
    let updatedCurrentPlayers = currentPlayers.map(player => ({...player}));
    updatedCurrentPlayers = updatedCurrentPlayers.map(player => allPlayers.find(p => p.name === player.name));
    sortByValue(updatedCurrentPlayers);

    setCurrentPlayers(updatedCurrentPlayers);
  }, [allPlayers]);

  const getImageName = (inputString) => inputString.replace(/[^a-zA-Z0-9\s\-]/g, "").replaceAll(" ", "-").toLowerCase();

  const updateFantasyScores = (players) => players.forEach(player => player.fantasyScore = player.passingYards*pointValues.passingYardValue + 
      player.passingTouchdowns*pointValues.passingTouchdownValue + player.interceptions*pointValues.interceptionValue + 
      player.sacks*pointValues.sackValue + player.rushingYards*pointValues.rushingYardValue + player.receivingYards*pointValues.receivingYardValue + 
      player.touchdowns*pointValues.touchdownValue + player.receptions*pointValues.receptionValue + player.fumbles*pointValues.fumbleValue );

  const sortByPoints = (players) => players.sort((a,b) => b.fantasyScore-a.fantasyScore);

  const updateValues = (players) => {
    const calculatedReplacementValues = calculateReplacementValues(players);
    updatePositionValues("QB", repLevels.qbRepLevel, players);
    updatePositionValues("WR", calculatedReplacementValues[0], players);
    updatePositionValues("RB", calculatedReplacementValues[1], players);
    updatePositionValues("TE", calculatedReplacementValues[2], players);
  };

  const calculateReplacementValues = (players) => {
    let calculatedWrRepLevel = repLevels.wrRepLevel;
    let calculatedRbRepLevel = repLevels.rbRepLevel;
    let calculatedTeRepLevel = repLevels.teRepLevel;
    let wrList = players.filter((player) => player.position === "WR");
    let rbList = players.filter((player) => player.position === "RB");
    let teList = players.filter((player) => player.position === "TE");
    

    for(let i=0; i<repLevels.flexRepLevel; i++) {
        if(teList[calculatedTeRepLevel].fantasyScore >= wrList[calculatedWrRepLevel].fantasyScore && teList[calculatedTeRepLevel].fantasyScore >= rbList[calculatedRbRepLevel].fantasyScore) {
            calculatedTeRepLevel++;
        } else if(rbList[calculatedRbRepLevel].fantasyScore >= wrList[calculatedWrRepLevel].fantasyScore && rbList[calculatedRbRepLevel].fantasyScore >= teList[calculatedTeRepLevel].fantasyScore) {
            calculatedRbRepLevel++;
        } else {
            calculatedWrRepLevel++;
        }
    }

    return [calculatedWrRepLevel, calculatedRbRepLevel, calculatedTeRepLevel];
  };

  const updatePositionValues = (position, repLevel, players) => {
    let positionalList = players.filter((player) => position === player.position);
    let baseValue = positionalList[repLevel-1].fantasyScore;

    for(let i=0; i<positionalList.length; i++) {
        positionalList[i].value = Number(((positionalList[i].fantasyScore - baseValue) / 17).toFixed(1));
    }
  };

  const sortByValue = (players) => players.sort((a,b) => b.value-a.value || a.rank-b.rank);

  const updateTiers = (players) => players.forEach((player) => {
    if (player.value >= tiers.tier1) {
        player.tier = 1;
    } else if (player.value >= tiers.tier2) {
        player.tier = 2;
    } else if (player.value >= tiers.tier3) {
        player.tier = 3;
    } else if (player.value >= tiers.tier4) {
        player.tier = 4;
    } else if (player.value >= tiers.tier5) {
        player.tier = 5;
    } else if (player.value >= tiers.tier6) {
        player.tier = 6;
    } else if (player.value >= tiers.tier7) {
        player.tier = 7;
    } else {
        player.tier = 8;
    }
  });

  const updateBye = (players) => players.forEach((player) => {
    switch (player.team) {
        case "CHI":
        case "GB":
        case "ATL":
        case "PIT":
            player.bye = 5;
            break;
        case "MIN":
        case "HOU":
            player.bye = 6;
            break;
        case "BUF":
        case "BAL":
            player.bye = 7;
            break;
        case "DET":
        case "ARI":
        case "LAR":
        case "SEA":
        case "JAC":
        case "LV":
            player.bye = 8;
            break;
        case "PHI":
        case "TB":
        case "NYJ":
        case "CLE":
            player.bye = 9;
            break;
        case "DAL":
        case "CIN":
        case "TEN":
        case "KC":
            player.bye = 10;
            break;
        case "NO":
        case "IND":
            player.bye = 11;
            break;
        case "WAS":
        case "MIA":
        case "DEN":
        case "LAC":
            player.bye = 12;
            break;
        case "NYG":
        case "CAR":
        case "SF":
        case "NE":
            player.bye = 14;
            break;
  }});

  const updateScarcity = (players) => {
    updatePositionScarcity("QB", players);
    updatePositionScarcity("WR", players);
    updatePositionScarcity("RB", players);
    updatePositionScarcity("TE", players);
  };

  const updatePositionScarcity = (position, players) => {
    let positionalList = players.filter((player) => position === player.position);
    let totalValue = 0;
    let i = 0;
    while (positionalList[i].value > 0) {
        totalValue += positionalList[i].value;
        i++;
    }

    let remainingValue = totalValue;
    i = 0;
    while (positionalList[i].value > 0) {
        remainingValue -= positionalList[i].value;
        let scarcity  = Math.round(remainingValue/totalValue*100)+"%";
        positionalList[i].scarcity = scarcity;        
        i++;
    }
    while (i < positionalList.length) {
        positionalList[i].scarcity = "0%";        
        i++;
    }
  };

  const updateRank = (players) => {
    for(let i=0; i<players.length; i++) {
        players[i].rank = i+1;
    }
  };

  const getScarcityColor = (scarcity) => {
    let ratio = scarcity.replace("%" ,"") / 100;
    let redValue;
    let greenValue;
    let blueValue;

    if (ratio > 0.5) {
        ratio = (ratio - 0.5)*2;
        redValue = Math.round(255 - 255*ratio);
        greenValue = Math.round(235 - 113*ratio);
        blueValue = Math.round(59 - 8*ratio);
    } else {
        ratio *= 2;
        redValue = Math.round(200 + 55*ratio);
        greenValue = Math.round(16 + 219*ratio);
        blueValue = Math.round(46 + 13*ratio);
    }

    return `rgb(${redValue},${greenValue},${blueValue})`;
  }

  const sortByADP = (players) => players.sort((a,b) => a.adp-b.adp);

  const sortByScarcity = (players) => players.sort((a,b) => b.scarcity.replace("%" ,"")-a.scarcity.replace("%" ,""));

  const selectPlayer = (player) => selectedPlayer === player ? setSelectedPlayer(null) : setSelectedPlayer(player);

  const handleDraft = () => {
    let updatedAllPlayers = [...allPlayers];
    updatedAllPlayers = updatedAllPlayers.map(player => selectedPlayer === player.name ? {...player, drafted: !player.drafted} : player);
    setAllPlayers(updatedAllPlayers);
    if (currentFilter === "topTen") {
      setCurrentPlayers(updatedAllPlayers.filter((player) => !player.drafted).slice(0, 10))
    };
  };
  

  return (
    <div>
      <table id="main-table">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th onClick={()=>setCurrentPlayers(sortByValue([...currentPlayers]))} className="sortable-header">Value</th>
                <th>Tier</th>
                <th onClick={()=>setCurrentPlayers(sortByADP([...currentPlayers]))} className="sortable-header">ADP</th>
                <th>Bye</th>
                <th>Injury</th>
                <th onClick={()=>setCurrentPlayers(sortByScarcity([...currentPlayers]))} className="sortable-header">Scarcity</th>
            </tr>
        </thead>
        <tbody>
          {currentPlayers.map((player) => 
          !(hideDraftedPlayers && player.drafted) && (player.fantasyScore > 0) && 
          (<tr key={player.name} onClick={() => selectPlayer(player.name)} className={`${player.tier % 2 === 0 ? 'even-tier ' : ""}${player.drafted ? 'drafted ' : ""}${selectedPlayer === player.name ? 'clicked-row ' : ""}`}>
            <td>
              {player.rank}
              {selectedPlayer === player.name && <button onClick={handleDraft} className="draft-button">{player.drafted ? "Undraft" : "Draft"}</button>}
            </td>
            <td><div className="player-line"><img src={`src/assets/images/${getImageName(player.name)}.png?v=2`} alt="" /><span>{player.name}</span> ({player.team}) &#x2022; {player.position}</div></td>
            <td>{player.value}</td>
            <td>{player.tier}</td>
            <td>{player.adp}</td>
            <td>{player.bye}</td>
            <td>{player.injury}</td>
            <td style={{backgroundColor: getScarcityColor(player.scarcity)}}>{player.scarcity}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default RankingsBody;