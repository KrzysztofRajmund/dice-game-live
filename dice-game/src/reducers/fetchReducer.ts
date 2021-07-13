import {
    GET_DICE_LOADING,
    GET_DICE_SUCCESS,
    GET_DICE_FAIL,
    Dice,
    DiceDispatchTypes
} from '../actions/types';


interface InitialState {
    loading: boolean,
    message?:string,
    dice?: Dice
}

const initialState: InitialState = {
    loading: false,
    dice: {
        type:"",
        value:null
    },
    message:""

}

export const  fetchReducer =  (state = initialState, action: DiceDispatchTypes): InitialState =>{

    switch (action.type) {
        case GET_DICE_LOADING:
        return {
            loading: true
        }
        case GET_DICE_SUCCESS:
        return {
            ...state,
            loading: false,
            dice: action.payload,
        }
        case GET_DICE_FAIL:
            return {
            ...state,
            loading: false,
            message: action.message
            }
        default:
            return state;
    }
}