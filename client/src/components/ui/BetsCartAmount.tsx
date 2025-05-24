import { useState } from "react";
import { Box, Button, IconButton, InputAdornment, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useBetsCart } from "../../hooks/useBetsCart";
import { BetsCartListType } from "../../types/betsCartType";
import { useNotify } from "../../hooks/useNotify";
import { playCoupon, saveCouponToDB } from "../../services/db";
import { useDialog } from "../../hooks/useDialog";
import NumberInput from "../common/NumberInput";

type BetsCartAmountProps = {
  bets: BetsCartListType[];
  totalOdd: number;
};

const BetsCartAmount: React.FC<BetsCartAmountProps> = ({ bets, totalOdd }) => {
  const { clearAllBets, setIsOpenedBetsCart } = useBetsCart();
  const [fold, setFold] = useState<number>(50);
  const notify = useNotify();
  const dialog = useDialog();
  const maxEarning: number = Number((fold * totalOdd).toFixed(2));

  const handleSaveCoupon = async () => {
    const response = await dialog.open(
      "Kuponuna İsim Ver",
      "Kuponunun ismi en az 3 karakter, en fazla 20 karakter olmalıdır.",
      "Vazgeç",
      "Kaydet",
      true,
      "name",
      "Kupon İsmi"
    );
    if (response) {
      try {
        const result = await saveCouponToDB(bets);
        if (result) {
          notify.open("Kuponunuz kaydedildi.");
          return true;
        }

        notify.open("Kuponunuz kaydedilemedi", "error");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClear = async () => {
    const response = await dialog.open(
      "Maçların Siliniyor",
      "Kuponundaki tüm maçları silmek istediğine emin misin?",
      "Vazgeç",
      "Sil"
    );
    if (response) {
      clearAllBets();
      setIsOpenedBetsCart(false);
      notify.open("Kuponunuz silindi.");
    }
  };

  const handleOnPlay = async () => {
    try {
      const response = await playCoupon(bets, maxEarning);
      if (response) {
        notify.open("Kuponunuz başarıyla oynandı.");
        clearAllBets();
        setIsOpenedBetsCart(false);
        return true;
      }

      notify.open("Kuponunuz hata aldı!", "error");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ background: "#000", color: "#fff", position: "absolute", left: 0, right: 0, bottom: 0 }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={1}
        borderBottom={"1px solid #ccc"}
      >
        <Typography fontSize={14}>Kupon Bedeli</Typography>
        <NumberInput
          value={fold}
          endAdornment={<InputAdornment position="end">TL</InputAdornment>}
          inputProps={{ style: { padding: "10px" } }}
          onChange={(value: number) => setFold(value)}
        />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={1}
        borderBottom={"1px solid #ccc"}
      >
        <Typography fontSize={14}>Toplam Oran</Typography>
        <Typography mr={1} fontWeight={"bold"}>
          {totalOdd.toFixed(2)}
        </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={1}
        borderBottom={"1px solid #ccc"}
      >
        <Typography fontSize={14}>Maks. Kazanç</Typography>
        <Typography mr={1} fontWeight={"bold"}>
          {maxEarning} TL
        </Typography>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={1}>
        <Box>
          <IconButton aria-label="delete" color="inherit" onClick={() => handleClear()}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" color="inherit" onClick={() => handleSaveCoupon()}>
            <SaveIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          sx={{ background: "var(--primary-color)", color: "white", fontWeight: "bold" }}
          onClick={() => handleOnPlay()}
        >
          Hemen Oyna
        </Button>
      </Box>
    </Box>
  );
};

export default BetsCartAmount;
