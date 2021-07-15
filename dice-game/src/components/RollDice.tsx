import React, { useEffect, useState } from 'react';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../store';
import { getDice } from '../actions/fetchActions';
//components
import ButtonContained from './utils/ButtonContained';
import ButtonOutlined from './utils/ButtonOutlined';
import Player from './Player';
//assets
import Dice from '../assets/dice.png'
//material-ui
import AutorenewIcon from '@material-ui/icons/Autorenew';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';

const RollDice: React.FC = () => {
    //types
    type Player = {
        id?: number,
        bonuspoints: number[],
        points: number[]
    }

    //redux
    const dispatch = useDispatch();
    const productsState = useSelector((state: RootStore) => state.dice);
    const [item, setItem] = useState<any>([0]);
    const [loadGame, setLoadGame] = useState(false);
    const [togglePlayer, setTogglePlayer] = useState(true);
    const [activeClass, setActiveClass] = useState(true);
    const [playerOne, setPlayerOne] = useState<any>({
        id: 1,
        bonuspoints: [0],
        points: []
    });

    const [playerTwo, setPlayerTwo] = useState<any>({
        id: 2,
        bonuspoints: [0],
        points: []
    });

    const rollHandler = () => {
        if (playerOne.points.length === 15 && playerTwo.points.length === 15) {
            return
        }
        setLoadGame(true);
        dispatch(getDice());
    };

    const bonusFnUp = () => {
        if (item.length === 1) {
            return 0;
        };

        if (item.length > 1 && productsState.dice) {
            if (item[item.length - 2] > item[item.length - 1]) {
                return 0.1;
            } if (item[item.length - 2] <= item[item.length - 1]) {
                return 0;
            }
        }
    };


    const bonusFnDown = () => {
        if (item.length === 1) {
            return 0;
        };

        if (item.length > 1 && productsState.dice) {
            if (item[item.length - 2] < item[item.length - 1]) {
                return 0.1;
            } if (item[item.length - 2] >= item[item.length - 1]) {
                return 0;
            }
        }
    };


    useEffect(() => {
        if (productsState.dice && loadGame) {
            setItem(((prevState: any) => [...prevState, productsState.dice && productsState.dice.value]));
            if (togglePlayer) {
                setTogglePlayer(t => !t);
                setPlayerOne((prevState: { points: any; bonuspoints: any; }) => ({ ...prevState, points: [...prevState.points, productsState.dice && productsState.dice.value] }))
            } else {
                setTogglePlayer(t => !t);
                setPlayerTwo((prevState: { points: any; bonuspoints: any; }) => ({ ...prevState, points: [...prevState.points, productsState.dice && productsState.dice.value] }))

            }
        }
    }, [productsState.dice, loadGame]);

    useEffect(() => {
        if (!togglePlayer) {
            setPlayerOne((prevState: { bonuspoints: any; }) => ({ ...prevState, bonuspoints: [...prevState.bonuspoints, activeClass ? bonusFnUp() : bonusFnDown()] }))
        } else {
            setPlayerTwo((prevState: { bonuspoints: any; }) => ({ ...prevState, bonuspoints: [...prevState.bonuspoints, activeClass ? bonusFnUp() : bonusFnDown()] }))

        }
    }, [togglePlayer]);

    console.log(playerOne.bonuspoints, 'bonuspoinnts 1');
    console.log(playerTwo.bonuspoints, 'bonuspoinnts 2');
    return (
        <>
            <Player id={playerOne.id} bonuspoints={playerOne.bonuspoints} points={playerOne.points} />
            <section className='rollDice'>
                <h1>Dice Game</h1>
                <h2>{`Round ${playerTwo.points.length === 15 ? 15 : playerTwo.points.length + 1}/15`}</h2>
                <div className='diceWrapper'>
                    {!loadGame ? (<img src={Dice} alt='dice-img' />) :
                        (productsState.dice ? <img src={`http://roll.diceapi.com/images/poorly-drawn/d6/${productsState.dice.value}.png`} alt={`dice-img-${productsState.dice.value}`} /> : <h1>Loading...</h1>)}
                </div>
                <div className='nextDiceButtons'>
                    <div className={activeClass ? 'active' : ''} onClick={() => setActiveClass(!activeClass)}>
                        <ButtonOutlined buttonColor='secondary' icon={<VerticalAlignTopIcon />} />
                    </div>
                    <div className={!activeClass ? 'active' : ''} onClick={() => setActiveClass(!activeClass)}>
                        <ButtonOutlined buttonColor='secondary' icon={<VerticalAlignBottomIcon />} />
                    </div>
                </div>
                <div onClick={() => rollHandler()}>
                    <ButtonContained buttonColor='primary' title={togglePlayer ? 'Player One' : 'Player Two'} icon={<AutorenewIcon />} />
                </div>
            </section>
            <Player id={playerTwo.id} bonuspoints={playerTwo.bonuspoints} points={playerTwo.points} />
        </>
    )
}

export default RollDice;
