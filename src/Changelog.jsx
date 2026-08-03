import { useState } from 'react'
import './Changelog.css'

function ChangelogBody() {

  return (
    <div>
      <table className='changelog-table'>
        <thead>
            <tr>
              <th>Date</th>
              <th>Change</th>
            </tr>
        </thead>
        <tbody>
          <td>7/31/2026</td>
          <td>Created changelog page</td>
        </tbody>
      </table>
    </div>
  );
}

export default ChangelogBody;