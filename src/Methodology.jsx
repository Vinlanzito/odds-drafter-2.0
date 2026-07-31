import { useState } from 'react'
import './Methodology.css'

function MethodologyBody() {

  return (
    <div>
      <div className="step-level">
        <div className='step-card'>
          <h2>Step 1</h2>
          <h4>Sportsbooks</h4>
          <p>We get thousands of betting lines across the market and assign each of them to their respective players. Then, for each player, we take the consensus betting line and use that as the projection.</p>
        </div>
        <div className='step-card'>
          <h2>Step 2</h2>
          <h4>Statistical models</h4>
          <p>While we get the most important information from sportsbooks, we are still left with gaps in our projections. We fill these gaps using historical stats along with the projections from step 1 to accurately predict stats not accounted for by the sportsbooks.</p>
        </div>
      </div>
      <div className="step-level">
        <div className='step-card'>
          <h2>Step 3</h2>
          <h4>Player Projections</h4>
          <p>Now that we have all of the projected stat lines we need, we calculate projected fantasy scores for each player. By default, this is calculated using normal PPR scoring but this can be cutsomized to your league in the settings.</p>
        </div>
        <div className='step-card'>
          <h2>Step 4</h2>
          <h4>Rankings</h4>
          <p>Players are then ranked according to a value system where value is the expected amount of points per game that the player will outscore the replacement level player. For example, if the replacement level is 12, a player with a value of 3 is projected to score 3 more points per game than the 12th ranked player. Default replacment levels are based on a normal 12 man league but these can also be cutomized in settings.</p>
        </div>
      </div>
    </div>
  );
}

export default MethodologyBody;