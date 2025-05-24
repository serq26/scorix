import { Box, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useBetsCart } from "../../hooks/useBetsCart";
import { OddEnum } from "../../constants/oddEnum";

type OddBoxProps = {
  matchId: number;
  oddNumber: number;
  oddTitle: string;
  onClick: (evet: React.MouseEvent<HTMLElement>) => void;
};

const AnimatedBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isAnimating",
})(({ isAnimating }: { isAnimating: boolean }) => ({
  animation: isAnimating ? "backgroundChange 3s" : "none",
  "@keyframes backgroundChange": {
    "0%": {
      backgroundColor: "white",
    },
    "50%": {
      backgroundColor: "yellow",
    },
    "100%": {
      backgroundColor: "white",
    },
  },
}));

const OddBox: React.FC<OddBoxProps> = ({ matchId, oddNumber, oddTitle, onClick }) => {
  const { bets } = useBetsCart();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isIntheBetCart, setIsInTheBetCart] = useState<boolean>(false);
  const prevOdd = useRef<number>(null);

  useEffect(() => {
    const response = bets?.find((item) => item.match.id === matchId)?.oddType === oddTitle;
    setIsInTheBetCart(response);
  }, [bets, matchId, oddTitle]);

  useEffect(() => {
    if (prevOdd.current == null) {
      prevOdd.current = oddNumber;
    } else if (prevOdd.current != oddNumber) {
      setIsAnimating(true);
      prevOdd.current = oddNumber;
    }
  }, [oddNumber]);

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        margin: 1,
        overflow: "hidden",
        cursor: "pointer",
        background: isIntheBetCart ? "orange" : null,
        "&: hover": {
          background: "var(--primary-color-hover)",
        },
      }}
      onClick={onClick}
    >
      <AnimatedBox isAnimating={isAnimating} onAnimationEnd={handleAnimationEnd}>
        <Box
          sx={{
            width: "46px",
            textAlign: "center",
            fontWeight: "bold",
            paddingY: "2px",
          }}
        >
          {oddNumber?.toFixed(2)}
        </Box>
      </AnimatedBox>
      <Box
        sx={{
          textAlign: "center",
          fontSize: 10,
          background: 'var(--primary-color)',
          color: "#ffffff",
          padding: "2px",
          fontWeight: "400",
        }}
      >
        {OddEnum[oddTitle as keyof typeof OddEnum]}
      </Box>
    </Paper>
  );
};

export default OddBox;
