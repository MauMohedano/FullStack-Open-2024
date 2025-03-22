import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        displayContent(state, action) {
            return action.payload
        },
        clearNotification(){
            return ""
        }
    }
})

export const {displayContent, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer


export const setNotification = (message) => {
    return async dispatch => {
      let myTimeout
      if (myTimeout) {
        clearTimeout(myTimeout)
      }
      dispatch(displayContent(message))
  
      myTimeout = setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
    }
  }

  export const showNotification = (message, seconds) =>{
    return (dispatch) => {
      dispatch(setNotification(message))
      setTimeout(() => {
        dispatch(clearNotification())
      }, seconds * 1000)
    }
  }