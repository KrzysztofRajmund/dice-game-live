import React, { useEffect, useState } from 'react';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../store';
import { getDice } from '../actions/fetchActions';
//components
import ButtonContained from './utils/ButtonContained';
import ButtonOutlined from './utils/ButtonOutlined';
import Message from './utils/Message';
import WinnerMessage from './utils/WinnerMessage ';
import Player from './Player';
//assets
import Dice from '../assets/dice.png'
//material-ui
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiCardHeader-subheader': {
                color: '#f5f5f5',
                marginTop: '1rem',
            }
        },
        avatar: {
            backgroundColor: 'black',
            margin: 'auto',
            width: '35px',
            height: '35px',
        },
    }),
);


const RollDice: React.FC = () => {
    //material-ui styles
    const classes = useStyles();
    //types
    type Player = {
        id?: number,
        bonuspoints: number[],
        points: number[]
    }
    //redux
    const dispatch = useDispatch();
    const productsState = useSelector((state: RootStore) => state.dice);
    //states
    const [item, setItem] = useState<number[]>([0]);
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

    useEffect(() => {
        dispatch(getDice());
    }, [dispatch]);

    const diceHandler = () => {
        setLoadGame(s => (s = true));
        setItem(((prevState: any) => [...prevState, productsState.dice && productsState.dice.value]));
        if (togglePlayer) {
            setTogglePlayer(t => !t);
            setPlayerOne((prevState: { points: any; bonuspoints: any; }) => ({ ...prevState, points: [...prevState.points, productsState.dice && productsState.dice.value] }))
        } else {
            setTogglePlayer(t => !t);
            setPlayerTwo((prevState: { points: any; bonuspoints: any; }) => ({ ...prevState, points: [...prevState.points, productsState.dice && productsState.dice.value] }))

        };
    };

    //ROLL DICE FUNC
    const rollHandler = () => {
        if (playerOne.points.length === 15 && playerTwo.points.length === 15) {
            return;
        };
        dispatch(getDice());
        diceHandler();
    };

    // togglePlayer state watcher for roll dice func
    useEffect(() => {

        //present and next dice value
        let presentDice = item[item.length - 2] || 0;
        let nextDice = item[item.length - 1];
        // bonus points functions
        const bonusFn = (x: number, y: number) => {
            if ((item.length <= 2)) {
                return 0;
            };
            if (item.length > 2) {
                if (x < y) {
                    return 0.1;
                } if (x >= y) {
                    return 0;
                };
            };
        };
        if (!togglePlayer) {
            setPlayerOne((prevState: { bonuspoints: any; }) => ({ ...prevState, bonuspoints: [...prevState.bonuspoints, activeClass ? bonusFn(presentDice, nextDice) : bonusFn(nextDice, presentDice)] }));
        } else {
            setPlayerTwo((prevState: { bonuspoints: any; }) => ({ ...prevState, bonuspoints: [...prevState.bonuspoints, activeClass ? bonusFn(presentDice, nextDice) : bonusFn(nextDice, presentDice)] }));
        };
    }, [activeClass, item, togglePlayer]);


    //state cleaning
    const stateClearFunc = () => {
        localStorage.clear();
        setPlayerOne({
            id: 1,
            bonuspoints: [0],
            points: []
        });
        setPlayerTwo({
            id: 2,
            bonuspoints: [0],
            points: []
        });

        setItem([0]);
        setLoadGame(false);
        setTogglePlayer(true);
        setActiveClass(true);
        dispatch(getDice());
    };
    //continue game func
    const playFunc = (x: string) => {
        if (x === 'yes') {
            const storagePlayerOne = localStorage.getItem('playerOne');
            const storagePlayerTwo = localStorage.getItem('playerTwo');
            const storageDiceItems = localStorage.getItem('diceItems');
            const storageTogglePlayer = localStorage.getItem('togglePlayer');
            const storageActiveClass = localStorage.getItem('activeClass');
            if (storagePlayerOne && storagePlayerTwo) {
                setPlayerOne(JSON.parse(storagePlayerOne));
                setPlayerTwo(JSON.parse(storagePlayerTwo));
                setLoadGame(true);
            } if

                (storageDiceItems && storageTogglePlayer && storageActiveClass) {
                setItem(JSON.parse(storageDiceItems));
                setTogglePlayer(JSON.parse(storageTogglePlayer));
                setActiveClass(JSON.parse(storageActiveClass));
                localStorage.clear();
            }
        };

        if (x === 'no') {
            stateClearFunc();
        };
    };

    //winner func
    const pointsCount = () => {
        const playerOneCount = playerOne.points.length > 1 && playerOne.points.reduce((total: any, item: any) => total + item);
        const playerTwoCount = playerTwo.points.length > 1 && playerTwo.points.reduce((total: any, item: any) => total + item);
        if (playerOneCount > playerTwoCount) {
            setTimeout(() => {
                stateClearFunc()
            }, 3500)
            return 'Player 1 is a winner';
        };

        if (playerOneCount < playerTwoCount) {
            setTimeout(() => {
                stateClearFunc()
            }, 3500)
            return 'Player 2 is a winner';
        };
        if (playerOneCount === playerTwoCount) {
            setTimeout(() => {
                stateClearFunc()
            }, 3500)
            return 'It is a draw, good job Guys!';
        };
    };

    //on tab closed save game to localStorage
    const playersLocalStorage = () => {
        if (playerOne.points.length > 0) {
            localStorage.setItem('playerOne', JSON.stringify(playerOne));
            localStorage.setItem('playerTwo', JSON.stringify(playerTwo));
            localStorage.setItem('togglePlayer', JSON.stringify(togglePlayer));
            localStorage.setItem('diceItems', JSON.stringify(item));
            localStorage.setItem('activeClass', JSON.stringify(activeClass));
        } else {
            return;
        };
    }
    window.addEventListener('beforeunload', playersLocalStorage);

    return (
        <>
            {localStorage.getItem('playerOne') && <Message message='Do you want to resume game?' play={playFunc} />}
            {playerTwo.points.length === 15 && <WinnerMessage message={`${pointsCount()}`} />}
            <Player id={playerOne.id} bonuspoints={playerOne.bonuspoints} points={playerOne.points} />
            <section className='rollDice'>
                <h1>Dice Game</h1>
                <h2>{`Round ${playerTwo.points.length === 15 ? 15 : playerTwo.points.length + 1}/15`}</h2>
                <div className='diceWrapper'>
                    {!loadGame ? (<img src={Dice} alt='dice-img' />) : (item && item.length !== 0 ? <img src={`http://roll.diceapi.com/images/poorly-drawn/d6/${item[item.length - 1]}.png`} alt={`dice-img-${item[item.length - 1]}`} /> : '')}
                </div>
                <h3>Bet next dice</h3>
                <div className='nextDiceButtons'>
                    <div className={activeClass ? 'active' : ''} onClick={() => setActiveClass(!activeClass)}>
                        <ButtonOutlined buttonColor='secondary' icon={activeClass ? <VerticalAlignTopIcon /> : <VerticalAlignBottomIcon />} />
                    </div>
                </div>
                <div onClick={() => rollHandler()}>
                    <ButtonContained buttonColor='primary' title={togglePlayer ? <CardHeader className={classes.root}
                        title={
                            <Avatar aria-label='avatar' className={classes.avatar}>
                                <h1>{playerOne.id}</h1>
                            </Avatar>
                        }
                        subheader={'Player'}
                    /> : <CardHeader className={classes.root}
                        title={
                            <Avatar aria-label='avatar' className={classes.avatar}>
                                <h1>{playerTwo.id}</h1>
                            </Avatar>
                        }
                        subheader={'Player'}
                    />} />
                    <AutorenewIcon fontSize='large' color='action' />
                </div>
            </section>
            <Player id={playerTwo.id} bonuspoints={playerTwo.bonuspoints} points={playerTwo.points} />
        </>
    )
}

export default RollDice;
