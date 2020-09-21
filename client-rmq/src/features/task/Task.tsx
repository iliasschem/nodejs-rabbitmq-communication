import { gql, useQuery, useMutation } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        minWidth: '50%'
    },
    listItem: {
        width: '100%',
        backgroundColor: '#d2d2d2',
        minHeight: 150
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    buttonContainer: {
        minHeight: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
  }),
);

const GET_TASK = gql`
    {
        task {
            value
            id
        }
    }
`;

const UPDATE_TASK = gql`
    mutation UpdateTask($value: String!, $id: String!) {
        updateTask(value: $value, id: $id)
    }
`;

function Task(){
    const { loading, error, data } = useQuery(GET_TASK, {
        pollInterval: 500,
    });
    const [updateTaskMut, {data:response}] = useMutation(UPDATE_TASK)
    const classes = useStyles();
    const { task } = loading ? { task: null}: data ;

    const updateTask = (task: any) => {
        updateTaskMut({variables: {value: task.value, id: task.id}})
    }

    return (
        <>
        {loading &&
            <CircularProgress disableShrink />
        }
        {!loading &&
            <div className={classes.container}>
                <Typography variant="h6" className={classes.title}>
                    Task
                </Typography>
                    <List dense={false} component="nav" aria-label="contacts">
                        {task && 
                            <ListItem className={classes.listItem} key={task.id}>
                                <ListItemText
                                    primary={task.value}
                                />
                                <div className={classes.buttonContainer}>
                                    <Button variant="contained" color="primary" onClick={() => updateTask(task)}>
                                        Done
                                    </Button>
                                    <Button variant="contained">Delete</Button>
                                </div>
                            </ListItem>
                        }
                        {!task && 
                            <ListItem  className={classes.listItem}>
                                <ListItemText
                                    primary={"No task available yet"}
                                />
                            </ListItem>
                        }
                    </List>
            </div>
        }
        </>
    )
}

export default Task;