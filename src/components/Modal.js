import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal as ModalContainer } from '@mui/material';

import { closeModal } from '../actions/commonActions';

export default function Modal({ children }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.common.modalOpen);
  const handleClose = () => dispatch(closeModal());

  return (
    <div>
      <ModalContainer
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {children}
      </ModalContainer>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
