import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import ButtonContained from './ButtonContained';

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
            zIndex: 80,
            top: 0,
            left: 0,
            backgroundColor: '#f5f5f5cb',
            '& .MuiAlert-root': {
                margin: '2rem auto',
                fontSize: '2rem',
                backgroundColor: '#2b2b2b',
                color: '#f5f5f5'
            },
        },
        buttons: {
            margin: '0px auto',
            display: 'inline-flex',

        }
    }),
);

interface Props {
    message: string,
    play?: (x: string) => void
}

const Message: React.FC<Props> = ({ message, play }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Alert severity="info">{message}</Alert>
            {
                play && <section className={classes.buttons}>
                    <div onClick={() => play('yes')}>
                        <ButtonContained buttonColor='primary' title='YES' />
                    </div>
                    <div onClick={() => play('no')}>
                        <ButtonContained buttonColor='secondary' title='NO' />
                    </div>
                </section>
            }

        </div>
    );
};

export default Message;
