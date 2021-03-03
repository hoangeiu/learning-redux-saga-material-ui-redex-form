import React, { Component } from "react";
import {
  withStyles,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Fab
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import styles from "./styles";

class TaskItem extends Component {
  render() {
    const { classes, task, status } = this.props;
    const { id, title, description } = task;
    return (
      <Card key={id} className={classes.card}>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={3}
          >
            <Grid item md={8}>
              <Typography component="h2">{title}</Typography>
            </Grid>
            <Grid item md={4}>
              {status.label}
            </Grid>
          </Grid>
          <p>{description}</p>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Fab color="secondary" aria-label="edit" size="small">
            <EditIcon fontSize="small" />
          </Fab>
          <Fab color="primary" aria-label="add" size="small">
            <DeleteIcon fontSize="small" />
          </Fab>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(TaskItem);
