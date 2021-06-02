import { SET_COUNT, SET_NAME } from './actions';

export interface IAppState{
    count: number;
    name: string;
}

export const INITIAL_STATE: IAppState = {
    count: 0,
    name: ""
}

export function rootReducer(state, action){
    switch(action.type){
        case SET_COUNT:
            return Object.assign({}, state, {
                count: action.count,
                name: state.name
            })
        case SET_NAME:
            return Object.assign({}, state, {
                count: state.count,
                name: action.name
            })
    }   
    return state;
}