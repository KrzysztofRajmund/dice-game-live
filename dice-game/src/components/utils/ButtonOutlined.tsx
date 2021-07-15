import React from 'react';
//material-ui
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '15rem',
                textAlign: 'center',
                padding: '1rem'
            },
            '& .MuiButton-endIcon': {
                margin: '0',
            }
        },
    }),
);

interface Props {
    icon?: React.ReactElement,
    buttonColor: any,
    title?: string
}

const ButtonContained: React.FC<Props> = ({ icon, buttonColor, title }) => {
    const classes = useStyles();
    return (
        <section>
            <div className={classes.root}>
                <Button variant='outlined' color={buttonColor} endIcon={icon}>{title}</Button>
            </div>
        </section>
    );
};

export default ButtonContained;
