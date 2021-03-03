import React, { Component } from "react";
import { withStyles, Modal } from "@material-ui/core";
import styles from "./styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as modalActions from "../../actions/modal";
import CloseIcon from "@material-ui/icons/Clear";

class CommonModal extends Component {
  render() {
    const {
      classes,
      open,
      component,
      modalActionsCreators,
      title
    } = this.props;
    const { hideModal } = modalActionsCreators;
    return (
      <Modal open={open} onClose={hideModal}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <span className={classes.title}>{title}</span>
            <CloseIcon className={classes.icon} onClick={hideModal} />
          </div>
          <div className={classes.content}>{component}</div>
        </div>
      </Modal>
    );
  }
}

CommonModal.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  open: PropTypes.bool,
  modalActionsCreators: PropTypes.shape({
    hideModal: PropTypes.func
  }),
  component: PropTypes.object
};

const mapStateToProps = state => ({
  open: state.modal.showModal,
  component: state.modal.component,
  title: state.modal.title
});

const mapDispatchToProps = dispatch => ({
  modalActionsCreators: bindActionCreators(modalActions, dispatch)
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(CommonModal);
