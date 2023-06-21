import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { userLoginReducer, userSignUpReducer, userDetailsReducer, userUpdateProfileReducer } from '../reducers/userReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userSignUp: userSignUpReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer
})

const middleware = [thunk]
const store = configureStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store