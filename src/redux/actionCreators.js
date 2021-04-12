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
        .then(memes => {dispatch(addMeme(memes))})
        .catch(err => dispatch(memeFailed(err.message)))
}

export const postMemes = (name, caption, url) => (dispatch) => {
    const data = {
        name: name,
        caption: caption,
        url: url
    }

    fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(response => {
        if (response.ok)
            return response
        else {
            var error = new Error('Error' + response.status + ":" + response.statusText)
            error.response = response
            throw error
        }
    })
    .then(res => res.json())
    .then(memes => {dispatch(addMeme(memes))})
    .catch(err => {dispatch(memeFailed(err.message))})
}

export const deleteMemes = (memeId) => (dispatch) => {
    fetch(baseUrl + '/' + memeId, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(response => {
        if (response.ok)
            return response
        else {
            var error = new Error('Error' + response.status + ":" + response.statusText)
            error.response = response
            throw error
        }
    })
    .then(response => response.json())
    .then(memes => {dispatch(addMeme(memes))})
    .catch(err => {dispatch(memeFailed(err.message))})
}

export const updateMemes = (memeId, name, caption, url) => (dispatch) => {
    const data = {
        name: name,
        caption: caption,
        url: url
    }
    fetch(baseUrl + '/' + memeId, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(response => {
        if (response.ok)
            return response
        else {
            var error = new Error('Error' + response.status + ":" + response.statusText);
            error.response = response
            throw error
        }
    })
    .then(response => response.json())
    .then(memes => dispatch(addMeme(memes)))
    .catch(err => {dispatch(memeFailed(err.message))})
}

export const addMeme = (memes) => ({
    type: ActionTypes.ADD_MEMES,
    payload: memes
});

export const memeFailed = (errMess) => ({
    type: ActionTypes.MEMES_FAILED,
    payload: errMess
});