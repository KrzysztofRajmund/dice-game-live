import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import ButtonContained from './ButtonContained';
import ButtonOutlined from './ButtonOutlined';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            transition: 'all 1s ease-in-out',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItem: 'center',
            textAlign: 'center',
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            zIndex: 100,
            top: 0,
            left: 0,
            backgroundColor: '#f5f5f5ec',
            '& .MuiAlert-root': {
                margin: '2rem auto',
                fontSize: '2rem',
                backgroundColor: 'transparent',
            },
        },
        buttons: {
            margin: '0px auto',
            display: 'inline-flex',

        }
    }),
);

interface Props {
    message: string
}

const Message: React.FC<Props> = ({ message }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Alert severity="info">{message}</Alert>
            <div className={classes.buttons}>
                <ButtonContained buttonColor='primary' title='YES' />
                <ButtonOutlined buttonColor='secondary' title='NO' />
            </div>
        </div>
    );
};

export default Message;
