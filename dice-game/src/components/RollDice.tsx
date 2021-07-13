import React, { useEffect, useState } from 'react';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../store';
import { getDice } from '../actions/fetchActions';
//types
import { Dice } from '../actions/types'

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
        <div className='rollDice'>
            <h1>Dice Game</h1>
            {productsState.dice ? <img src={`http://roll.diceapi.com/images/poorly-drawn/d6/${productsState.dice.value}.png`} alt="" /> : <h1>Loading...</h1>}
            <button>Roll Dice</button>
        </div>
    )
}

export default RollDice;
