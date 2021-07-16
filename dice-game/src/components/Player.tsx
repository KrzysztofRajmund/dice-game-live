import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '0rem 2rem 0rem 2rem',
            height: '100%',
        },
        avatar: {
            backgroundColor: 'black',
            margin: 'auto',
        },
        '& .MuiCardHeader-root': {
            padding: 0,
        }
    }),
);

interface Props {
    id: any,
    bonuspoints: any,
    points: any
}

const Player: React.FC<Props> = ({ id, bonuspoints, points }) => {
    const classes = useStyles();
    const bonus = bonuspoints.reduce(((total: number, num: number) => (total + num)), 0);
    const totalScore = points.reduce(((total: number, num: number) => total + num), 0) + bonus;
    const bonusEl = <h5><i>Bonus points:<br />{bonus.toFixed(1)}&nbsp;pkt</i></h5>
    return (

        <section className='playerWrapper'>
            <Card className={classes.root}>
                <CardHeader
                    title={
                        <Avatar aria-label='avatar' className={classes.avatar}>
                            <h1>{id}</h1>
                        </Avatar>
                    }
                    subheader={bonusEl}
                />
                <article>
                    {points.map((x: any, index: React.Key | null | undefined) => {
                        return (<h3 key={index}>{x}</h3>)
                    })}
                </article>
            </Card>
            <article>
                <h2>Total score: {totalScore.toFixed(1)}&nbsp;pkt</h2>
            </article>
        </section>

    )
}

export default Player;
