import { createContext, useContext, useEffect, useState, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {

    const { currentUser } = useContext(AuthContext)

    const INITIAL_STATE = {
        chatId: "",
        user: {}
    }

    const ACTIONS = {
        CHANGE_USER: 'change_user'
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.CHANGE_USER:
                return {
                    user:action.payload,
                    chatId: currentUser.uid > action.payload.uid ? 
                    currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                }
            default:
                return state;
        }
    }
    // when dispatch is called, dispatch calls the action variable in chatReducer function and update the state
    const [state,dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        //passing logged in user: currentUser down to all routes(children) within authcontext provider
        <ChatContext.Provider value={{ data:state, dispatch, ACTIONS }}>
            {children}
        </ChatContext.Provider>
    )
};
