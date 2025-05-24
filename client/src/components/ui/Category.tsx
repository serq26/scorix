import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { categoriesData } from "../../constants/categoriesData";
import useWebsocket from "../../hooks/useWebsocket";

function Category() {
  const { category, handleChangeCategory } = useWebsocket();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <ToggleButtonGroup value={category} exclusive onChange={handleChangeCategory} aria-label="Category">
        {categoriesData.map((item, index) => (
          <ToggleButton
            key={index}
            value={item?.id}
            color="standard"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              borderRadius: "10px",
              cursor: "pointer",
              "&: hover": {
                background: "#ddd",
              },
            }}
          >
            <img src={item?.icon} alt={item?.title} style={{ maxWidth: "50%" }} />
            <Typography variant="body2" color="black" fontWeight="bold" textTransform="none">
              {item.title}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

export default Category;
