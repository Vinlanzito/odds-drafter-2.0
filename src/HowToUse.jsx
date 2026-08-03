import { useState } from 'react'
import './HowToUse.css'

function HowToUseBody() {

  return (
    <div>
      <div className="how-level">
        <div className='how-card'>
          <h3>Overview</h3>
          <p className='body-paragraph'>To use the rankings as an interactive draft tool, you can mark players as drafted by clicking on them. You can filter by position and use all the available metrics to guide your decision when it is time for you to draft a player.</p>
        </div>
        <div className='how-card'>
          <h3>Value</h3>
          <p className='body-paragraph'>This is the most important metric. It tells you how many more points per game this player will score than the replacment level player (see methodology). The ultimate goal is to maximize your team's value but its important to consider the other metrics when drafting so you can plan for future picks.</p>
        </div>
      </div>
      <div className="how-level">
        <div className='how-card2'>
          <h3>Scarcity</h3>
          <p className='body-paragraph'>This is another important number to consider. Scarcity tells the percent of value remaining at each position. You want to prioritize scarcer positions so that you don't miss out on value in your later picks or end up with an unbalanced roster.</p>
        </div>
        <div className='how-card2'>
          <h3>ADP</h3>
          <p className='body-paragraph'>ADP stands for average draft position and tells when a player is typically drafted. All else being equal, you want to draft players with a higher ADP to avoid reaching for players.</p>
        </div>
        <div className='how-card2'>
          <h3>Tier</h3>
          <p className='body-paragraph'>Players are grouped into tiers based on their value. It can be helpful to limit options to players in the top tier but it isn't necessary, especially if a player in a lower tier has a similar value.</p>
        </div>
      </div>
    </div>
  );
}

export default HowToUseBody;