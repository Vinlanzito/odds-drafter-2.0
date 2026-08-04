import { useContext, useState } from 'react'
import { AppContext } from "./Context";
import './Settings.css'

function SettingsBody() {
  return (
    <div id="settings-container">
      <ReplacementSettings />
      <ADPSettings />
      <TierSettings />
      <PointsSettings />
    </div>
  );
}

function ReplacementSettings() {
  const { repLevels, setRepLevels } = useContext(AppContext);
  const [newRepLevels, setNewRepLevels] = useState({...repLevels});
  const [showWarning, setShowWarning] = useState(false);

  const handleRepLevels = () => {
    if(newRepLevels.qbRepLevel < 1 || newRepLevels.rbRepLevel < 1 || newRepLevels.wrRepLevel < 1 || newRepLevels.teRepLevel < 1 || newRepLevels.flexRepLevel < 0) {
      setShowWarning(true);
      return;
    }
    setRepLevels({...newRepLevels});
    setShowWarning(false);
  }

  return (
    <div id="replacement-container">
      <p className="settings-header">Replacement Levels</p>
        <div id="replacement-level-inputs">
          <div className="replacement-level-position">
            <label htmlFor="qb-replacement-input">QB</label>
            <input type="number" min="1" id="qb-replacement-input" value={newRepLevels.qbRepLevel} onChange={(e) => setNewRepLevels(prev => ({...prev, qbRepLevel: e.target.value}))} />
          </div>
          <div className="replacement-level-position">
            <label htmlFor="rb-replacement-input">RB</label>
            <input type="number" min="1" id="rb-replacement-input" value={newRepLevels.rbRepLevel} onChange={(e) => setNewRepLevels(prev => ({...prev, rbRepLevel: e.target.value}))} />
          </div>
          <div className="replacement-level-position">
            <label htmlFor="wr-replacement-input">WR</label>
            <input type="number" min="1" id="wr-replacement-input" value={newRepLevels.wrRepLevel} onChange={(e) => setNewRepLevels(prev => ({...prev, wrRepLevel: e.target.value}))} />
          </div>
          <div className="replacement-level-position">
            <label htmlFor="te-replacement-input">TE</label>
            <input type="number" min="1" id="te-replacement-input" value={newRepLevels.teRepLevel} onChange={(e) => setNewRepLevels(prev => ({...prev, teRepLevel: e.target.value}))} />
          </div>
          <div className="replacement-level-position">
            <label htmlFor="flex-replacement-input">Flex</label>
            <input type="number" min="0" id="flex-replacement-input" value={newRepLevels.flexRepLevel} onChange={(e) => setNewRepLevels(prev => ({...prev, flexRepLevel: e.target.value}))} />
          </div>
        </div>
        {showWarning && <p id="replacement-warning">All values must be 1 or greater.</p>}
        <button onClick={handleRepLevels} className="update-button">Update</button>
    </div>
  );
}

function ADPSettings() {
  const { allPlayers, setAllPlayers, adpSetting, setAdpSetting } = useContext(AppContext);
  const [newAdpSetting, setNewAdpSetting] = useState(adpSetting);

  const handleAdpUpdate = () => {
    setAdpSetting(newAdpSetting);
  }

  return (
    <div id="adp-container">
      <p className="settings-header">Average Draft Position</p>
        <form id="adp-form">
          <label>
            <input type="radio" name="adp" value="consensusPPR" checked={newAdpSetting === 'consensusPPR'} onChange={(e) => setNewAdpSetting(e.target.value)} /> Consensus PPR
          </label>
          <label>
            <input type="radio" name="adp" value="fantraxPPR" checked={newAdpSetting === 'fantraxPPR'} onChange={(e) => setNewAdpSetting(e.target.value)} /> Fantrax PPR
          </label>
          <label>
            <input type="radio" name="adp" value="sleeperPPR" checked={newAdpSetting === 'sleeperPPR'} onChange={(e) => setNewAdpSetting(e.target.value)} /> Sleeper PPR
          </label>
          <label>
            <input type="radio" name="adp" value="espnPPR" checked={newAdpSetting === 'espnPPR'} onChange={(e) => setNewAdpSetting(e.target.value)} /> ESPN PPR
          </label>
          <label>
            <input type="radio" name="adp" value="yahooPPR" checked={newAdpSetting === 'yahooPPR'} onChange={(e) => setNewAdpSetting(e.target.value)} /> Yahoo PPR
          </label>
          <label>
            <input type="radio" name="adp" value="consensusHalfPPR" checked={newAdpSetting === 'consensusHalfPPR'} onChange={(e) => setNewAdpSetting(e.target.value)} /> Consensus Half PPR
          </label>
          <label>
            <input type="radio" name="adp" value="underdogHalfPPR" checked={newAdpSetting === 'underdogHalfPPR'} onChange={(e) => setNewAdpSetting(e.target.value)} /> Underdog Half PPR
          </label>
          <label>
            <input type="radio" name="adp" value="sleeperHalfPPR" checked={newAdpSetting === 'sleeperHalfPPR'} onChange={(e) => setNewAdpSetting(e.target.value)} /> Sleeper Half PPR
          </label>
          <label>
            <input type="radio" name="adp" value="consensusStandard" checked={newAdpSetting === 'consensusStandard'} onChange={(e) => setNewAdpSetting(e.target.value)} /> Consensus Standard
          </label>
          <label>
            <input type="radio" name="adp" value="fantraxStandard" checked={newAdpSetting === 'fantraxStandard'} onChange={(e) => setNewAdpSetting(e.target.value)} /> Fantrax Standard
          </label>
          <label>
            <input type="radio" name="adp" value="sleeperStandard" checked={newAdpSetting === 'sleeperStandard'} onChange={(e) => setNewAdpSetting(e.target.value)} /> Sleeper Standard
          </label>
        </form>
        <button onClick={handleAdpUpdate} className="update-button">Update</button>
    </div>
  );
}

