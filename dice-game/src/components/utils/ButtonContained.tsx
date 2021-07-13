import React from 'react';
//material-ui
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(5),
                width: '15rem',
                textAlign: 'center',
                padding: '1rem'
            },
        },
    }),
);

interface Props {
    title: string,
    icon?: React.ReactElement,
    buttonColor?: any
}

const ButtonContained: React.FC<Props> = ({ title, icon, buttonColor }) => {
    const classes = useStyles();
    return (
        <section>
            <div className={classes.root}>
                <Button variant='contained' color={buttonColor} endIcon={icon}>{title}</Button>
            </div>
        </section>
    );
};

export default ButtonContained;
