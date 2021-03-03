import { ThemeProvider, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import theme from "../../commons/Theme";
import Taskboard from "../Taskboard";
import styles from "./styles";
import { Provider } from "react-redux";
import configureStore from "../../redux/configureStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalLoading from "../../components/GlobalLoading";
import CommonModal from "../../components/CommonModal";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <GlobalLoading />
          <CommonModal />
          <Taskboard />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
