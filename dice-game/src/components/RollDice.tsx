import React, { useEffect, useState } from 'react';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../store';
import { getDice } from '../actions/fetchActions';
//types
import { Dice } from '../actions/types';
//components
import ButtonContained from './utils/ButtonContained';
import ButtonOutlined from './utils/ButtonOutlined';
//material-ui
import AutorenewIcon from '@material-ui/icons/Autorenew';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';

const RollDice: React.FC = () => {

    //redux
    const dispatch = useDispatch();
    const productsState = useSelector((state: RootStore) => state.dice);

    const [item, setItem] = useState<Dice>();

    useEffect(() => {
        dispatch(getDice());
    }, [dispatch])
    console.log(productsState)
    return (
        <section className='rollDice'>
            <h1>Dice Game</h1>
            <h2>Round 1/15</h2>
            <div className='diceWrapper'>
                {productsState.dice ? <img src={`http://roll.diceapi.com/images/poorly-drawn/d6/${productsState.dice.value}.png`} alt="" /> : <h1>Loading...</h1>}
            </div>
            <div className='nextDiceButtons'>
                <ButtonOutlined buttonColor='secondary' icon={<VerticalAlignTopIcon />} />
                <ButtonOutlined buttonColor='secondary' icon={<VerticalAlignBottomIcon />} />
            </div>
            <ButtonContained buttonColor='primary' title='Roll' icon={<AutorenewIcon />} />
        </section>
    )
}

export default RollDice;
