import React,{createContext, useReducer} from 'react'
import reducers from './reducers'
import initialState from './state'


export const AppContext = createContext({})

export const Consumer =  AppContext.Consumer


export function Provider(props){
  const [state,dispatch] = useReducer(reducers,initialState)
  const store = { state, dispatch } 
  return (
  <AppContext.Provider value={ store }>
    {props.children}
  </AppContext.Provider>
  )
}