import React, { Children, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import './css.css';
import {
  Box,
  Typography
} from '@material-ui/core';


function CusModal(props) {

  // const classes = useStyles();

  return (
    <div>
      <Modal
        open={props.open}
        // onClose={() => props.onClose()}
        className="modal"
      >
        <Box className={`modalWrp animate-fadeIn ${props.size}`}>
          <Typography className="modal-title">{props.modatTitle}</Typography>
          <div className="modalBody">
            {props.children}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default CusModal;
