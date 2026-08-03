import { useState } from 'react'
import './Home.css'

function HomeBody({setCurrentBody}) {

  return (
    <div>
      <div id="hero">
        <h1>Odds Drafter</h1>
        <p className='body-paragraph'>Fantasy football rankings powered by sportsbook expectations and statistical modeling</p>
        <div id="hero-buttons">
          <button className="home-button" onClick={() => setCurrentBody("rankings")}>View Rankings</button>
          <button className="home-button" onClick={() => setCurrentBody("methodology")}>Learn Methodology</button>
        </div>
      </div>
      <div className="feature-cards">
        <div className='feature-card'>
          <h3>Rankings</h3>
          <p className='body-paragraph'>Features a dynamic rankings table with all the information you need to make the best picks during your draft</p>
        </div>
        <div className='feature-card'>
          <h3>Methodology</h3>
          <p className='body-paragraph'>Explains the process behind using sportsbook betting lines, creating projections, and ranking players</p>
        </div>
        <div className='feature-card'>
          <h3>Download Sheets</h3>
          <p className='body-paragraph'>Allows you to download the ranking as an Excel file and see the all the data that goes into the rankings</p>
        </div>
      </div>
      <div className='why-card'>
        <h2>Why Odds Drafter?</h2>
        <p className='body-paragraph'>Our projections are created using betting lines from over 50 sportsbooks. The projections are updated daily, ensuring that the data is as accurate and up to date as possible.
        Our rankings use value-based drafting to help users compare players across different positions. We also feature live scarcity percentages that tell how much value remains at each position.
        This powerful tool prevents users from missing out on valuable players at each position and helps create a balanced roster.</p>
      </div>
    </div>
  );
}

export default HomeBody;