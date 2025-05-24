import { LeagueNames } from "../constants/leagueEnums";
import { OddType } from "./oddType";

export interface MatchType {
  id: number;
  homeTeam: string;
  awayTeam: string;
  league: LeagueNames;
  country: string;
  matchDate: Date;
  odds: OddType;
  isLive?: boolean;
  score?: string;
  category?: string;
  inBetCart?: boolean;
}
