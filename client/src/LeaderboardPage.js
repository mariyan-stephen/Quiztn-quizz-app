import React from 'react';

function LeaderboardPage() {
  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {/* Rows of player ranks will go here... */}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardPage;
