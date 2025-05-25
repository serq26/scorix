import { useEffect, useState } from "react";
import Category from "../components/ui/Category";
import LeagueBox from "../components/ui/LeagueBox";
import { Box, CircularProgress } from "@mui/material";
import useWebsocket from "../hooks/useWebsocket";
import { MatchType } from "../types/matchType";
import { compareAsc, format, isToday, isTomorrow, parse } from "date-fns";
import { tr } from "date-fns/locale";
import BetsCart from "../components/ui/BetsCart";
import { useBetsCart } from "../hooks/useBetsCart";

type GroupedMatches = {
  today: MatchType[];
  tomorrow: MatchType[];
  [key: string]: MatchType[];
};

function HomeScreen() {
  const { matchList } = useWebsocket();
  const { isOpenedBetsCart } = useBetsCart();
  const [dateGroupedMatches, setDateGroupedMatches] = useState<GroupedMatches>({
    today: [],
    tomorrow: [],
  });

  useEffect(() => {
    groupMatchesByDate(matchList);
  }, [matchList]);

  const groupMatchesByDate = (matches: MatchType[]): void => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const grouped: GroupedMatches = {
      today: [],
      tomorrow: [],
    };

    matches?.forEach((match) => {
      const matchDate = new Date(match.matchDate);

      if (isToday(matchDate)) {
        grouped.today.push(match);
      } else if (isTomorrow(matchDate)) {
        grouped.tomorrow.push(match);
      } else if (compareAsc(matchDate, tomorrow) > 0) {
        const matchDay = format(matchDate, "dd MMMM", { locale: tr });
        if (!grouped[matchDay]) {
          grouped[matchDay] = [];
        }
        grouped[matchDay].push(match);
      }
    });

    setDateGroupedMatches(grouped);
  };

  if (matchList?.length === 0) {
    return (
      <Box
        sx={{
          width: " 100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingY: 10,
          gap: 2,
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: " 100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingY: 10,
        gap: 2,
        marginLeft: isOpenedBetsCart ? "-100px" : "none",
        transition: "all .5s ease-in-out",
      }}
    >
      <Category />
      {Object.entries(dateGroupedMatches).map(([key, value]) =>
        value
          .sort(
            (a, b) =>
              parse(a.matchDate.toString(), "yyyy-MM-dd HH:mm", new Date()).getTime() -
              parse(b.matchDate.toString(), "yyyy-MM-dd HH:mm", new Date()).getTime()
          )
          ?.map((x, i) => (
            <LeagueBox
              key={i}
              title={`${{ today: "Bugün", tomorrow: "Yarın" }[key] || key} ${format(x?.matchDate, "HH:mm")}`}
              matches={[x]}
            />
          ))
      )}
      <BetsCart />
    </Box>
  );
}

export default HomeScreen;
