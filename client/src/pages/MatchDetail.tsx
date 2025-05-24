import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MatchType } from "../types/matchType";

function MatchDetail() {
  const { id } = useParams();
  const [match, setMatch] = useState<MatchType | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onmessage = (e) => {
      const matches: MatchType[] = JSON.parse(e.data);
      const found = matches.find((m) => m.id === Number(id));
      if (found) setMatch(found);
    };
    return () => socket.close();
  }, [id]);

  if (!match) return <p>Yükleniyor...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{match.league}</h1>
      <h2>
        {match.homeTeam} vs {match.awayTeam}
      </h2>
      <p>Başlama: {match.matchDate.toDateString()}</p>
      <p>Durum: {match.isLive ? "Canlı" : "Başlamadı"}</p>
      <p>Skor: {match.score}</p>
      <div>
        <p>1: {match.odds.home_win}</p>
        <p>X: {match.odds.draw}</p>
        <p>2: {match.odds.away_win}</p>
      </div>
      <Link to="/">Geri Dön</Link>
    </div>
  );
}

export default MatchDetail;
