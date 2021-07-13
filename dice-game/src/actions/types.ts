export const GET_DICE_LOADING = 'GET_DICE_LOADING';
export const GET_DICE_SUCCESS = 'GET_DICE_SUCCESS';
export const GET_DICE_FAIL = 'GET_DICE_FAIL';


export type Dice = {
type:string,
value:number | null
}


export interface GetDiceLoading {
    type: typeof GET_DICE_LOADING
} 

export interface GetDiceSuccess {
    type: typeof GET_DICE_SUCCESS,
    payload:Dice
}

export interface GetDiceFail {
    type: typeof GET_DICE_FAIL,
    message: string
}


export type DiceDispatchTypes = GetDiceLoading | GetDiceSuccess | GetDiceFail
