import { Box, Button, Grid, TextField, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./styles";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as modalActions from "../../actions/modal";
import { Field, reduxForm } from "redux-form";
import renderTextField from "../../components/FormHelper/TextField";
import validate from "./validate";

class TaskForm extends Component {
  handleSubmitForm = data => {
    console.log(data);
  };

  render() {
    const {
      classes,
      modalActionsCreators,
      handleSubmit,
      invalid,
      submitting
    } = this.props;
    const { hideModal } = modalActionsCreators;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container>
          <Grid item md={12}>
            <Field
              name="title"
              id="title"
              component={renderTextField}
              label="Tiêu đề"
              className={classes.textField}
              margin="normal"
              validate={this.minLength5}
            />
          </Grid>
          <Grid item md={12}>
            <Field
              name="description"
              id="description"
              multiline
              rowsMax="4"
              component={renderTextField}
              label="Tiêu đề"
              className={classes.textField}
              margin="normal"
            />
          </Grid>
          <Grid item md={12}>
            <Box display="flex" flexDirection="row-reverse" mt={2}>
              <Button variant="contained" onClick={hideModal}>
                Hủy Bỏ
              </Button>
              <Box mr={1}>
                <Button
                  disabled={invalid || submitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Lưu Lại
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}

TaskForm.propTypes = {
  classes: PropTypes.object,
  modalActionsCreators: PropTypes.shape({
    hideModal: PropTypes.func
  }),
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool
};

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  modalActionsCreators: bindActionCreators(modalActions, dispatch)
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = "TASK_MANAGEMENT";

const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate
});

export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm
)(TaskForm);
