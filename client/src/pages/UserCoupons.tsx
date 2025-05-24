import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getPlayedCouponsFromDB } from "../services/db";
import { CouponType } from "../types/couponType";
import BetsCartList from "../components/ui/BetsCartList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function UserCoupons() {
  const [expanded, setExpanded] = useState<string | false>();
  const [coupons, setCoupons] = useState<CouponType[]>([]);

  useEffect(() => {
    getCoupons();
  }, []);

  const handleChangeExpanded = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const getCoupons = async () => {
    const response = await getPlayedCouponsFromDB();
    setCoupons(response);
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: "150px" }}>
      {coupons?.map((item) => (
        <Box sx={{ background: "#fff", borderRadius: "10px", padding: "10px", marginTop: "20px"}}>
            <Accordion
              expanded={expanded === `panel-${item.id}`}
              onChange={handleChangeExpanded(`panel-${item.id}`)}
              sx={{ width: "100%", minWidth: "50vw", my: 2 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`panel-${item.id}-header`}>
                {new Date(item.date).toLocaleString("tr-TR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </AccordionSummary>
              <AccordionDetails>
                <BetsCartList bets={item.coupon} />
              </AccordionDetails>
              
            </Accordion>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <Box bgcolor={"#0c4259"} textAlign={"center"} p={2} borderRadius={2}>
                    <Typography><b>{item.coupon?.length}</b> Maç</Typography>
                    <Typography><b>{item.totalOdd.toFixed(2)}</b> Oran</Typography>
                </Box>
                <Box color={"black"} textAlign={"center"} p={2} borderRadius={2}>
                    <Typography variant="subtitle1" fontWeight={"bold"}>{item.foldAmount} TL</Typography>
                    <Typography variant="subtitle2">Kupon Bedeli</Typography>
                </Box>
                <Box bgcolor={"#35d235"} color={"white"} textAlign={"center"} p={2} borderRadius={2}>
                    <Typography variant="subtitle1" fontWeight={"bold"}>{item.maxEarning} TL</Typography>
                    <Typography variant="subtitle2">Maks. Kazanç</Typography>
                </Box>
            </Box>
        </Box>
      ))}
    </Container>
  );
}

export default UserCoupons;
