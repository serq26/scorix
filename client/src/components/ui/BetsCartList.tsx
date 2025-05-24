import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { categoriesData } from "../../constants/categoriesData";
import { BetsCartListType } from "../../types/betsCartType";
import DeleteIcon from "@mui/icons-material/Delete";
import { useBetsCart } from "../../hooks/useBetsCart";
import { MatchType } from "../../types/matchType";
import { OddEnum } from "../../constants/oddEnum";
import { useLocation } from "react-router-dom";

type BetsCartListProps = {
  bets: BetsCartListType[];
};

const BetsCartList: React.FC<BetsCartListProps> = ({ bets }) => {
  const { deleteBet, setIsOpenedBetsCart } = useBetsCart();
  const location = useLocation();
  const isTheLocationPage: boolean = location.pathname === "/my-coupons" ? true : false;

  function getCategoryIcon(category: string | undefined) {
    const img = categoriesData.find((item) => item.id === category);
    return <img src={img?.icon} alt={img?.title} style={{ maxWidth: "8%", objectFit: "cover" }} />;
  }

  function handleDeleteBet(match: MatchType) {
    // dispatch({ type: "CLEAR_BETS", payload: { match: match, oddNumber: 0 } });
    deleteBet(match.id);
  }

  if (bets.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "50%",
          gap: 4,
        }}
      >
        <Typography textAlign={"center"} mt={2}>
          Kuponunuzda hiç maç bulunmuyor.
        </Typography>
        <Button variant="outlined" onClick={() => setIsOpenedBetsCart(false)}>
          Maç Ekle
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "50%", overflow: !isTheLocationPage ? "scroll" : null }}>
      {bets?.map((bet) => (
        <Paper key={bet.match.id} elevation={0} sx={{ borderBottom: "1px solid #ccc", pb: 2 }}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} py={2} px={1}>
            <Box display={"flex"} gap={2}>
              {getCategoryIcon(bet.match.category)}
              <Box>
                {bet.match.homeTeam} - {bet.match.awayTeam}
              </Box>
            </Box>
            {!isTheLocationPage && (
              <IconButton aria-label="delete" onClick={() => handleDeleteBet(bet.match)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} ml={2}>
            <Box display={"flex"} justifyContent={"flex-start"}>
              <Box
                sx={{
                  background: "#dedede",
                  fontSize: 12,
                  padding: "5px 10px",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
              >
                {OddEnum[bet.oddType as keyof typeof OddEnum]}
              </Box>
              <Box
                sx={{
                  background: "orange",
                  fontWeight: "bold",
                  fontSize: 12,
                  padding: "5px 10px",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              >
                {bet.oddNumber.toFixed(2)}
              </Box>
            </Box>
            <Typography variant="body2" mr={2}>
              {new Date(bet.match.matchDate.toString().replace(" ", "T")).toLocaleString("tr-TR", {
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default BetsCartList;
