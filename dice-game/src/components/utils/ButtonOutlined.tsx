import React from 'react';
//material-ui
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
            '& .MuiButton-endIcon': {
                margin: '0',
            }
        },
    }),
);

interface Props {
    icon: React.ReactElement,
    buttonColor: any
}

const ButtonContained: React.FC<Props> = ({ icon, buttonColor }) => {
    const classes = useStyles();
    return (
        <section>
            <div className={classes.root}>
                <Button variant='outlined' color={buttonColor} endIcon={icon} />
            </div>
        </section>
    );
};

export default ButtonContained;
