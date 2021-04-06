import * as ActionTypes from './actionTypes';

export const Memes = (state = {
    errMess: null,
    memes: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_MEMES:
            return { ...state, errMess: null, memes: action.payload };
        case ActionTypes.MEMES_FAILED:
            return { ...state, errMess: action.payload };
        default:
            return state;
    }
}