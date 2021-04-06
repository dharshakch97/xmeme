import { applyMiddleware, combineReducers, createStore } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import { Memes } from "./memes"

export const Store = () => {
    const store = createStore(
        combineReducers({
            memes: Memes,
        }),
        applyMiddleware(thunk, logger)
    )
    return store;
}