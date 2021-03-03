import React, { Component } from "react";
import { withStyles, Button, Grid, Box } from "@material-ui/core";
import styles from "./styles";
import AddIcon from "@material-ui/icons/Add";
import { STATUSES } from "../../constants";
import TaskList from "../../components/TaskList";
import TaskForm from "../../containers/TaskForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as taskActions from "../../actions/tasks";
import * as modalActions from "../../actions/modal";
import PropTypes from "prop-types";
import SearchBox from "../../components/SearchBox";

class Taskboard extends Component {
  componentDidMount() {
    const { taskActionsCreators } = this.props;
    const { fetchListTask } = taskActionsCreators;
    fetchListTask();
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("componentWillReceiveProps");

  //   if (nextProps && nextProps.listTask) {
  //     const { taskActionsCreators } = this.props;
  //     const { fetchListTaskSuccess } = taskActionsCreators;
  //     var { listTask } = nextProps;
  //     fetchListTaskSuccess(listTask);
  //   }
  // }

  renderBoard() {
    const { listTask } = this.props;
    let xhtml = null;
    xhtml = (
      <Grid container spacing={3}>
        {STATUSES.map(status => {
          const taskFiltered = listTask.filter(
            task => task.status === status.value
          );
          return (
            <TaskList status={status} tasks={taskFiltered} key={status.value} />
          );
        })}
      </Grid>
    );
    return xhtml;
  }

  openForm = () => {
    const { modalActionsCreators } = this.props;
    const {
      showModal,
      changeModalTitle,
      changeModalContent
    } = modalActionsCreators;
    showModal();
    changeModalTitle("Thêm mới công việc");
    changeModalContent(<TaskForm />);
  };

  loadData = () => {
    const { taskActionsCreators } = this.props;
    const { fetchListTask } = taskActionsCreators;
    fetchListTask();
  };

  handleFilter = e => {
    const { value } = e.target;
    const { taskActionsCreators } = this.props;
    const { filterTask } = taskActionsCreators;
    filterTask(value);
  };

  renderSearchBox = () => {
    let xhtml = null;
    xhtml = <SearchBox handleChange={this.handleFilter} />;
    return xhtml;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.taskBoard}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.loadData}
          style={{
            marginRight: 20
          }}
        >
          Load Data
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.openForm}
        >
          <AddIcon /> Thêm mới công việc
        </Button>
        {this.renderSearchBox()}
        {this.renderBoard()}
      </div>
    );
  }
}

Taskboard.propTypes = {
  classes: PropTypes.object,
  taskActionsCreators: PropTypes.shape({
    fetchListTask: PropTypes.func,
    filterTask: PropTypes.func
  }),
  modalActionsCreators: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalTitle: PropTypes.func,
    changeModalContent: PropTypes.func
  }),
  listTask: PropTypes.array
};

const mapStateToProps = state => {
  return {
    listTask: state.task.listTask
  };
};
const mapDispatchToProps = dispatch => {
  return {
    taskActionsCreators: bindActionCreators(taskActions, dispatch),
    modalActionsCreators: bindActionCreators(modalActions, dispatch)
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Taskboard)
);
