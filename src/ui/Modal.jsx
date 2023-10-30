import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function BasicModal({ open, handleClose, style, children }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: { style: { background: style.backdrop } },
        }}
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}
