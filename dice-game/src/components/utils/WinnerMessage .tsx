import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItem: 'center',
            textAlign: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'pink',
            '& .MuiAlert-root': {
                margin: '2rem auto',
                fontSize: '2rem',
                backgroundColor: '#f5f5f5',
                color: '#2b2b2b',
            },
        },
    }),
);

interface Props {
    message: string,
}

const WinnerMessage: React.FC<Props> = ({ message }) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);

    const elHtml = (<div className='winnerMessage'>
        <div className={classes.root}>
            <Alert >Congrats&nbsp;{message}&nbsp;!</Alert>
        </div>
    </div>)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, [])

    return (
        <>
            {loading && elHtml}
        </>
    );
};

export default WinnerMessage;
