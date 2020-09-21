import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './features/home/Home';
import Task from './features/task/Task';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootContainer: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
  }),
);

function App() {
  const classes = useStyles();

  return (
    <div className={classes.rootContainer}>
      <Router>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/task">
              <Task />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
