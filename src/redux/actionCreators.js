import * as ActionTypes from './actionTypes';

export const baseUrl = 'http://localhost:8081/memes';
export const fetchMemes = () => (dispatch) => {
    return fetch(baseUrl)
        .then(res => {
            if (res.ok)
                return res
            else {
                var error = new Error('Error' + res.status + ':' + res.statusText)
                error.res = res
                throw error
            }
        })
        .then(res => res.json())
        .then(memes => {
            dispatch(addMeme(memes))
        })
        .catch(err => dispatch(memeFailed(err.message)))
}

export const addMeme = (memes) => ({
    type: ActionTypes.ADD_MEMES,
    payload: memes
});

export const memeFailed = (errMess) => ({
    type: ActionTypes.MEMES_FAILED,
    payload: errMess
});