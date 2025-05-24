import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MatchType } from "../../types/matchType";
import MatchBox from "./MatchBox";
import { Box, Paper } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

type LeagueBoxProps = {
  title: string;
  matches: MatchType[];
};

const LeagueBox: React.FC<LeagueBoxProps> = ({ title, matches }) => {
  const [expanded, setExpanded] = React.useState<string | false>();

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box>
      {matches.length > 0 && (
        <Accordion sx={{ width: "100%", minWidth: "50vw" }} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
            <Typography
              component="span"
              fontWeight={"bold"}
              display={"flex"}
              gap={1}
              alignItems={"center"}
              color='var(--primary-color)'
            >
              <CalendarMonthIcon color="action" />
              {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {matches?.map((match: MatchType) => (
              <Paper key={match.id} elevation={4}>
                <MatchBox match={match} expanded={expanded} handleChangeExpanded={handleChange} />
              </Paper>
            ))}
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};

export default LeagueBox;