function TierSettings() {
  const { tiers, setTiers } = useContext(AppContext);
  const [newTiers, setNewTiers] = useState({...tiers});

  return (
    <div id="tier-container">
      <p className="settings-header">Tier Values</p>
        <div id="tier-value-inputs">
          <div className="tier-values">
            <label htmlFor="tier-1-input">Tier 1</label>
            <input type="number" step="0.1" id="tier-1-input" value={newTiers.tier1} onChange={(e) => setNewTiers(prev => ({...prev, tier1: e.target.value}))} />
          </div>
          <div className="tier-values">
            <label htmlFor="tier-2-input">Tier 2</label>
            <input type="number" step="0.1" id="tier-2-input" value={newTiers.tier2} onChange={(e) => setNewTiers(prev => ({...prev, tier2: e.target.value}))} />
          </div>
          <div className="tier-values">
            <label htmlFor="tier-3-input">Tier 3</label>
            <input type="number" step="0.1" id="tier-3-input" value={newTiers.tier3} onChange={(e) => setNewTiers(prev => ({...prev, tier3: e.target.value}))} />
          </div>
          <div className="tier-values">
            <label htmlFor="tier-4-input">Tier 4</label>
            <input type="number" step="0.1" id="tier-4-input" value={newTiers.tier4} onChange={(e) => setNewTiers(prev => ({...prev, tier4: e.target.value}))} />
          </div>
          <div className="tier-values">
            <label htmlFor="tier-5-input">Tier 5</label>
            <input type="number" step="0.1" id="tier-5-input" value={newTiers.tier5} onChange={(e) => setNewTiers(prev => ({...prev, tier5: e.target.value}))} />
          </div>
          <div className="tier-values">
            <label htmlFor="tier-6-input">Tier 6</label>
            <input type="number" step="0.1" id="tier-6-input" value={newTiers.tier6} onChange={(e) => setNewTiers(prev => ({...prev, tier6: e.target.value}))} />
          </div>
          <div className="tier-values">
            <label htmlFor="tier-7-input">Tier 7</label>
            <input type="number" step="0.1" id="tier-7-input" value={newTiers.tier7} onChange={(e) => setNewTiers(prev => ({...prev, tier7: e.target.value}))} />
          </div>
        </div>
        <button onClick={() => setTiers({...newTiers})} className="update-button">Update</button>
    </div>
  );
}

function PointsSettings() {
  const { pointValues, setPointValues } = useContext(AppContext);
  const [newPointValues, setNewPointValues] = useState({...pointValues});

  return (
    <div id="points-container">
      <p className="settings-header">Point Values</p>
        <div id="point-value-inputs">
          <div className="point-values">
            <label htmlFor="passing-yards-input">Passing yards</label>
            <input type="number" step="0.01" id="passing-yards-input" value={newPointValues.passingYardValue} onChange={(e) => setNewPointValues(prev => ({...prev, passingYardValue: e.target.value}))} />
          </div>
          <div className="point-values">
            <label htmlFor="passing-touchdowns-input">Passing touchdowns</label>
            <input type="number" id="passing-touchdowns-input" value={newPointValues.passingTouchdownValue} onChange={(e) => setNewPointValues(prev => ({...prev, passingTouchdownValue: e.target.value}))} />
          </div>
          <div className="point-values">
            <label htmlFor="interceptions-input">Interceptions</label>
            <input type="number" id="interceptions-input" value={newPointValues.interceptionValue} onChange={(e) => setNewPointValues(prev => ({...prev, interceptionValue: e.target.value}))} />
          </div>
          <div className="point-values">
            <label htmlFor="rushing-yards-input">Rushing yards</label>
            <input type="number" step="0.1" id="rushing-yards-input" value={newPointValues.rushingYardValue} onChange={(e) => setNewPointValues(prev => ({...prev, rushingYardValue: e.target.value}))} />
          </div>
          <div className="point-values">
            <label htmlFor="receiving-yards-input">Receiving yards</label>
            <input type="number" step="0.1" id="receiving-yards-input" value={newPointValues.receivingYardValue} onChange={(e) => setNewPointValues(prev => ({...prev, receivingYardValue: e.target.value}))} />
          </div>
          <div className="point-values">
            <label htmlFor="touchdowns-input">Touchdowns</label>
            <input type="number" id="touchdowns-input" value={newPointValues.touchdownValue} onChange={(e) => setNewPointValues(prev => ({...prev, touchdownValue: e.target.value}))} />
          </div>
          <div className="point-values">
            <label htmlFor="receptions-input">Receptions</label>
            <input type="number" step="0.5" id="receptions-input" value={newPointValues.receptionValue} onChange={(e) => setNewPointValues(prev => ({...prev, receptionValue: e.target.value}))} />
          </div>
          <div className="point-values">
            <label htmlFor="fumbles-input">Fumbles</label>
            <input type="number" id="fumbles-input" value={newPointValues.fumbleValue} onChange={(e) => setNewPointValues(prev => ({...prev, fumbleValue: e.target.value}))} />
          </div>
        </div>
        <button onClick={() => setPointValues({...newPointValues})} className="update-button">Update</button>
    </div>
  );
}

export default SettingsBody;