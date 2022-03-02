import { Backdrop, Box, Fade, Modal as MUIModal, Paper } from "@mui/material";

import { FaTimesCircle } from "react-icons/fa";

interface ModalProps {
  open: any;
  handleClose: any;
  ariaLabel: any;
}

const Modal: React.FC<ModalProps> = ({
  open,
  ariaLabel,
  handleClose,
  children,
}) => (
  <MUIModal
    open={open}
    onClose={handleClose}
    aria-labelledby={ariaLabel}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Paper
          sx={{
            height: "fit-content",
            maxHeight: "70vh",
            width: "50vw",
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            margin: "auto",
            textAlign: "center",
            display: "flex",
            padding: "2rem",
          }}
        >
          <FaTimesCircle
            style={{
              position: "absolute",
              right: "2%",
              top: "3%",
              cursor: "pointer",
            }}
            size={20}
            color="rgba(0, 0, 0, 0.6)"
            onClick={handleClose}
          />

          <Box sx={{ margin: "auto", width: "100%" }}>{children}</Box>
        </Paper>
      </Box>
    </Fade>
  </MUIModal>
);

export default Modal;
