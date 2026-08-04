import { useState } from 'react'
import './Changelog.css'

function ChangelogBody() {

  return (
    <div>
      <table className='changelog-table'>
        <thead>
            <tr>
              <th>Date</th>
              <th className='left-align'>Change</th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <td >8/3/2026</td>
            <td className='left-align'>
              Version 1.3
              <ul>
                <li>Updated projection modeling</li>
                <li>Updated Home page</li>
                <li>Updated fonts</li>
                <li>Updated Downloads page</li>
                <li>Updated Changelog page</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td >7/31/2026</td>
            <td className='left-align'>
              Version 1.2
              <ul>
                <li>Redesigned rankings table</li>
                <li>Updated live draft feature</li>
                <li>Redesigned Downloads page</li>
                <li>Created Home page</li>
                <li>Created Methodology page</li>
                <li>Created How it works page</li>
                <li>Created Changelog page</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td >7/27/2026</td>
            <td className='left-align'>
              Version 1.1
              <ul>
                <li>Updated ADP values</li>
                <li>Updated navigation bar</li>
                <li>Updated bye weeks</li>
                <li>Redesigned color scheme</li>
                <li>Redesigned scarcity section</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td >7/25/2026</td>
            <td className='left-align'>
              Version 1.0
              <ul>
                <li>Initialized projections</li>
                <li>Updated player images</li>
                <li>Updated spreadsheet output</li>
                <li>Added live scarcity feature</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ChangelogBody;