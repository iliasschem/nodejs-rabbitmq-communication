import React, { useState, FormEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { gql, useMutation } from '@apollo/client';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textField: {
      minWidth: 400,
    },
    button: {
      minWidth: 200,
      marginTop: 20,
    }
  }),
);

const ADD_TASK = gql`
  mutation AddTask($value: String!) {
    addTask(value: $value)
  }
`;


function Home(){
    const classes = useStyles();
    const [taskValue, setTaskValue] = useState('');
    const submitTask = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTask({ variables: { value: taskValue } });
        setTaskValue('');
    }
    const [addTask, { data }] = useMutation(ADD_TASK);


    return (
        <form className={classes.root} onSubmit={submitTask} noValidate autoComplete="off">
            <TextField variant="outlined" className={classes.textField} value={taskValue} label="Create a new job" onChange={(e) => setTaskValue(e.target.value) } />
            <Button className={classes.button} type="submit" variant="contained" color="primary">
                submit
            </Button>
        </form>
    )
}

export default Home;