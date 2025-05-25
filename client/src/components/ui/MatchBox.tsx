import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MatchType } from "../../types/matchType";
import { Box } from "@mui/material";
import OddBox from "./OddBox";
import { OddEnum } from "../../constants/oddEnum";
import { useBetsCart } from "../../hooks/useBetsCart";
import { useEffect, useState } from "react";

type MatchBoxProps = {
  match: MatchType;
  expanded: string | false | undefined;
  handleChangeExpanded: (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => void;
};

const MatchBox: React.FC<MatchBoxProps> = ({ match, expanded, handleChangeExpanded }) => {
  const { addBet, bets } = useBetsCart();
  const [isIntheBetCart, setIsInTheBetCart] = useState<boolean>(false);

  useEffect(() => {
    const response = bets?.filter((item) => item.match.id === match.id)?.length > 0;
    setIsInTheBetCart(response);
  }, [bets, match]);

  const handleOnClickOdd = (
    event: React.MouseEvent<HTMLElement>,
    betOdd: number,
    oddType: string,
    match: MatchType
  ) => {
    event.stopPropagation();
    // dispatch({ type: "ADD_BET", payload: { match: match, oddNumber: betOdd } });
    addBet(match, betOdd, oddType);
  };

  return (
    <Accordion
      expanded={expanded === `panel-${match.id}`}
      onChange={handleChangeExpanded(`panel-${match.id}`)}
      sx={{ width: "100%", minWidth: "50vw", my: 2 }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${match.id}-content`}
        id={`panel-${match.id}-header`}
        sx={{
          backgroundColor: isIntheBetCart ? '#ffeed4' : null,
          "&.Mui-expanded": {
            backgroundColor: "#e2f5fe",
          },
        }}
      >
        <Box
          component={"div"}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography component="span" fontWeight={"bold"}>
            {match.homeTeam} - {match.awayTeam}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <OddBox
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                handleOnClickOdd(e, match.odds.match_result.home_win, "home_win", match)
              }
              oddNumber={match.odds.match_result.home_win}
              oddTitle={"home_win"}
              matchId={match.id}
            ></OddBox>
            <OddBox
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                handleOnClickOdd(e, match.odds.match_result.draw, "draw", match)
              }
              oddNumber={match.odds.match_result.draw}
              oddTitle={"draw"}
              matchId={match.id}
            ></OddBox>
            <OddBox
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                handleOnClickOdd(e, match.odds.match_result.away_win, "away_win", match)
              }
              oddNumber={match.odds.match_result.away_win}
              oddTitle={"away_win"}
              matchId={match.id}
            ></OddBox>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {Object.entries(match.odds).map(([key, value]) => (
          <Box
            key={key}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: 2,
              margin: "10px 0"
            }}
          >
            <Typography variant="subtitle1" fontSize={14} fontWeight={"bold"}>
              {OddEnum[key as keyof typeof OddEnum]}
            </Typography>
            <Box
              sx={{
                display: "flex",
                margin: "10px 0",
              }}
            >
              {Object.entries(value).map(([oddType, oddNumber]) => (
                <OddBox
                  key={oddType}
                  onClick={(e: React.MouseEvent<HTMLElement>) =>
                    handleOnClickOdd(e, oddNumber as number, oddType, match)
                  }
                  oddNumber={oddNumber as number}
                  oddTitle={oddType}
                  matchId={match.id}
                ></OddBox>
              ))}
            </Box>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default MatchBox;
