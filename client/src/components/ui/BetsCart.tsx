import BetsCartList from "./BetsCartList";
import { Badge, Box, IconButton, Paper, Slide, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BetsCartAmount from "./BetsCartAmount";
import { useBetsCart } from "../../hooks/useBetsCart";

const BetsCart = () => {
  const { bets, isOpenedBetsCart, setIsOpenedBetsCart } = useBetsCart();

  const toggleDrawer = (isOpen: boolean) => () => {
    setIsOpenedBetsCart(isOpen);
  };

  const getTotalOdds = () => {
    return bets.reduce((acc, item) => acc + item.oddNumber, 0).toFixed(2);
  };

  return (
    <>
      <Slide direction="left" in={!isOpenedBetsCart} timeout={500} mountOnEnter unmountOnExit>
        <Box
          onClick={toggleDrawer(true)}
          sx={{
            position: "fixed",
            right: 0,
            bottom: 50,
            padding: "20px",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            background: "var(--primary-color)",
            color: "white ",
            cursor: "pointer",
            fontWeight: "bold",
            "&: before": {
              content: "''",
              position: "absolute",
              left: "-8px",
              top: 0,
              bottom: 0,
              margin: "auto 0",
              background: "#edf3fa",
              height: "16px",
              width: "16px",
              borderRadius: "50%",
              zIndex: 9
            },
            "&: after": {
              content: "''",
              position: "absolute",
              left: "4px",
              right: "-14px",
              top: "4px",
              bottom: "4px",
              border: '2px solid #ddd',
              borderRadius: "10px",
            },
          }}
        >
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
            <Typography>
              <b>{bets.length}</b> Maç
            </Typography>
            <Typography>
              <b>{getTotalOdds()}</b> Oran
            </Typography>
          </Box>
        </Box>
      </Slide>

      <Slide direction="left" in={isOpenedBetsCart} mountOnEnter unmountOnExit>
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            zIndex: 1300,
            right: 0,
            bottom: 0,
            height: "70%",
            width: "25%",
            border: "8px solid",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            fontWeight: "500",
            overflow: "hidden",
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pl={2}
            py={1.4}
            color={"white"}
            fontWeight={"bold"}
            sx={{ backgroundColor: "var(--primary-color)" }}
          >
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Badge badgeContent={bets?.length === 0 ? "0" : bets?.length} color="warning"></Badge>
              Maç
            </Box>
            <IconButton aria-label="close" onClick={toggleDrawer(false)}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          <BetsCartList bets={bets} />
          {bets?.length > 0 && (
            <BetsCartAmount bets={bets} totalOdd={bets.reduce((acc, item) => acc + item.oddNumber, 0)} />
          )}
        </Paper>
      </Slide>
    </>
  );
};

export default BetsCart;
