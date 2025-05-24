import { createContext, useState, ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type SeverityType = "success" | "error" | "warning" | "info";

interface NotifyContextType {
  open: (message: string, severity?: SeverityType) => void;
}

const NotifyContext = createContext<NotifyContextType | undefined>(undefined);

const NotifyProvider = ({ children }: { children: ReactNode }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<SeverityType>("success");

  const open = (msg: string, sev: SeverityType = "success") => {
    setMessage(msg);
    setSeverity(sev);
    setOpenSnackbar(true);
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <NotifyContext.Provider value={{ open }}>
      {children}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </NotifyContext.Provider>
  );
};

export { NotifyProvider, NotifyContext };
