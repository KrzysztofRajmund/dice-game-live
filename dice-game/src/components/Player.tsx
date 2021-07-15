import React from 'react';

interface Props {
    id: any,
    bonuspoints: any,
    points: any
}

const Player: React.FC<Props> = ({ id, bonuspoints, points }) => {

    const bonus = bonuspoints.reduce(((total: number, num: number) => (total + num)), 0);
    const totalScore = points.reduce(((total: number, num: number) => total + num), 0) + bonus;

    return (
        <section className='playerWrapper'>
            <article>
                <h1>Player {id}</h1>
                <h3>Bonus points: {bonus.toFixed(1)}</h3>
                {points.map((x: any, index: React.Key | null | undefined) => {
                    return (<div key={index}>{x}</div>)
                })}
            </article>
            <article>
                <h2>Total score: {totalScore.toFixed(1)}</h2>
            </article>
        </section>
    )
}

export default Player;
