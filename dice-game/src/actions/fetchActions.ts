import {Dispatch} from 'redux';

import {
    GET_DICE_LOADING,
    GET_DICE_SUCCESS,
    GET_DICE_FAIL,
    DiceDispatchTypes
} from './types';



export const getDice = () => async (dispatch:Dispatch<DiceDispatchTypes>) => {
try {
    dispatch({
        type:  GET_DICE_LOADING
    })
   const url = "http://roll.diceapi.com/json/d6";
   const  response = await fetch(url);
   const data = await response.json();
   dispatch({
       type: GET_DICE_SUCCESS,
       payload: data.dice[0]
   })
} catch (error) {
    dispatch({
        type: GET_DICE_FAIL,
        message: error.message + "Problem to load dice"
    })
}
}