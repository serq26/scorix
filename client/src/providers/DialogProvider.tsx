import { createContext, useState, ReactNode } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

type DialogType = {
  title: string;
  content: string;
  dissmissButtonText: string;
  confirmButtonText: string;
  isFormDialog?: boolean;
  inputId?: string;
  inputTitle?: string;
};

interface DialogContextType {
  open: (
    title: string,
    content: string,
    dissmissButtonText?: string,
    confirmButtonText?: string,
    isFormDialog?: boolean,
    inputId?: string,
    inputTitle?: string
  ) => Promise<boolean>;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<DialogType>({
    title: "",
    content: "",
    dissmissButtonText: "",
    confirmButtonText: "",
    isFormDialog: false,
    inputId: "",
    inputTitle: "",
  } as DialogType);
  const [show, setShow] = useState<boolean>(false);
  const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>(() => () => {});

  const open = (
    title: string,
    content: string,
    dissmissButtonText: string = "Cancel",
    confirmButtonText: string = "Okay",
    isFormDialog: boolean = false,
    inputId: string = "",
    inputTitle: string = ""
  ) => {
    setState({
      title,
      content,
      dissmissButtonText,
      confirmButtonText,
      isFormDialog,
      inputId,
      inputTitle,
    } as DialogType);
    setShow(true);

    return new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve);
    });
  };

  const onClose = () => {
    setShow(false);
  };

  const handleConfirm = () => {
    resolvePromise(true);
    onClose();
  };

  const handleCancel = () => {
    resolvePromise(false);
    onClose();
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const input = formJson[state.inputId as string];
    console.log("input", input);
    handleConfirm();
  };

  return (
    <DialogContext.Provider value={{ open }}>
      {children}
      <Dialog
        open={show}
        onClose={handleCancel}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => handleOnSubmit(event),
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            textAlign: 'center',
            backgroundColor: "var(--primary-color)",
            color: "white",
            fontWeight: "bold",
            position: 'relative',
          }}
        >
          <InfoIcon sx={{position: 'absolute', top: 0, bottom: 0, left: 10, margin: 'auto 0'}} />
          {state.title}
        </DialogTitle>
        <DialogContent sx={{ marginTop: "20px", marginBottom: "30px" }}>
          <DialogContentText id="alert-dialog-description">{state.content}</DialogContentText>
          {state.isFormDialog && (
            <TextField
              autoFocus
              required
              fullWidth
              type="text"
              margin="dense"
              variant="standard"
              id={state.inputId}
              name={state.inputId}
              label={state.inputTitle}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button sx={{ textTransform: "none" }} onClick={handleCancel} variant="contained">
            {state.dissmissButtonText}
          </Button>
          <Button sx={{ textTransform: "none" }} type="submit" autoFocus>
            {state.confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
};

export { DialogProvider, DialogContext };
