import axios from 'axios'
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_DETAILS_RESET,
    USER_LIST_FAIL,
    USER_LIST_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_REQUEST,
} from '../../constants/userConstants';

export const login =(email,password)=>async(dispatch)=>{
  try{
    dispatch({
      type:USER_LOGIN_REQUEST,
      payload:{email,password}
    })
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }
      const { data } = await axios.post('/api/users/login',{ email, password },config)
    dispatch({
      type:USER_LOGIN_SUCCESS,
      payload:data
    })
    localStorage.setItem('userInfo',JSON.stringify(data))
  } catch (error) {
      dispatch({
          type: USER_LOGIN_FAIL,
          payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
      })
  }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo') 
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: USER_LIST_RESET })
    document.location.href= '/login'
}

export  const SignUp = (firstname, lastname, email, area, password) => async (dispatch) => { 
    try {
        dispatch({
            type:USER_SIGNUP_REQUEST,
        })
        const config = {
            headers: {
                    'Content-Type': 'application/json'
            },
        }
        const { data } = await axios.post(
            '/api/users',
            { firstname, lastname, email, location, password },
            config
        )
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
            })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
            })
    localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        })
    }
}
    //update the user profile
    export const updateUserProfile = (user) => async (dispatch, getState) => {
        try {
            dispatch({
                type: USER_UPDATE_PROFILE_REQUEST,
                payload: user
            })
            const { userLogin: { userInfo } } = getState()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.put(`/api/users/profile`, user, config)
            dispatch({
                type: USER_UPDATE_PROFILE_SUCCESS,
                payload: data
            })
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            if (message === 'Not authorized, token failed') {
                dispatch(logout())
            }
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload: message,
            })
        }
}
// list all users
export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.get(`/api/users`, config)
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_LIST_FAIL,
            payload: message,
        })
    }
}
// delete user
export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        await axios.delete(`/api/users/${id}`, config)
                dispatch({
                    type: USER_DELETE_SUCCESS,
                    payload: id,
                })
    }catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_DELETE_FAIL,
            payload: message,
        })
    }
}
// update user

export const updateUser = (id, user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.put(`/api/users/${id}`, user, config)
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
               ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: message,
        })
    }
}
