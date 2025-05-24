import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BetType } from "../types/betType";
import { MatchType } from "../types/matchType";

function MainScreen() {
  const [matches, setMatches] = useState<MatchType[]>([]);
  const [bets, setBets] = useState<BetType[]>([]);
  const [stake, setStake] = useState(10);
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const navigate = useNavigate();
  const totalOdds = bets.reduce((acc, b) => acc * b.odd, 1).toFixed(2);
  const potentialWin = (parseFloat(totalOdds) * stake).toFixed(2);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onmessage = (e) => setMatches(JSON.parse(e.data));
    return () => socket.close();
  }, []);

  const addBet = (match: MatchType, pick: "1" | "X" | "2") => {
    if (bets.find((b) => b.matchId === match.id)) return;
    const odd =
      pick === "1"
        ? match.odds.home_win
        : pick === "X"
        ? match.odds.draw
        : match.odds.away_win;
    setBets((prev) => [
      ...prev,
      {
        matchId: match.id,
        matchTitle: `${match.homeTeam} vs ${match.awayTeam}`,
        pick,
        odd,
      },
    ]);
  };

  return (
    <div style={{ padding: 20, display: "flex", gap: 30 }}>
      <div style={{ flex: 1 }}>
        <h1>Maçlar</h1>
        <label>
          <input
            type="checkbox"
            checked={showLiveOnly}
            onChange={() => setShowLiveOnly(!showLiveOnly)}
          />
          Sadece Canlılar
        </label>
        {matches
          .filter((m) => !showLiveOnly || m.isLive)
          .map((match) => (
            <div
              key={match.id}
              style={{
                marginBottom: 20,
                border: "1px solid #ddd",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <h2>{match.league}</h2>
              <h3
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/match/${match.id}`)}
              >
                {match.homeTeam} vs {match.awayTeam}
              </h3>
              <p>Durum: {match.isLive ? "Canlı" : "Başlamadı"}</p>
              <p>Skor: {match.score}</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => addBet(match, "1")}>
                  1: {match.odds.home_win}
                </button>
                <button onClick={() => addBet(match, "X")}>
                  X: {match.odds.draw}
                </button>
                <button onClick={() => addBet(match, "2")}>
                  2: {match.odds.away_win}
                </button>
              </div>
            </div>
          ))}
      </div>

      <div style={{ flexBasis: 300, border: "1px solid #ddd", padding: 20 }}>
        <h2>Kupon</h2>
        <input
          type="number"
          value={stake}
          onChange={(e) => setStake(parseFloat(e.target.value))}
        />
        <p>
          Toplam Oran: <strong>{totalOdds}</strong>
        </p>
        <p>
          Olası Kazanç: <strong>{potentialWin} TL</strong>
        </p>
        <ul>
          {bets.map((b, i) => (
            <li key={i}>
              {b.matchTitle} - {b.pick} ({b.odd})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainScreen;
